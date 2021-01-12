const express = require('express')
require('./mongoose')

const User = require('./models/user')
const Task = require('./models/task')

const app = express()

const port = process.env.PORT || 3000


app.use(express.json())


//Creating Users
app.post('/users', async(req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.send(user)
    } catch (e) {
        res.send(400).send(e)
    }

})

//Reading Users
app.get('/users', async(req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})


//Reading User ID
app.get('/users/:id', async(req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id)
        if (!user)
            return res.status(404).send()
    } catch (e) {
        res.status(500).send()
    }

})



//Creating Task
app.post('/tasks', async(req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

//Reading Tasks
app.get('/tasks', (req, res) => {

    try {
        const tasks = Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }

})

//Read Task On ID
app.get('/tasks/:id', (req) => {
    const id = req.params.id

    try {
        const task = Task.findById(id)
        if (!task)
            res.status(404).send()
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

app.listen(port, () => {
    console.log('Server Up On ' + port)
})