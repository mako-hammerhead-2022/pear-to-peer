import nock from 'nock'

import { addComment, getCommentsByItemId } from '../comments'

describe('POST /api/comments', () => {
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
