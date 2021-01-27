const express = require('express')
require('./mongoose')
const bcrypt = require('bcrypt')
const multer = require('multer')
const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')



const app = express()

const port = process.env.PORT || 3000

const upload = multer({
    dest: 'images'
})



app.post('/upload ')



app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server Up On ' + port)
})

const Task = require('./models/task')
const User = require('./models/user')

/*
const main = async() => {
    const owner = await Task.findById('60088a494cfaa13e30329983')
    const user = await User.findById(owner.userTask)
        //Populates Virtual Field tasks based on documents created by model 'Task'
    await user.populate('tasks').execPopulate()
        //console.log(user.tasks)
}


main()*/