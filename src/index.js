const express = require('express')
require('./mongoose')

const User = require('./models/user')
const Task = require('./models/task')

const app = express()

const port = process.env.PORT || 3000


app.use(express.json())


//Creating Users
app.post('/users', (req, res) => {
    const user = new User(req.body)


    user.save().then(() => {

        res.send(user)
    }).catch((e) => {
        res.send(400).send(e)
    })

})

//Reading Users
app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.send(400).send(e)
    })
})


//Reading ID
app.get('/users/:id', (req, res) => {
    const id = req.params.id
    User.findById(id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)

    }).catch((e) => {
        res.status(500).send()
    })
})



//Creating Task
app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.send(task)
    }).catch((e) => {
        res.send(400).send(e)
    })
})

//Reading Tasks
app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch((e) => {
        res.send(404).send(e)
    })
})

//Read Task On ID
app.get('/tasks/:id', (req, res) => {
    const id = req.params.id
    Task.findById(id).then((task) => {
        if (!task)
            res.send(404).send('Task Not Found')
        res.send(task)
    }).catch((e) => {
        res.send(404).send(e)
    })
})

app.listen(port, () => {
    console.log('Server Up On ' + port)
})