
const findMultipleUser = (db) => {


    console.log('\n' + 'Finiding Users With Age 21' + '\n')
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


    db.collection('tasks').find({status: true}).toArray((error,result) => {
        if(error) return console.log(error) 
        console.log('\n' + 'There are ' + result.length + ' tasks completed' + '\n')
        result.forEach(e => {
            Object.keys(e).forEach(key => {
                if(key == 'description' )
           
                console.log(key + ': ' + e[key])
            })
        })


    })


}



exports.findMultipleUser = findMultipleUser