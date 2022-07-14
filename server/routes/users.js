const express = require('express')
const router = express.Router()

const db = require('../db')

router.get('/', (req, res) => {
  db.getAllUsers()
    .then((users) => {
      res.json(users)
    })
    .catch((err) => {
      res.status(500).send({ message: 'Something went wrong' })
    })
})

// POST /api/users
// TODO: add checkJwt
router.post('/', async (req, res) => {
  const newUser = req.body
  // TODO: const auth0Id = req.user?.sub
  // TODO: get fields you want
  const { auth0Id, email, name } = newUser
  const user = {
    auth0Id,
    email,
    name,
  }
  try {
    await db.createUser(user)
    res.sendStatus(201)
  } catch (err) {
    console.error(err)
    res.status(500).send(err.message)
  }
})

module.exports = router
