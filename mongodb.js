
//Setting up Values for Database
const user = require('./users')
const tasks = require('./tasks')
const find = require('./findOneUser')
const findMulUsers = require('./findMutipleUsers')
//const mongodb = require('mongodb')
//const MongoClient = mongodb.MongoClient;

const  {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const database = 'task-manager'



const id = new ObjectID()


//Create Connection to Database 
MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
  if(error) {
      return console.log('Unable to Connect to Database')
  }
  console.log('Connected Successfully!')

  const db = client.db(database)


  //Add Users To Database
 //user.addUsers(db)

  //Add Tasks to DataBase
  //tasks.addTasks(db)


  //Find Specified User
  //find.findOneUser(db)



  //Find Multiple Users
 findMulUsers.findMultipleUser(db)


})