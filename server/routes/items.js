const express = require('express')
const router = express.Router()

const db = require('../db/items')
// const {checkJwt} = require('../utils')

// GET all items
// router.get('/', (req, res) => {
//   db.getAllItems()
//     .then((items) => {
//       res.json(items)
//     })
//     .catch((err) => {
//       res.status(500).send({ message: 'Something went wrong' })
//     })
// })

// GET single item with user info
// router.get('/', (req, res) => {
//   db.getItemByIdWithUserInfo()
//     .then((item) => {
//       res.json(item)
//     })
//     .catch((err) => {
//       res.status(500).send({ message: 'Something went wrong' })
//     })
// })

// GET all items with user info
router.get('/', (req, res) => {
  db.getAllItemsWithUserInfo()
    .then((items) => {
      res.json(items)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({ message: 'Something went wrong' })
    })
})

// GET an item by the user ID
router.get('/:id', (req, res) => {
  const userId = req.params.id
  db.getItemsByUserId(userId)
    .then((userItems) => {
      res.json(userItems)
    })
    .catch((err) => {
      res.status(500).send({ message: 'Something went wrong' })
    })
})

// POST items (by the user)
//checkJwt
router.post('/', (req, res) => {
  const newItem = {
    itemName: req.body.itemName,
    allergens: req.body.allergens,
    description: req.body.description,
    imageUrl: req.body.image,
    expiry: req.body.expiry,
    availability: req.body.availability,
    userId: 1, //TODO: change this
  }
  console.log('adding item to db', newItem)
  return db
    .insertItem(newItem)
    .then((newItem) => {
      return res.json(newItem)
    })
    .catch((err) => {
      res.status(500).send({ message: 'Something went wrong' })
    })
})

// PATCH item
//checkJwt
router.patch('/', (req, res) => {
  const { id, ...updatedItem } = req.body
  return db
    .updateItem(updatedItem, id)
    .then((patchItem) => {
      return res.json(patchItem)
    })
    .catch((err) => {
      res.status(500).send({ message: 'Something went wrong' })
    })
})

// DELETE item
// checkJwt
router.delete('/', (req, res) => {
  const { id } = req.body
  return db
    .deleteItem(id)
    .then(() => {
      res.status(200).send('Deleted')
    })
    .catch((err) => {
      res.status(500).send('err' + err.message)
    })
})

module.exports = router
