import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { postComment } from '@/slices/currentItem'
import { fetchUserByAuth0Id } from '@/slices/userData'

export default function AddCommentForm({ itemId }) {
  const dispatch = useDispatch()
  const { user } = useAuth0()
  const [input, setInput] = useState('')
  const { id: userId } = useSelector((state) => state.userData)
  const auth0Id = user?.sub

  useEffect(() => {
    dispatch(fetchUserByAuth0Id(auth0Id))
    //JV instead of loading the whole user object you can just add the auth0 token to the postcomment api call
    //this will work but it's a bit convoluted
  }, [auth0Id])

  function handleEnter(evt) {
    if (evt.key === 'Enter') {
      const newComment = {
        authorId: userId,
        itemId,
        comment: input,
      }
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
