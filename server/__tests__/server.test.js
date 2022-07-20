const request = require('supertest')
const server = require('../server')
const fs = require('fs')
import { vi } from 'vitest'

vi.spyOn(fs, 'readFileSync')

describe('GET /api/notarealroute', () => {
  it('returns a 400 status for a non-existing route', async () => {
    const res = await request(server).get('/api/notarealroute')
    expect(res.status).toBe(400)
  })
})

describe('GET /some/total/junk/route', () => {
  it('calls fs.readFile for /dist/index.html', async () => {
    await request(server).get('/some/total/junk/route')
    expect(fs.readFileSync).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining('/dist/index.html'),
      'utf8'
    )
  })
  it('returns a 404 status if /dist/index.html does not exists', async () => {
    fs.readFileSync.mockImplementation(() => {
      throw new Error('no such file or directory')
    })
    const res = await request(server).get('/some/total/junk/route')
    expect(res.status).toBe(404)
    expect(res.text).toContain('dist folder not found')
  })
  it('returns a 500 status if any other error is thrown', async () => {
    fs.readFileSync.mockImplementation(() => {
      throw new Error()
    })
    const res = await request(server).get('/some/total/junk/route')
    expect(res.status).toBe(500)
    expect(res.text).toContain('Something went wrong')
  })
})
