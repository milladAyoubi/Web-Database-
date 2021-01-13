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






module.exports = Task