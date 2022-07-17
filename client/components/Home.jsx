import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { fetchAllItems } from '@/slices/allAvailableItems'

import { Container, Grid, GridItem, Heading } from '@chakra-ui/react'
import FoodItemTile from '@/components/FoodItemTile'

export default function Home() {
  const items = useSelector((state) => state.allAvailableItems)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllItems())
  }, [])

  return (
    <Container>
      <Heading>Food Items</Heading>
      <Grid templateColumns='repeat(4, 1fr)' gap={6}>
        {console.log(items)}
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
  )
}
