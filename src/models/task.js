const mongoose = require('mongoose')


const Task = mongoose.model('tasks',{
    description : {
      type: String,
      required : true,
      trim: true
   },
   completed : {
     type: Boolean,
     required : true,
     default : false
   }

})

module.exports = Task;