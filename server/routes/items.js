const express = require('express')
const router = express.Router()

const db = require('../db')
// const {checkJwt} = require('../utils')

router.get('/', (req, res) => {
  db.getAllItems()
    .then((items) => {
      res.json(items)
    })
    .catch((err) => {
      res.status(500).send({ message: 'Something went wrong' })
    })
})

// possible get user items by ID func
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

//possible post user items? unsure where it goes

//router.post('/', checkJwt, (req, res) => {
// const {userId, content} = req.body
// const auth0Id = req.user?.sub
// const newItem = {
// userId,
// ((from pets n ))
//}
//})
module.exports = router
