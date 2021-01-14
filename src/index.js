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


const mFunction = async() => {
    const password = 'Red1234'
    const hashedPassword = await bcrypt.hash(password, 8)
    console.log(password)
    console.log(hashedPassword)


    const match = await bcrypt.compare('Red1234', hashedPassword)
    console.log(match)
}


mFunction()