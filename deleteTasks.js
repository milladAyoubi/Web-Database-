const del = (db) => {

    db.collection('tasks').deleteMany({

        status: true
        
    }).then((result) => {

    }).catch((error) => {
        console.log(error)
    })


}


exports.del = del