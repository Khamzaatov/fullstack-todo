const mongoose = require('mongoose')
const todoSchema = new mongoose.Schema({
    text : String,
    completed : {
        type: Boolean,
        default : false
    },
    editing : {
        type : Boolean,
        default: false
    }
},
    {timestamps : true}
)

const Todo = mongoose.model('Todo', todoSchema)


module.exports = Todo