const knex = require('knex')
const testConfig = require('../knexfile').test
const testDb = knex(testConfig)

const db = require('../comments')

beforeAll(async () => {
  await testDb.migrate.latest()
})

beforeEach(async () => {
  await testDb.seed.run()
})

afterAll(async () => {
  await testDb.destroy()
})

describe('getCommentsByItemIdWithAuthor', () => {
  it('returns the comments for a given itemId', async () => {
    expect.assertions(2)
    const comments = await db.getCommentsByItemIdWithAuthor(1, testDb)

    expect(comments).toHaveLength(3)
    expect(comments[0].itemId).toBe(1)
  })

  it('returns comment objects that contain the authors name', async () => {
    expect.assertions(4)
    const comments = await db.getCommentsByItemIdWithAuthor(1, testDb)

    expect(comments[0].authorId).toBe(2)
    expect(comments[0].authorName).toBe('SlipsAllDay')
    expect(comments[1].authorId).toBe(1)
    expect(comments[1].authorName).toBe('HairyHarry123')
  })
  it('returns an error when database fails', async () => {
    expect.assertions(2)
    try {
      await db.getCommentsByItemIdWithAuthor(undefined, testDb)
    } catch (err) {
      expect(err).toBeDefined()
      expect(err.message).toContain('Undefined')
    }
  })
})

describe('addComment', () => {
  expect.assertions(1)
  it('adds a comment to the db and returns the new comment object', async () => {
    const newComment = {
      auth0Id: 'auth0|1',
      itemId: 2,
      comment: 'Colourful Comment',
    }
    const actual = await db.addComment(newComment, testDb)

    expect(actual).toEqual({
      itemId: 2,
      comment: 'Colourful Comment',
      authorId: 1,
      commentId: 5,
      timestamp: expect.anything(),
      authorName: 'HairyHarry123',
    })
  })
})
