const mongoose = require('mongoose');
const validator = require('validator');



const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    status: {
        type: Boolean
    }

})

const task1 = new Task({
    description: 'Open Up A Karate Dojo',
    status: true
})





task1.save().then(() => {
    console.log(task1)
}).catch((error) => {
    console.log(error)
})


exports.task = Task