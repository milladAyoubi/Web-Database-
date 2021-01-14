const express = require('express')
const User = require('../models/user')
const router = new express.Router()


//Creating Users
router.post('/users', async(req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.send(user)
    } catch (e) {
        res.send(400).send(e)
    }

})

//Reading Users
router.get('/users', async(req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})


//Reading User ID
router.get('/users/:id', async(req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id)
        if (!user)
            return res.status(404).send()
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }

})

//Update User By ID
router.patch('/users/:id', async(req, res) => {

    const updates = Object.keys(req.body)
    const updateOnly = ["name", "email", "password", "age"]

    const isValidkey = updates.every((key) => {
        return updateOnly.includes(key)
    })

    if (!isValidkey)
        return res.status(400).send('Invalid Value Update')

    try {

        const user = await User.findById(req.params.id)

        updates.forEach((update) => user[update] = req.body[update])


        await user.save()

        if (!user)
            return res.status(404).send()

        res.send(user)

    } catch (e) {
        res.status(400).send('Error')
    }
})

//Deleting User By ID
router.delete('/users/:id', async(req, res) => {
    const id = req.params.id

    try {
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send('Error')
    }
})


module.exports = router