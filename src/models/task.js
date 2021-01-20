const mongoose = require('mongoose');
const validator = require('validator');



const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        default: false
    },

    userTask: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const task1 = new Task({
    description: 'Open Up A Karate Dojo',
    status: true
})






module.exports = Task