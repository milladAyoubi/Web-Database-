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
router.get('/tasks', auth, async(req, res) => {

    const filter = req.query.status
    const match = {}
    if (filter === 'true')
        match.status = true
    else if (filter === 'false') {
        match.status = false
    }

    const sort = {}

    if (req.query.sortBy) {
        const part = req.query.sortBy.split(':')
        sort[part[0]] = part[1] === 'desc' ? 1 : -1
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            //Pagination Of Tasks Limiting the amount of Tasks displayd on each 'page'
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send(e)
    }

})

//Read Task On ID
router.get('/tasks/:id', auth, async(req, res) => {
    const id = req.params.id

    try {
        //verify That The User Has Access To the Task
        const task = await Task.findOne({ _id: id, userTask: req.user._id })
        if (!task)
            res.status(400).send()

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})



//Update Task By ID
router.patch('/tasks/:id', auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const updateOnly = ["description", "status"]

    const isValidkey = updates.every((key) => {
        return updateOnly.includes(key)
    })

    if (!isValidkey)
        return res.status(400).send('Invalid Value Update')

    const id = req.params.id
    try {
        const task = await Task.findOne({ _id: id, userTask: req.user._id })


        if (!task)
            return res.status(404).send()

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        res.send(task)

    } catch (e) {
        res.status(400).send('Error')
    }
})



//Deleting Task By ID
router.delete('/tasks/:id', auth, async(req, res) => {
    const id = req.params.id

    try {
        const task = await Task.findByIdAndDelete({ _id: id, userTask: req.user._id })
        if (!task) {
            return res.status(404).send('Task Does Not Exist!')
        }
        res.send(task)
    } catch (e) {
        res.status(400).send('Error')
    }
})

module.exports = router