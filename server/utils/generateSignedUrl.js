const AWS = require('aws-sdk')
require('dotenv').config()

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const S3_BUCKET = 'pear-to-peer'
const REGION = 'ap-southeast-2'
const URL_EXPIRATION_TIME = 60 // in seconds

const myBucket = new AWS.S3({
  params: { ACL: 'public-read', Bucket: S3_BUCKET },
  region: REGION,
})

function generatePreSignedPutUrl(fileName, fileType) {
  return new Promise((resolve, reject) => {
    myBucket.getSignedUrl(
      'putObject',
      {
        Key: fileName,
        ContentType: fileType,
        Expires: URL_EXPIRATION_TIME,
      },
      (err, url) => {
        if (!err) {
          return resolve(url)
        }
        return reject(err)
      }
    )
  })
}

module.exports = generatePreSignedPutUrl
