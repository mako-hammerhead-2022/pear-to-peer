import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'

import { fetchUserByAuth0Id } from '../slices/usersSlice'
import { postComment } from '../slices/itemSlice'

export default function AddCommentForm({ itemId }) {
  const dispatch = useDispatch()
  const { user, getAccessTokenSilently } = useAuth0()
  const [input, setInput] = useState('')
  const { id: userId } = useSelector((state) => state.userData)
  const auth0Id = user?.sub

  useEffect(() => {
    dispatch(fetchUserByAuth0Id(auth0Id))
  }, [auth0Id])

  function handleEnter(evt) {
    if (evt.key === 'Enter') {
      const newComment = {
        authorId: userId,
        itemId,
        comment: input,
      }
      console.log('dipatching comment', newComment)
      dispatch(postComment(newComment))
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
