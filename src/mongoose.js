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



mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true

})



//Mongoose Object Model Created
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,

        validate(value) {
            if (value < 0)
                throw new Error('Age Must Be Positive Number!')
        }
    },
    email: {
        type: String
    },

    creditCard: {
        type: String
    }



})

//Creating New Object 'sensai'
const sensai = new User({
    name: 'DanielLaRusso',
    age: 41,
    email: 'dannyLarusso1984@gmail.com',
    creditCard: '5454 3434 5435 3321'
})

sensai.save().then((sensai) => {

    if (validateAll(sensai.name, sensai.email, sensai.creditCard)) {
        console.log(sensai)
    }



}).catch((error) => {
    console.log('Unexpected Error!', error)
})



const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    status: {
        type: Boolean
    }

})

const task = new Task({
    description: 'Open Up A Karate Dojo',
    status: true
})


task.save().then(() => {
    console.log(task)
}).catch((error) => {
    console.log(error)
})