const express = require('express')
const router = express.Router()

const db = require('../db')

// POST /api/users
// TODO: add checkJwt
router.post('/', async (req, res) => {
  const newUser = req.body
  // TODO: const auth0Id = req.user?.sub
  // TODO: get fields you want
  const { auth0Id, email, name, username, postcode } = newUser
  const user = {
    auth0Id,
    email,
    name,
    username,
    postcode,
  }
  try {
    const created = await db.createUser(user)
    console.log('created', created)
    res.sendStatus(201)
  } catch (err) {
    console.error(err)
    res.status(500).send(err.message)
  }
})

router.get('/:auth0Id', (req, res) => {
  const auth0Id = req.params.auth0Id
  console.log('auth', auth0Id)
  db.getUserByAuth0Id(auth0Id)
    .then((user) => {
      console.log(user, 'user')
      res.json(user)
    })
    .catch((err) => {
      res.status(500).send({ message: 'Something went wrong' })
    })
})

// router.get('/', (req, res) => {
//   db.getAllUsers()
//     .then((users) => {
//       res.json(users)
//     })
//     .catch((err) => {
//       res.status(500).send({ message: 'Something went wrong' })
//     })
// })

module.exports = router

// router.post('/', (req, res) => {
//   const todo = req.body
//   // console.log('todo is', todo)
//   db.addTodo(todo)
//     .then((id) => {
//       // console.log(id)
//       db.getTodoById(id[0]).then((todoData) => {
//         // console.log('TodoDataIs', todoData)
//         res.json(todoData)
//       })
//     })
//     .catch((err) => {
//       res.status(500).send('DATABASE ERROR: ' + err.message)
//     })
// })
