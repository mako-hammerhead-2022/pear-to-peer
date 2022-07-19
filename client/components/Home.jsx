import { useAuth0 } from '@auth0/auth0-react'
import {
  Center,
  Grid,
  GridItem,
  Heading,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
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
          {/* <Container m={0}> */}
          <Center>
            <Heading py={10} mx={'auto'}>
              Available Food Items
            </Heading>
          </Center>
          <Wrap spacing={10} justify='center'>
            {/* <Grid
              w={'80vw'}
              templateColumns={{ base: `auto`, lg: 'repeat(3, 1fr)' }}
              gap={6}
            > */}
            {items.map((item) => {
              if (item.availability === 'Yes')
                return (
                  <WrapItem
                    p={4}
                    w='25rem'
                    h='27rem'
                    border='2px'
                    borderStyle='solid'
                    borderRadius={'lg'}
                    key={item.itemsId}
                    justifyContent='center'
                  >
                    <FoodItemTile data={item} />
                  </WrapItem>
                )
            })}
            {/* </Grid> */}
          </Wrap>
        </>
      )}
    </>
  )
}
