const express = require('express')
require('./mongoose')

const User = require('./models/user')
const Task = require('./models/task')

const userRouter = require('./routers/users')

const app = express()

const port = process.env.PORT || 3000


app.use(express.json())
app.use(userRouter)



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



//Update Task By ID
app.patch('/tasks/:id', async(req, res) => {
    const updates = Object.keys(req.body)
    const updateOnly = ["description", "status"]

    const isValidkey = updates.every((key) => {
        return updateOnly.includes(key)
    })

    if (!isValidkey)
        return res.status(400).send('Invalid Value Update')

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task)
            return res.status(404).send()

        res.send(task)

    } catch (e) {
        res.status(400).send('Error')
    }
})



//Deleting Task By ID
app.delete('/tasks/:id', async(req, res) => {
    const id = req.params.id

    try {
        const task = await Task.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send('Error')
    }
})


app.listen(port, () => {
    console.log('Server Up On ' + port)
})