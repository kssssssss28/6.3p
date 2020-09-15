var mongoose = require('./db')



var task = new mongoose.Schema
    (
        {
            taskname:

            {
                type: String,
                require: true,
                default: 'null'
            }
            ,
           taskdate:
            {
                type: String,
                require: true,
                default: 'null'
            }
        }
        
    )




var task = mongoose.model('Tasks', task)
module.exports = task;
