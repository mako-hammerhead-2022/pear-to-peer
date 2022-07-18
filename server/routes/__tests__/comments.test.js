import { vi } from 'vitest'

const request = require('supertest')
const server = require('../../server')
const db = require('../../db/comments')

vi.spyOn(db, 'getCommentsByItemIdWithAuthor')
vi.spyOn(db, 'addComment')

beforeAll(() => {
  vi.spyOn(console, 'error')
  console.error.mockImplementation(() => {})
})

afterAll(() => {
  console.error.mockRestore()
  vi.restoreAllMocks()
})

describe('GET /api/comments/:itemId', () => {
  it('returns comment by item id with the author', async () => {
    expect.assertions(2)
    const testComment = {
      authorId: 1,
      itemId: 1,
      comment: 'This one!',
    }

    db.getCommentsByItemIdWithAuthor.mockReturnValue(
      Promise.resolve(testComment)
    )

    const res = await request(server).get('/api/comments/:itemId')
    expect(res.status).toBe(200)
    expect(res.text).toContain('This one!')
  })
  it("should return status 500 and error when database doesn't work", async () => {
    expect.assertions(2)
    db.getCommentsByItemIdWithAuthor.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )
    const res = await request(server).get('/api/comments/:itemId')
    expect(res.status).toBe(500)
    expect(res.text).toContain('Something went wrong')
  })
})

describe('POST /api/comments', () => {
  it('adds a new comment', async () => {
    expect.assertions(4)
    const testComment = {
      authorId: 1,
      itemId: 1,
      comment: 'This one!',
    }

    const dbFunction = db.addComment.mockReturnValue(
      Promise.resolve(testComment)
    )

    const res = await request(server).post('/api/comments')
    expect(res.status).toBe(200)
    expect(res.body.authorId).toEqual(1)
    expect(res.body.itemId).toEqual(1)
    expect(res.text).toContain('This one!')
  })
  it("should return status 500 and error when database doesn't work", async () => {
    expect.assertions(2)
    db.addComment.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )
    const res = await await request(server).post('/api/comments')
    expect(res.status).toBe(500)
    expect(res.text).toContain('Something went wrong')
  })
})
