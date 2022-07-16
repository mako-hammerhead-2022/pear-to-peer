import React, { useEffect } from 'react'
// import { AddItemForm } from '../components/AddItemForm'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserByAuth0Id } from '../slices/usersSlice'

export default function Profile() {
  const auth0Id = useSelector((state) => state.userData.auth0Id)
  console.log('franks food', auth0Id)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUserByAuth0Id(auth0Id))
  }, [auth0Id])

  return (
    <>
      {/* <AddItemForm /> */}
      <h1>Hey this is a profile page</h1>
    </>
  )
}
