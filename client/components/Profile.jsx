import { Heading, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserByAuth0Id } from '../slices/usersSlice'

export default function Profile() {
  const { auth0Id, email, postcode, name, username } = useSelector(
    (state) => state.userData
  )
  // console.log(userInfo)
  // console.log('franks food', auth0Id)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUserByAuth0Id(auth0Id))
  }, [auth0Id])

  return (
    <>
      <Heading>Your Profile</Heading>
      <Text>Name: {name}</Text>
      <Text>Username: {username}</Text>
      <Text>email: {email} </Text>
      <Text>Postal Code: {postcode} </Text>

      <Heading>Your Posts</Heading>
    </>
  )
}
