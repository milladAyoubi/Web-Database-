
//Setting up Values for Database
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017'
const database = 'task-manager'



//Create Connection to Database 
MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
  if(error) {
      return console.log('Unable to Connect to Database')
  }
  console.log('Connected Successfully!')

  const db = client.db(database)




  //Inserting Document into Database 
  db.collection('users').insertOne({
    name: 'Andrew',
    age: 27 
    
  }, (error, result) => {

    const docNumber = result.insertedCount

    if(error) 
    return console.log('Unable to add user')
    
    console.log("Number of Documents Created: " + docNumber)

    result.ops.forEach( (e,i) => {
      


      console.log("Document: " + i)
Object.keys(e).forEach(key => {
  console.log(key + ": " + e[key])

})


})


  
    

  })

})


