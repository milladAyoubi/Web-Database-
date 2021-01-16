const express = require('express')
require('./mongoose')
const bcrypt = require('bcrypt')

const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')



const app = express()

const port = process.env.PORT || 3000


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server Up On ' + port)
})

const jwt = require('jsonwebtoken');

const mFunction = async() => {
    const token = jwt.sign({ id: 'asasa' }, 'newToken')
    console.log(token)
}


mFunction()