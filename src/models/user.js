const mongoose = require('mongoose');
const validator = require('validator');



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


const User = mongoose.model('User', {
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
        required: true
    },


    creditCard: {
        type: String,
        required: true
    }



})


const sensai = new User({
    name: 'DanielLaRusso',
    age: 41,
    password: 'miyagi-do',
    email: 'dannyLarusso1984@gmail.com',
    creditCard: '5454 3434 5435 3321'
})

/*sensai.save().then((sensai) => {

    if (validateAll(sensai.name, sensai.email, sensai.creditCard)) {
        console.log(sensai)
    }



}).catch((error) => {
    console.log('Unexpected Error!', error)
})*/


module.exports = User