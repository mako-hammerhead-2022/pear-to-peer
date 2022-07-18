import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { fetchAllItems } from '@/slices/allAvailableItems'
import { useAuth0 } from '@auth0/auth0-react'

import { Container, Grid, GridItem, Heading } from '@chakra-ui/react'
import FoodItemTile from '@/components/FoodItemTile'
import { useIsRegistered } from '@/components/useIsRegistered'

export default function Home() {
  const items = useSelector((state) => state.allAvailableItems)
  const { isAuthenticated } = useAuth0()
  const dispatch = useDispatch()
  const isRegistered = useIsRegistered()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchAllItems())
  }, [])

  if (isRegistered === false) {
    navigate('/register')
  }

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
