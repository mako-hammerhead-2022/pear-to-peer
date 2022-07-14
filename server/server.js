const express = require('express')
const path = require('path')
const fs = require('fs')

const server = express()

server.use(express.static(path.resolve(__dirname, '../dist')))

server.use(express.json())

server.use('/api/items', require('./routes/items'))
server.use('/api/users', require('./routes/users'))

server.get('*', (req, res) => {
  try {
    //res.sendFile(path.join(__dirname, 'public/index.html')) // benjamin's change
    const html = fs.readFileSync(
      path.resolve(__dirname, '../dist/index.html'),
      'utf8'
    )

    res.send(html)
  } catch (err) {
    if (err.message.includes('no such file or directory')) {
      return res
        .status(404)
        .send('dist folder not found, try running `npm run build`')
    }
    return res.status(500).send('Something went wrong')
  }
})

module.exports = server
