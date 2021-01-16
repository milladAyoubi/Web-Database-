const express = require('express')
require('./mongoose')
const bcrypt = require('bcrypt')

const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')



const app = express()

const port = process.env.PORT || 3000



app.use((req, res, next) => {
    if (req.method === 'GET') {
        res.send('GET Request Accessed ')
        next()
    } else {

    }
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server Up On ' + port)
})

const jwt = require('jsonwebtoken');

const mFunction = async() => {

    //Assigning New Token
    const token = jwt.sign({ id: 'asasa' }, 'newToken', { expiresIn: '1 day' })


    //Verification Of Token
    jwt.verify(token, 'newToken')


    console.log(token)
}


mFunction()