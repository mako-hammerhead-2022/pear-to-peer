const express = require('express')
const router = express.Router()

const db = require('../db/items')

// GET all items
router.get('/', (req, res) => {
  db.getAllItems()
    .then((items) => {
      res.json(items)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({ message: 'Something went wrong' })
    })
})

// GET an item by the user ID
router.get('/:Id', (req, res) => {
  // const userId = req.user?.sub
  const userId = req.params.Id
  // const { userId } = req.body
  db.getItemsByUserId(userId)
    .then((userItems) => {
      res.json(userItems)
    })
    .catch((err) => {
      res.status(500).send({ message: 'Something went wrong' })
    })
})

module.exports = router
