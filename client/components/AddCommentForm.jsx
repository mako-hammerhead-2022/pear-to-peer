import { useAuth0 } from '@auth0/auth0-react'
import { Button, Input } from '@chakra-ui/react'
// import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { postComment } from '@/slices/currentItem'

export default function AddCommentForm({ itemId }) {
  const dispatch = useDispatch()
  const [input, setInput] = useState('')
  const { getAccessTokenSilently } = useAuth0()

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

  async function handleSubmit() {
    // console.log(evt)
    // if (evt.key === 'Enter' || evt.type === 'click') {
    const token = await getAccessTokenSilently()
    const newComment = {
      itemId,
      comment: input,
    }
    dispatch(postComment({ newComment, token }))
    setInput('')
    // }
  }

  function handleChange(evt) {
    setInput(evt.target.value)
  }

  // function validateComment(value) {
  //   let error
  //   if (!value) {
  //     error = 'Comment is required.'
  //   }
  //   return error
  // }

  return (
    <>
      <form>
        <Input
          type='text'
          placeholder='Add a comment...'
          value={input}
          onChange={handleChange}
          // onKeyDown={handleEnter}
          isRequired
        />
        <Button type='submit' onClick={handleSubmit}>
          Add
        </Button>
      </form>
    </>
  )
}
