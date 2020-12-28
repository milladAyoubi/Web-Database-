
const findMultipleUser = (db) => {
    db.collection('users').find({age: 21}).toArray(error,result)




}



exports.findMultipleUser = findMultipleUser