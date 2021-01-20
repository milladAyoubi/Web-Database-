const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

//Creating Users
router.post('/users', async(req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }

})


//User Login 
router.post('/users/login', async(req, res) => {

    try {
        const user = await User.findByCred(req.body.email, req.body.password)
        const token = await user.generateToken()
        res.send({ user, token })
    } catch (e) {

        res.status(400).send()
    }
})

//User log Out
router.post('/users/logout', auth, async(req, res) => {

    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()
        res.send('User: ' + req.user.email + '\n' + ' Has Logged Out')
    } catch (e) {
        res.status(500).send(e)
    }
})


//User LogoutAll Users Accounts 

router.post('/users/logoutAll', auth, async(req, res) => {

    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})


//Reading Users
router.get('/users/me', auth, async(req, res) => {
    res.send(req.user)
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
        res.status(500).send(e)
    }

})



//Updating User That is Logged In 
router.patch('/users/update', auth, async(req, res) => {

    const updates = Object.keys(req.body)
    const updateOnly = ["name", "email", "password", "age"]

    const isValidkey = updates.every((key) => {
        return updateOnly.includes(key)
    })

    if (!isValidkey)
        return res.status(400).send('Invalid Value Update')

    try {



        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)

    } catch (e) {
        res.status(400).send('Error')
    }
})






//Deleting User By ID
router.delete('/users/me', auth, async(req, res) => {


    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})


module.exports = router