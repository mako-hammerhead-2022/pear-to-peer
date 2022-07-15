import { vi } from 'vitest'
import * as utils from '../../utils'

const request = require('supertest')
const server = require('../../server')

//export function checkJwt(req, res, next) {}

// vi.mock('../../utils', () => {
//   return {
//     checkJwt: vi.fn().mockImplementation((req, res, next) => {
//       next()
//     }),
//   }
// })

vi.spyOn(utils, 'checkJwt').mockImplementation((req, res, next) => {
  next()
})

vi.spyOn(utils, 'generatePreSignedUrl').mockReturnValue(
  Promise.resolve('http://aws/image.jpg')
)

beforeAll(() => {
  //   vi.spyOn(console, 'error')
  //   console.error.mockImplementation(() => {})
  // checkJwt.mockImplementation((req, res, next) => {
  //   next()
  // })
})

afterAll(() => {
  //   console.error.mockRestore()
  vi.restoreAllMocks()
})

describe('POST /api/image', () => {
  it.skip('should return a url for the client to upload their image', async () => {
    const res = await request(server)
      .post('/api/image')
      .send({ fileName: 'image.jpg', fileType: 'jpg' })

    expect(res.body.signedUrl).toBe('image.jpg')
  })
})
