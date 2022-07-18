const express = require('express')

const router = express.Router()

const utils = require('../utils')

router.post(
  '/',
  (req, res, next) => {
    if (process.env.NODE_ENV === 'test') return next()
    else return utils.checkJwt(req, res, next)
  },
  async (req, res) => {
    try {
      const { fileName, fileType } = req.body
      const signedUrl = await utils.generatePreSignedUrl(fileName, fileType)
      res.json({ signedUrl })
    } catch (err) {
      console.error(err)
      res.status(500).send({ message: 'Something went wrong' })
    }
  }
)

module.exports = router
