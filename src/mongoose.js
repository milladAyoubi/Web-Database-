const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true

})




//Mongoose Object Model Created
const User = mongoose.model('User', {
    name: {
        type: String
    },

    age: {
        type: Number
    }


})

//Creating New Object 'sensai'
const sensai = new User({
    name: 'Daniel LaRusso',
    age: 41
})

sensai.save().then((sensai) => {

    console.log(sensai)

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