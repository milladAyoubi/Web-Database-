const { ObjectID } = require("mongodb")

const update = (db) => {
    console.log( 'Updating Millad ')

    db.collection('users').updateOne({
        name: 'Miguel'

    }, {
        $set: {
            name: 'Miguel', 
            program: 'Cobra Kai',
            university: 'None'
        },


        $inc: {
            age: -11
        }

        
        
    }).then((result) => {
        console.log(result)

    }).catch((error) => {
        console.log(error)
    })

}


exports.update = update