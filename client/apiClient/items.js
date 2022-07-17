import request from 'superagent'

export function getAllItemsWithUserInfo() {
  return request.get('/api/items/').then((res) => res.body)
}

export async function addItem(item) {
  return request
    .post(`/api/items`)
    .send(item)
    .catch((err) => console.error(err))
}

export function getItemById(id) {
  return request.get(`/api/items/${id}`).then((res) => res.body)
}

export function getAllItemsByUserId(id) {
  return request.get(`/api/items/byUser/${id}`).then((res) => res.body)
}

export function updateItem(id, item) {
  return request
    .patch(`/api/items/update/${id}`)
    .send(item)
    .catch((err) => console.error(err))
}

export function updateItemAvailability(item) {
  if (!item) {
    return undefined
  }
  return request
    .patch(`/api/items/${item.itemsId}`)
    .send(item)
    .then((res) => ({ ...res.body, itemsId: res.body.id }))
    .catch((err) => console.error(err))
}

export async function getImageUrl(file, token) {
  const fileObject = {
    fileName: file.name,
    fileType: file.type,
  }
  const { signedUrl } = await request
    .post('/api/image')
    .set('authorization', `Bearer ${token}`)
    .send(fileObject)
    .then((res) => res.body)

  return request
    .put(signedUrl)
    .send(file)
    .then(() => {
      return signedUrl.split('?')[0]
    })
}
