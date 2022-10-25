const express = require('express')
const router = express.Router()

const db = require('../db/users')
const utils = require('../utils')

const jwtWrapper = (req, res, next) => {
  if (process.env.NODE_ENV === 'test') return next()
  else return utils.checkJwt(req, res, next)
}

// GET /api/users
router.get('/', jwtWrapper, (req, res) => {
  const auth0Id = req.auth?.sub
  db.getUserByAuth0Id(auth0Id)
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({ message: 'Something went wrong' })
    })
})

// POST /api/users
router.post('/', jwtWrapper, async (req, res) => {
  const { email, name, username, postcode } = req.body
  const user = {
    auth0Id: req.auth?.sub,
    email,
    name,
    username,
    postcode,
  }
  try {
    const newUser = await db.createUser(user)
    res.json(newUser)
  } catch (err) {
    console.error(err)
    res.status(500).send(err.message)
  }
})

router.patch('/update/', jwtWrapper, async (req, res) => {
  const { name, username, postcode } = req.body
  const auth0Id = req.auth?.sub
  const userToUpdate = {
    name,
    username,
    postcode,
  }
  try {
    const updateUser = await db.updateUserByAuth0Id(auth0Id, userToUpdate)
    console.log(updateUser, 'updateuser')
    res.json(updateUser)
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: 'Something went wrong' })
  }
})

module.exports = router
