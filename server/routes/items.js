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
      res.json(userItems)
    })
    .catch((err) => {
      res.status(500).send({ message: 'Something went wrong' })
    })
})

// GET items by user ID
router.get('/', (req, res) => {
  const userId = req.user?.sub
  db.getItemsByUserId(userId)
    .then((userItems) => {
      res.json(userItems)
    })
    .catch((err) => {
      res.status(500).send({ message: 'Something went wrong' })
    })
})

// POST items (by the user)
//router.post('/', checkJwt, (req, res) => {
// const {userId, content} = req.body
// const auth0Id = req.user?.sub
// const newItem = {
// userId,
// ((from pets n pats authorId: auth0Id -- unsure what to change it to this second))
// content,
//}
// db.insertItem(newItem)
//.then(() => {
//  return res.status(200).send({message: 'Successful})
//})
//.catch((err) => {
// res.status(500).send(err.message)
//})
//})

// PATCH item
// router.patch('/', checkJwt, (req, res) => {})

// DELETE item
// router.delete('/', checkJwt, (req, res) => {})

module.exports = router
