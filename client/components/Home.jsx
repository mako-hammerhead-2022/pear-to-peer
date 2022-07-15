import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { fetchAllItems } from '../slices/itemSlice'

import { Container, Grid, GridItem, Heading } from '@chakra-ui/react'
import FoodItemTile from './FoodItemTile'

export default function Home() {
  const items = useSelector((state) => state.itemData.items)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllItems())
  }, [])
  // return
  return (
    <Container>
      <Heading>ITEMS ARE HERE</Heading>
      <Grid templateColumns='repeat(4, 1fr)' gap={6}>
        {items.map((item) => {
          return (
            <GridItem>
              <FoodItemTile key={item.id} data={item} />
            </GridItem>
          )
        })}
      </Grid>
    </Container>
  )
}
