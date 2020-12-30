const del = (db) => {

    db.collection('users').deleteMany({

        age:21
        
    }).then((result) => {

    }).catch((error) => {
        console.log(error)
    })


}


exports.del = del