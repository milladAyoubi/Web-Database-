const express = require('express')
require('./mongoose')
const bcrypt = require('bcrypt')

const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')



const app = express()

const port = process.env.PORT || 3000


/*
app.use((req, res, next) => {
    if (req.method === 'GET') {
        res.send('GET Request Accessed ')
        next()
    } else {
        res.status(503).send('Site is Currently Unavalible')
    }
})

*/
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server Up On ' + port)
})