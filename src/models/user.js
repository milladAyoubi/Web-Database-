const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Task = require('./task')



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    age: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0)
                throw new Error('Age Must Be Positive Number!')
        }
    },


    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,

        validate(value) {
            if (value.includes('password'))
                throw new Error('Password cannot contain "Password"')

        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error('Email Invalid')

        }
    },


    creditCard: {
        type: String,
        required: true
    },


    tokens: [{
        token: {
            type: String,
            required: true,

        }


    }]
}, {
    timestamps: true
})


const validateAll = (name, email, creditCard) => {
    if (!validator.isAlpha(name, ['az-AZ'])) {
        console.log('Name Invalid')
        return false
    }


    if (!validator.isEmail(email)) {

        console.log('Email Invalid')
        return false
    }

    if (!validator.isCreditCard(creditCard)) {
        console.log('Credit Card Number Invalid')
        return false
    }

    return true
}




/*
const sensai = new User({
        name: 'DanielLaRusso',
        age: 41,
        password: 'miyagi-do',
        email: 'dannyLarusso1984@gmail.com',
        creditCard: '5454 3434 5435 3321'
    })
  
    sensai.save().then((sensai) => {

        if (validateAll(sensai.name, sensai.email, sensai.creditCard)) {
            console.log(sensai)
        }



    }).catch((error) => {
        console.log('Unexpected Error!', error)
    })*/


//Disply Realative Information On User Log In 
userSchema.methods.toJSON = function() {

    const user = this
    const userData = user.toObject()

    delete userData.password
    delete userData.creditCard
    delete userData.tokens


    return userData
}


userSchema.methods.generateToken = async function() {

    const user = this
    const token = jwt.sign({ id: user.id.toString() }, 'newToken')

    //Adding Token to User
    user.tokens = user.tokens.concat({ token })
    await user.save()
    console.log(token)
    return token

}



userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'userTask'
})


userSchema.statics.findByCred = async(email, password) => {
    const user = await User.findOne({ email })

    if (!user)
        throw new Error('Unable To Find Email!')

    const match = await bcrypt.compare(password, user.password)
    if (!match)
        throw new Error('Password Does not Mactch!')


    return user
}




//Hashing Regular Password
userSchema.pre('save', async function(next) {
    const user = this

    if (user.isModified('password'))
        user.password = await bcrypt.hash(user.password, 8)


    next()
})

userSchema.pre('remove', async function(next) {
    const user = this

    await Task.deleteMany({ userTask: req.user._id })

    next()
})


const User = mongoose.model('User', userSchema)

module.exports = User