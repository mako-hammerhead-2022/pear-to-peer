import { useAuth0 } from '@auth0/auth0-react'
import { Container, Grid, GridItem, Heading } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import FoodItemTile from '@/components/FoodItemTile'
import { useIsRegistered } from '@/components/useIsRegistered'
import { fetchAllItems } from '@/slices/allAvailableItems'

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
        <>
          <Container m={0}>
            <Heading mx={'auto'}>Food Items</Heading>

            <Grid
              w={'80vw'}
              templateColumns={{ base: `auto`, lg: 'repeat(3, 1fr)' }}
              gap={6}
            >
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
        </>
      )}
    </>
  )
}
