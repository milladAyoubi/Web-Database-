const express = require('express')
const Task = require('../models/task')
const router = new express.Router()
const auth = require('../middleware/auth')




//Creating Task
router.post('/tasks', auth, async(req, res) => {


    const task = new Task({
        ...req.body,
        userTask: req.user._id
    })
    try {
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

//Reading Tasks
router.get('/tasks', async(req, res) => {

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }

})

//Read Task On ID
router.get('/tasks/:id', (req) => {
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
router.patch('/tasks/:id', async(req, res) => {
    const updates = Object.keys(req.body)
    const updateOnly = ["description", "status"]

    const isValidkey = updates.every((key) => {
        return updateOnly.includes(key)
    })

    if (!isValidkey)
        return res.status(400).send('Invalid Value Update')

    try {
        const task = await Task.findById(req.params.id)
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        if (!task)
            return res.status(404).send()

        res.send(task)

    } catch (e) {
        res.status(400).send('Error')
    }
})



//Deleting Task By ID
router.delete('/tasks/:id', async(req, res) => {
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

module.exports = router