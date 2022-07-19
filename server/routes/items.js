const express = require('express')
const router = express.Router()

const db = require('../db/items')
const utils = require('../utils')

const jwtWrapper = (req, res, next) => {
  if (process.env.NODE_ENV === 'test') return next()
  else return utils.checkJwt(req, res, next)
}

// GET /api/items
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

// GET /api/items/byUser/:id
router.get('/byUser/:id', (req, res) => {
  const userId = req.params.id
  db.getItemsByUserId(userId)
    .then((userItems) => {
      res.json(userItems)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({ message: 'Something went wrong' })
    })
})

// GET /api/items/:id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  db.getItemByIdWithUserInfo(id)
    .then((item) => {
      res.json(item)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({ message: 'Something went wrong' })
    })
})

// POST /api/items
router.post('/', jwtWrapper, async (req, res) => {
  const newItem = {
    itemName: req.body.itemName,
    allergens: req.body.allergens,
    description: req.body.description,
    imageUrl: req.body.image,
    expiry: req.body.expiry,
    availability: req.body.availability,
    auth0Id: req.auth?.sub,
  }
  return db
    .insertItem(newItem)
    .then((dbItem) => {
      res.json(dbItem)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({ message: 'Something went wrong' })
    })
})

// PATCH /api/items/update/:id
router.patch('/update/:id', jwtWrapper, async (req, res) => {
  const updatedItem = req.body
  const id = Number(updatedItem.itemsId)
  //this lets any user update any item, you probably want a check so user's can only edit their own
  try {
    const prevItem = await db.getItemByIdWithUserInfo(id)

    if (prevItem.auth0Id !== req.auth?.sub) {
      res
        .status(401)
        .send("You are not authorized to edit another user's items.")
    } else {
      const patched = await db.updateItem(id, updatedItem)
      res.json(patched)
    }
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: 'Something went wrong' })
  }
})

// DELETE item
// checkJwt
router.delete('/', (req, res) => {
  const { id } = req.body
  //this lets any user delete any item, is that what you want?
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
