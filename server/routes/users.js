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

module.exports = router
