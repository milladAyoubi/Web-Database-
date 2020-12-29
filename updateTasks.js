const update = (db) => {


console.log( 'All Tasks Have Been Reset ')

    db.collection('tasks').updateMany({
        status: true

    }, {
        $set: {
            status: false
        },

    }).then((result) => {
        //console.log(result)

    }).catch((error) => {
        console.log(error)
    })




}


exports.update = update