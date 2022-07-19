import { Heading } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AddCommentForm from '@/components/AddCommentForm'
import { fetchComments } from '@/slices/currentItem'

import { clearCurrentItem } from '../slices/currentItem'

export default function Comments(props) {
  const dispatch = useDispatch()
  const comments = useSelector((state) => state.currentItem.comments)

  useEffect(() => {
    dispatch(fetchComments(props.id))

    return () => dispatch(clearCurrentItem())
  }, [])

  return (
    <>
      <Heading my={4} fontSize='2xl'>
        Comments
      </Heading>
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
      <AddCommentForm itemId={props.id} />
    </>
  )
}
