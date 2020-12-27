
const addUsers = (db,id) => {


    //Inserting Document into Database
    db.collection('users').insertOne({
      _id: id,
      name: 'Andrew',
      age: 27 
      
    }, (error, result) => {
  
      const docNumber = result.insertedCount
  
      if(error) 
      return console.log('Unable to add user')
      
      console.log("Number of Documents Created: " + docNumber)
      console.log(" ")
      result.ops.forEach( (e,i) => {
      
        console.log("Document: " + (i+1))
  Object.keys(e).forEach(key => {
    console.log(key + ": " + e[key])
  
    })
  })
  

  
    })
}
  
 exports.addUsers = addUsers;