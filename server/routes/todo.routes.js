const { Router } = require('express')
const { todoControllers } = require('../controllers/todo.controllers')
const router = Router()

router.get('/todo/:completed', todoControllers.todoAllGet)
router.post('/todo', todoControllers.todoCreate)
router.patch('/todo/:id', todoControllers.todoUpdate)
router.patch('/todo/edit/:id', todoControllers.todoEditingText)
router.delete('/todo/:id', todoControllers.todoDelete)


module.exports = router