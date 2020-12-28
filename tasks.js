const addTasks = (db) => {

    //Inserting Multiple Documents into Database
    db.collection('tasks').insertMany([
        {

          description: 'Eating Shawarmas',
          status: true
        },
    
    
        {

          description: 'Eating Sushi',
          status: true
        },
    
        {
     
          description: 'Eating PROTEIN!!!!!!!!!!!!',
          status: true
        }
    
      
      ], (error,result) => {
    
    if(error) return console.log('Unable to Add Info')
    
    const docNumber = result.insertedCount
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

exports.addTasks = addTasks