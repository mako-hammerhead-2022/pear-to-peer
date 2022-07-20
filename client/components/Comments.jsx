import { Box, Heading, HStack, Text } from '@chakra-ui/react'
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
      <Heading color='#1D6638' my={4} fontSize='2xl'>
        Comments
      </Heading>
      {comments && (
        <ul>
          {comments.map((commentObj) => {
            return (
              <HStack key={commentObj.commentId}>
                <Text fontWeight={'bold'}>{commentObj.authorName}:</Text>
                <Text>{commentObj.comment}</Text>
              </HStack>
            )
          })}
        </ul>
      )}
      <Box mt={2}>
        <AddCommentForm itemId={props.id} />
      </Box>
    </>
  )
}
