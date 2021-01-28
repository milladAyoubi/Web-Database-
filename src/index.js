const express = require('express')
require('./mongoose')
const bcrypt = require('bcrypt')
const multer = require('multer')
const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')



const app = express()

const port = process.env.PORT || 3000

const upload = multer({
    //Set Destination folder for files
    dest: 'images',
    //Limit Size of File Upload 
    limits: {
        fileSize: 1000000
    },


    //Accept, Reject or send Error of File
    fileFilter(req, file, cb) {

        if (!file.originalname.match(/\.(jpg|jpeg|png|pdf|docx)$/))
            return cb(new Error('File is not a .jpg File!'))

        cb(undefined, true)

    }
})


//Upload a single File From Client
app.post('/upload/spaceImage', upload.single('spaceImage'), (req, res) => {
    console.log(req.file.filename)
    res.send()
})



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