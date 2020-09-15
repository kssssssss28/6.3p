var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/users'
    , function (err) {

        console.log("connectting to the DataBase ....")
    
        if (err) {
            console.log("worng!")
        }
        else
        {
            console.log("connect to the DataBase successfully  ")
        }
      
    }
)
//var dbpath = './DB.json'
mongoose.Promise = global.Promise;

module.exports = mongoose;