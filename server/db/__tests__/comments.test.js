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
    const comments = await db.getCommentsByItemIdWithAuthor(1, testDb)

    expect(comments).toHaveLength(3)
    expect(comments[0].itemId).toBe(1)
  })

  it('returns comment objects that contain the authors name', async () => {
    const comments = await db.getCommentsByItemIdWithAuthor(1, testDb)

    expect(comments[0].authorId).toBe(2)
    expect(comments[0].authorName).toBe('SlipsAllDay')
    expect(comments[1].authorId).toBe(1)
    expect(comments[1].authorName).toBe('HairyHarry123')
  })
})

describe('addComment', () => {
  it('adds a comment to the db and returns the new comment object', async () => {
    const newComment = {
      authorId: 1,
      itemId: 2,
      comment: 'Colourful Comment',
    }
    const actual = await db.addComment(newComment, testDb)

    expect(actual).toEqual({
      ...newComment,
      commentId: 4,
      timestamp: expect.anything(),
      authorName: 'HairyHarry123',
    })
  })
})
