import { useAuth0 } from '@auth0/auth0-react'
import {
  Box,
  Center,
  Grid,
  GridItem,
  Heading,
  HStack,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
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
      <Center>
        <Heading fontFamily='pacifico' color='#1D6638' py={10}>
          Your Profile:
        </Heading>
      </Center>
      <Box border='2px' borderStyle='solid' borderRadius={'lg'} p={4}>
        <HStack>
          <Text fontSize='lg' color='#1D6638' fontWeight={'bold'}>
            Name:{' '}
          </Text>
          <Text>{name}</Text>
        </HStack>
        <HStack>
          <Text fontSize='lg' color='#1D6638' fontWeight={'bold'}>
            Username:{' '}
          </Text>
          <Text>{username}</Text>
        </HStack>
        <HStack>
          <Text fontSize='lg' color='#1D6638' fontWeight={'bold'}>
            Email:{' '}
          </Text>
          <Text>{email} </Text>
        </HStack>
        <HStack>
          <Text fontSize='lg' color='#1D6638' fontWeight={'bold'}>
            Postal Code:{' '}
          </Text>
          <Text>{postcode} </Text>
        </HStack>
      </Box>
      <Center>
        <Heading py={4} fontFamily='pacifico' color='#1D6638' fontSize='3xl'>
          Your Current Items:
        </Heading>
      </Center>
      {/* <Grid templateColumns='repeat(4, 1fr)' gap={6}> */}
      <Wrap spacing={10} justify='center'>
        {items.map((item) => {
          if (item.availability == 'Yes')
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
                <PageItemTile data={item} />
              </WrapItem>
              // {/* </GridItem> */}
            )
        })}
      </Wrap>
      {/* </Grid> */}
      <Center>
        <Heading py={4} fontFamily='pacifico' color='#1D6638' fontSize='3xl'>
          Your Previous Items:
        </Heading>
      </Center>
      {/* <Grid templateColumns='repeat(4, 1fr)' gap={6}> */}
      <Wrap spacing={10} justify='center'>
        {items.map((item) => {
          if (item.availability == 'No')
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
                {/* <GridItem key={item.itemsId}> */}
                <PageItemTile data={item} />
                {/* </GridItem> */}
              </WrapItem>
            )
        })}
      </Wrap>
      {/* </Grid> */}
    </>
  )
}
