import { vi } from 'vitest'

const request = require('supertest')
const server = require('../../server')

const utils = require('../../utils')

beforeEach(() => {
  vi.spyOn(utils, 'generatePreSignedUrl')
})

afterAll(() => {
  vi.restoreAllMocks()
})

describe('POST /api/image', () => {
  it('should return a url for the client to upload their image', async () => {
    utils.generatePreSignedUrl.mockImplementation(() => {
      return Promise.resolve('image.jpg')
    })

    expect(utils.generatePreSignedUrl).not.toHaveBeenCalled()
    const res = await request(server)
      .post('/api/image')
      .send({ fileName: 'image.jpg', fileType: 'jpg' })

    expect(utils.generatePreSignedUrl).toHaveBeenCalledWith('image.jpg', 'jpg')
    expect(res.body.signedUrl).toContain('image.jpg')
  })
})
