import nock from 'nock'

import { addComment, getCommentsByItemId } from '../comments'

describe('POST /api/comments', () => {
  expect.assertions(1)
  test('post request to api route to add comment', async () => {
    const testComment = {
      authorId: 1,
      itemId: 1,
      comment: 'This one!',
    }
    const scope = nock('http://localhost')
      .post('/api/comments')
      .reply(200, testComment)
    const token = 'auth0|something'

    const commentRes = await addComment(testComment, token)

    expect(commentRes.content).toBe(testComment.content)
    scope.done()
  })
})

// NON ASYNC CODE FOR ABOVE

describe('POST /api/comments', () => {
  it('posts a request to api route to add a comment', () => {
    const testComment = {
      authorId: 1,
      itemId: 1,
      comment: 'This one!',
    }

    const scope = nock('http://localhost')
  })
})

describe('GET /api/comments/:itemId', () => {
  test('get comments by item Id', async () => {
    expect.assertions(3)
    const testComment = {
      authorId: 2,
      itemId: 2,
      comment: 'This too!',
    }

    const itemId = testComment.itemId

    const scope = nock('http://localhost')
      .get(`/api/comments/${itemId}`)
      .reply(200, testComment)

    const commentRes = await getCommentsByItemId(itemId)

    expect(commentRes.itemId).toBe(2)
    expect(commentRes.authorId).toBe(2)
    expect(commentRes.comment).toContain('This too!')
    scope.done()
  })
})
