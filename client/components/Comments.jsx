import { Heading } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AddCommentForm from '@/components/AddCommentForm'
import { fetchComments } from '@/slices/currentItem'

export default function Comments({ itemId }) {
  const dispatch = useDispatch()
  const comments = useSelector((state) => state.currentItem.comments)

  useEffect(() => {
    dispatch(fetchComments(itemId))
  }, [])

  return (
    <>
      <Heading>Comments</Heading>
      {comments && (
        <ul>
          {comments.map((commentObj) => {
            return (
              <li key={commentObj.commentId}>
                <strong>{commentObj.authorName}</strong>:&nbsp;
                {commentObj.comment}
              </li>
            )
          })}
        </ul>
      )}
      <AddCommentForm itemId={itemId} />
    </>
  )
}
