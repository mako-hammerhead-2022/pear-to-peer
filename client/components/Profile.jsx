import { Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useIsRegistered } from '@/components/useIsRegistered'
import { fetchUserByAuth0Id } from '@/slices/userData'
import { fetchItemsByUserId } from '@/slices/userItems'
import PageItemTile from '@/components/UserItem'

export default function Profile() {
  const { auth0Id, email, postcode, name, username, id } = useSelector(
    (state) => state.userData
  )
  const items = useSelector((state) => state.userItems)

  const dispatch = useDispatch()
  const isRegistered = useIsRegistered()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchUserByAuth0Id(auth0Id))
  }, [auth0Id])

  useEffect(() => {
    dispatch(fetchItemsByUserId(id))
  }, [id])

  if (isRegistered === null) {
    console.log('doing a loading')
    return <p>Loading...</p>
  }

  if (isRegistered) {
    console.log('is registered')
  } else {
    if (isRegistered === false)
      // auth0 details have loaded
      navigate('/register')
    console.log('not registered')
  }

  return (
    <>
      <Heading>Your Profile:</Heading>
      <Text>Name: {name}</Text>
      <Text>Username: {username}</Text>
      <Text>email: {email} </Text>
      <Text>Postal Code: {postcode} </Text>

      <Heading>Your Current Items:</Heading>
      <Grid templateColumns='repeat(4, 1fr)' gap={6}>
        {items.map((item) => {
          if (item.availability == 'Yes')
            return (
              <GridItem key={item.itemsId}>
                <PageItemTile data={item} />
              </GridItem>
            )
        })}
      </Grid>
      <Heading>Your Previous Items:</Heading>
      <Grid templateColumns='repeat(4, 1fr)' gap={6}>
        {items.map((item) => {
          if (item.availability == 'No')
            return (
              <GridItem key={item.itemsId}>
                <PageItemTile data={item} />
              </GridItem>
            )
        })}
      </Grid>
    </>
  )
}
