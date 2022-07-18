const express = require('express')
const router = express.Router()

const db = require('../db/users')
const utils = require('../utils')

// POST /api/users
router.post(
  '/',
  (req, res, next) => {
    if (process.env.NODE_ENV === 'test') return next()
    else return utils.checkJwt(req, res, next)
  },
  async (req, res) => {
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
  }
)

router.get(
  '/:auth0Id',
  (req, res, next) => {
    if (process.env.NODE_ENV === 'test') return next()
    else return utils.checkJwt(req, res, next)
  },
  (req, res) => {
    const auth0Id = req.auth?.sub
    db.getUserByAuth0Id(auth0Id)
      .then((user) => {
        res.json(user)
      })
      .catch((err) => {
        console.error(err)
        res.status(500).send({ message: 'Something went wrong' })
      })
  }
)

module.exports = router
