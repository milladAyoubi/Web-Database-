const mongoose = require('mongoose');
const validator = require('validator');


const validateEmail = (validate) => {
    if (!validator.isEmail(validate)) {

        console.log('Email Invalid')
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
        type: String,
    }



})

//Creating New Object 'sensai'
const sensai = new User({
    name: 'Daniel LaRusso',
    age: 41,
    email: 'danny@gmail.com'
})

sensai.save().then((sensai) => {

    if (validateEmail(sensai.email)) {
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