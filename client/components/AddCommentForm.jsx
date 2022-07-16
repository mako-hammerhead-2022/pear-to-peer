import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
// import { useAuth0 } from '@auth0/auth0-react'

export default function AddCommentForm() {
  const dispatch = useDispatch()
  //const { getAccessTokenSilently } = useAuth0()
  const [input, setInput] = useState('')

  function handleEnter(evt) {
    if (evt.key === 'Enter') {
      console.log('dipatching comment state', input)
      //dispatch(addComment())
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
