const asyncHandler = require('express-async-handler')
const { body, validationResult, matchedData } = require('express-validator')
const prisma = require('../config/prismaClient')

exports.getAll = asyncHandler(async (req, res) => {
  const todos = await prisma.todo.findMany()
  res.json(todos)
})

exports.getOne = asyncHandler(async (req, res) => {
  const todo = await prisma.todo.findUnique({
    where: { id: parseInt(req.params.id, 10) },
  })

  if (!todo) return res.status(404).json({ message: 'Todo not found' })

  res.json(todo)
})

exports.create = [
  body('name').notEmpty().withMessage('Name is required'),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    const { name } = matchedData(req)

    if (errors.isEmpty()) {
      const todo = await prisma.todo.create({
        data: {
          name,
        },
      })
      res.json(todo)
    } else {
      return res.status(400).json({ errors: errors.array() })
    }
  }),
]

exports.update = [
  body('name').notEmpty().withMessage('Name is required'),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    const { name } = matchedData(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const existingTodo = await prisma.todo.findUnique({
      where: { id: parseInt(req.params.id, 10) },
    })

    if (!existingTodo) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    const todo = await prisma.todo.update({
      where: { id: parseInt(req.params.id, 10) },
      data: {
        name,
      },
    })
    res.json(todo)
  }),
]

exports.delete = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10)

  const existingTodo = await prisma.todo.findUnique({
    where: { id },
  })

  if (!existingTodo) {
    return res.status(404).json({ message: 'Todo not found' })
  }

  await prisma.todo.delete({
    where: { id },
  })

  res.json({ message: 'Todo deleted successfully' })
})
