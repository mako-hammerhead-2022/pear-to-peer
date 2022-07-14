const express = require('express')
const router = express.Router()

const db = require('../db/items')
// const {checkJwt} = require('../utils')

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
      console.log('user items is', userItems)
      res.json(userItems)
    })
    .catch((err) => {
      res.status(500).send({ message: 'Something went wrong' })
    })
})

// GET items by user ID
// router.get('/', (req, res) => {
//   const userId = req.user?.sub
//   db.getItemsByUserId(userId)
//     .then((userItems) => {
//       res.json(userItems)
//     })
//     .catch((err) => {
//       res.status(500).send({ message: 'Something went wrong' })
//     })
// })

// POST items (by the user)
//checkJwt
router.post('/', (req, res) => {
  const newItem = req.body
  console.log(newItem)
  return db
    .insertItem(newItem)
    .then((newItem) => {
      return res.json(newItem)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

// PATCH item
//checkJwt

// router.patch('/', (req, res) => {
//   const itemUpdated = req.body
//   // const updatedItem = {
//   //   availability,
//   // }
//   console.log('this is route', itemUpdated)
//   return db
//     .updateItem(itemUpdated)
//     .then((itemUpdated) => {
//       return res.json(itemUpdated)
//       return null
//     })
//     .catch((err) => {
//       res.status(500).send(err.message)
//     })
// })

router.patch('/:id', (req, res) => {
  const itemId = req.params.id
  const item = req.body
  db.updateItem(itemId, item).catch((err) => {
    res.status(500).send(err.message)
  })
})

// DELETE item
// router.delete('/', checkJwt, (req, res) => {})

module.exports = router
