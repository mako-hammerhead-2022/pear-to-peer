import request from 'superagent'

// export function getAllItems() {
//   return request.get('/api/items/').then((res) => res.body)
// }

export function getAllItemsWithUserInfo() {
  return request.get('/api/items/').then((res) => res.body)
}

export function addItem(item) {
  return request.post(`/api/items`).send(item).catch(logError)
}
// export async function getImageUrl(file, token) {
export async function getImageUrl(file) {
  const fileObject = {
    fileName: file.name,
    fileType: file.type,
  }
  console.log('getImageUrl', fileObject)
  const { signedUrl } = await request
    .post('/api/image')
    //.set('authorization', `Bearer ${token})
    .send(fileObject)
    .then((res) => res.body)

  return request
    .put(signedUrl)
    .send(file)
    .then(() => {
      return signedUrl.split('?')[0]
    })
}

function logError(err) {
  if (err.message === 'Forbidden') {
    //   throw new Error(
    //     'Only the user who added the fruit may update and delete it'
    //   )
    // } else {
    // eslint-disable-next-line no-console
    console.error('Error consuming the API (in client/api.js):', err.message)
    throw err
  }
}
