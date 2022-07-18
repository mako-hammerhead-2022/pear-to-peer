const express = require('express')
const router = express.Router()

const db = require('../db/comments')
const utils = require('../utils')

router.post(
  '/',
  (req, res, next) => {
    if (process.env.NODE_ENV === 'test') return next()
    else return utils.checkJwt(req, res, next)
  },
  (req, res) => {
    const { itemId, comment } = req.body
    const newComment = {
      authorId: req.auth?.sub,
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
  }
)

router.get('/:itemId', (req, res) => {
  const itemId = Number(req.params.itemId)

  db.getCommentsByItemIdWithAuthor(itemId)
    .then((comments) => {
      res.json(comments)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({ message: 'Something went wrong' })
    })
})

module.exports = router
