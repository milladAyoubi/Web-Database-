
const addUsers = (db) => {


    //Inserting Document into Database
    db.collection('users').insertMany([
      
      {
    
      name: 'Andrew',
      age: 27,
      program: 'Software Engineering',
      university: 'Amazon University'
       
      },

      {

        name: 'Millad',
        age: 21,
        program: 'Computer Science',
        university: 'Ryerson University'

      },

      {

        name: 'Anno',
        age: 21,
        program: 'Political Science',
        university: 'U Of T'

      }
  
  
  
  ], (error, result) => {
  
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