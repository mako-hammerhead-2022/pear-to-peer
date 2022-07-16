import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Heading } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

import { fetchComments } from '../slices/itemSlice'

import AddCommentForm from './AddCommentForm'

export default function Comments() {
  const { id: itemId } = useParams()
  const dispatch = useDispatch()
  const allItems = useSelector((state) => state.itemData.items)
  const [comments, setComments] = useState(null)

  useEffect(() => {
    dispatch(fetchComments(itemId))
  }, [])

  useEffect(() => {
    setComments(allItems.find((item) => item.itemsId == itemId).comments)
    console.log('use effect comments', comments)
  }, [allItems])

  return (
    <>
      <Heading>Comments</Heading>
      {comments && (
        <ul>
          {comments?.map((commentObj) => {
            console.log('cObj', commentObj)
            return (
              <li key={commentObj.commentId}>
                <strong>{commentObj.authorName}</strong>:&nbsp;
                {commentObj.comment}
              </li>
            )
          })}
        </ul>
      )}
      <AddCommentForm />
    </>
  )
}
