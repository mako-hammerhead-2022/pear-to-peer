const express = require('express')
const router = express.Router()

const db = require('../db/comments')

router.post('/', (req, res) => {
  const { authorId, itemId, comment } = req.body
  const newComment = {
    authorId,
    itemId,
    comment,
  }

  db.addComment(newComment)
    .then((dbComment) => {
      res.json(dbComment)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({ message: 'Something went wrong' })
    })
})

module.exports = router
