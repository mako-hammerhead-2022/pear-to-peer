import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchAllItems } from '@/slices/allAvailableItems'
import { useAuth0 } from '@auth0/auth0-react'

import { Container, Grid, GridItem, Heading } from '@chakra-ui/react'
import FoodItemTile from '@/components/FoodItemTile'

export default function Home() {
  const items = useSelector((state) => state.allAvailableItems)
  const { isAuthenticated } = useAuth0()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllItems())
  }, [])

  return (
    <>
      {isAuthenticated && (
        <Container>
          <Heading>Food Items</Heading>
          <Grid templateColumns='repeat(4, 1fr)' gap={6}>
            {items.map((item) => {
              if (item.availability === 'Yes')
                return (
                  <GridItem key={item.itemsId}>
                    <FoodItemTile data={item} />
                  </GridItem>
                )
            })}
          </Grid>
        </Container>
      )}
    </>
  )
}
