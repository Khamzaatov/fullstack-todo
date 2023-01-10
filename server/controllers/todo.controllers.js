const Todo = require("../models/Todo.model")

module.exports.todoControllers = {
    todoAllGet : async (request, response) => {
        const { completed } = request.params
        try {
            let todo
            if (completed === 'All') {
                todo = await Todo.find({})
            } else {
                todo = await Todo.find({ completed })
            }
            response.json(todo)
        } catch (error) {
            response.json(error)
        }
    },
    todoCreate : async (request, response) => {
        const { text, completed, editing } = request.body
        try {
            const todo = await Todo.create({
                text : text,
                completed : completed,
                editing: editing
            })
            response.json(todo)
        } catch (error) {
            response.json(error.message)
        }
    },
    todoUpdate : async (request, response) => {
        const { completed } = request.body
        const { id } = request.params
        try {
             const todo = await Todo.findByIdAndUpdate(id, {
                    completed : !completed,
                })
            response.json(todo)
        } catch (error) {
            response.json(error)   
        }
    },
    todoEditingText : async (request, response) => {
        const { text, editing } = request.body
        const { id } = request.params
        try {
            const todo = await Todo.findByIdAndUpdate(id, {
                text: text,
                editing: !editing
            })
            response.json(todo)
        } catch (error) {
            response.json(error)   
        }
    },
    todoDelete : async (request, response) => {
        const { id } = request.params
        try {
            const todo = await Todo.findByIdAndRemove(id)
            response.json(todo)
        } catch (error) {
            response.json(error)
        }
    },
}