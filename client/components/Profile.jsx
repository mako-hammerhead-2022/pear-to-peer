import { useAuth0 } from '@auth0/auth0-react'
import { Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useIsRegistered } from '@/components/useIsRegistered'
import PageItemTile from '@/components/UserItem'
import { fetchUserByAuth0Token } from '@/slices/userData'
import { fetchItemsByUserId } from '@/slices/userItems'

export default function Profile() {
  const { getAccessTokenSilently } = useAuth0()
  const { loading } = useSelector((state) => state.userData)
  const { email, postcode, name, username, id } = useSelector(
    (state) => state.userData.data
  )
  const items = useSelector((state) => state.userItems)
  const [token, setToken] = useState(null)

  const dispatch = useDispatch()
  const isRegistered = useIsRegistered()
  const navigate = useNavigate()

  useEffect(() => {
    async function getToken() {
      const fetchedToken = await getAccessTokenSilently()
      setToken(fetchedToken)
    }
    getToken()
  }, [])

  useEffect(() => {
    if (token) {
      dispatch(fetchUserByAuth0Token(token))
    }
  }, [token])

  useEffect(() => {
    dispatch(fetchItemsByUserId(id))
  }, [id])

  if (loading !== 'done') {
    return <p>Loading...</p>
  }

  if (isRegistered === false) {
    navigate('/register')
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
