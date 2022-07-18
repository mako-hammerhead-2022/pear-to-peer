import { useAuth0 } from '@auth0/auth0-react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { postComment } from '@/slices/currentItem'

export default function AddCommentForm({ itemId }) {
  const dispatch = useDispatch()
  const [input, setInput] = useState('')
  const { getAccessTokenSilently } = useAuth0()

  async function handleEnter(evt) {
    if (evt.key === 'Enter') {
      const token = await getAccessTokenSilently()
      const newComment = {
        itemId,
        comment: input,
      }
      dispatch(postComment({ newComment, token }))
      setInput('')
    }
  }

  function handleChange(evt) {
    setInput(evt.target.value)
  }

  return (
    <input
      type='text'
      placeholder='Add a comment...'
      value={input}
      onChange={handleChange}
      onKeyDown={handleEnter}
    />
  )
}
