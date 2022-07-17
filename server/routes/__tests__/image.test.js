import { vi } from 'vitest'
const { checkJwt, generatePreSignedPutUrl } = require('../../utils')

const request = require('supertest')
const server = require('../../server')

const checkJWT = { checkJwt }
const generate = { generatePreSignedPutUrl }

// const utils = { checkJwt, generatePreSignedPutUrl }
//export function checkJwt(req, res, next) {}

// vi.mock('../../utils', () => {
//   return {
//     checkJwt: vi.fn().mockImplementation((req, res, next) => {
//       next()
//     }),
//   }
// })

vi.spyOn(checkJWT, 'checkJwt').mockImplementation((req, res, next) => {
  next()
})

vi.spyOn(generate, 'generatePreSignedPutUrl').mockImplementation(
  Promise.resolve('image.jpg')
)

beforeAll(() => {
  // vi.spyOn(console, 'error')
  // console.error.mockImplementation(() => {})
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

    expect(Object.keys(res.body)).toContain('image.jpg')
  })
})
