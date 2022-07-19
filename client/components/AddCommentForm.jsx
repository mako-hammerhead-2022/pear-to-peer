import { useAuth0 } from '@auth0/auth0-react'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { postComment } from '@/slices/currentItem'

export default function AddCommentForm({ itemId }) {
  const dispatch = useDispatch()
  const [input, setInput] = useState('')
  const { getAccessTokenSilently } = useAuth0()
  const isError = input === ''

  // async function handleEnter(evt) {
  //   console.log(evt)
  //   if (evt.key === 'Enter') {
  //     const token = await getAccessTokenSilently()
  //     const newComment = {
  //       itemId,
  //       comment: input,
  //     }
  //     dispatch(postComment({ newComment, token }))
  //     setInput('')
  //   }
  // }

  async function handleSubmit(evt) {
    evt.preventDefault()
    const token = await getAccessTokenSilently()
    const newComment = {
      itemId,
      comment: input,
    }
    dispatch(postComment({ newComment, token }))
    setInput('')
  }

  function handleChange(evt) {
    setInput(evt.target.value)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <Input
            type='text'
            placeholder='Add a comment...'
            value={input}
            onChange={handleChange}
            required
          />
          {!isError ? (
            <FormHelperText>Contact User</FormHelperText>
          ) : (
            <FormErrorMessage>Comment is required.</FormErrorMessage>
          )}
        </FormControl>
        <Button type='submit'>Add</Button>
      </form>
    </>
  )
}
