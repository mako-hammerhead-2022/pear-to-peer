import { Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserByAuth0Id } from '../slices/usersSlice'
import { fetchItemsByUserId } from '../slices/itemSlice'
import FoodItemTile from './FoodItemTile'

export default function Profile() {
  const { auth0Id, email, postcode, name, username, id } = useSelector(
    (state) => state.userData
  )
  const { items } = useSelector((state) => state.itemData)
  console.log(items, 'itemsinprofile')
  // console.log(userInfo)
  // console.log('franks food', auth0Id)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUserByAuth0Id(auth0Id))
  }, [auth0Id])

  useEffect(() => {
    dispatch(fetchItemsByUserId(id))
  }, [id])

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
                <FoodItemTile data={item} />
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
                <FoodItemTile data={item} />
              </GridItem>
            )
        })}
      </Grid>
    </>
  )
}
