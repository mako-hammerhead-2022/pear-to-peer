import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { fetchAllItems } from '@/slices/itemSlice'

import { Container, Grid, GridItem, Heading } from '@chakra-ui/react'
import FoodItemTile from '@/components/FoodItemTile'

export default function Home() {
  const items = useSelector((state) => state.itemData.items)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllItems())
  }, [])

  return (
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
  )
}
