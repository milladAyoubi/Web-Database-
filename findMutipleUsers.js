
const findMultipleUser = (db) => {
    db.collection('users').find({age: 21}).toArray((error,result) => {
        if(error) return console.log(error)

        console.log( 'There are ' + result.length + ' Users who are age 21')

        result.forEach(e => {
            Object.keys(e).forEach(key => {
                if(key == 'name') 
                    console.log(key + ': ' + e[key])
              
                })
        });
    })




}



exports.findMultipleUser = findMultipleUser