
const findOneUser = (db) => {


    db.collection('users').findOne({age: 21}, (error, result) => {
       if(error) return console.log(error)
       
        console.log(result)
    })
}



exports.findOneUser = findOneUser