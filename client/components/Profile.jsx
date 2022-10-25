import { useAuth0 } from '@auth0/auth0-react'
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useIsRegistered } from '@/components/useIsRegistered'
import UserItem from '@/components/UserItem'
import pear from '@/images/loading.gif'
import { fetchUserByAuth0Token } from '@/slices/userData'
import { fetchItemsByUserId } from '@/slices/userItems'

import UpdateProfileModal from './UpdateProfileModal'

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
    return (
      <Box justify='center'>
        <VStack>
          <Heading color='#1D6638'>... Loading</Heading>
          <Image src={pear} alt={'disappearing pear by eating'} h='20em' />
        </VStack>
      </Box>
    )
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
      <Box
        bgColor='#d2e0d7'
        border='2px'
        borderStyle='solid'
        borderRadius={'lg'}
        p={4}
      >
        <HStack>
          <Text
            fontSize={{ base: 'md', md: 'xl' }}
            color='#1D6638'
            fontWeight={'bold'}
          >
            Name:{' '}
          </Text>
          <Text fontSize={{ base: 'md', md: 'xl' }}>{name}</Text>
        </HStack>
        <HStack>
          <Text
            fontSize={{ base: 'md', md: 'xl' }}
            color='#1D6638'
            fontWeight={'bold'}
          >
            Username:{' '}
          </Text>
          <Text fontSize={{ base: 'md', md: 'xl' }}>{username}</Text>
        </HStack>
        <HStack>
          <Text
            fontSize={{ base: 'sm', md: 'xl' }}
            color='#1D6638'
            fontWeight={'bold'}
          >
            Email:{' '}
          </Text>
          <Text fontSize={{ base: 'sm', md: 'xl' }}>{email} </Text>
        </HStack>
        <HStack>
          <Text
            fontSize={{ base: 'md', md: 'xl' }}
            color='#1D6638'
            fontWeight={'bold'}
          >
            Postal Code:{' '}
          </Text>
          <Text fontSize={{ base: 'md', md: 'xl' }}>{postcode} </Text>
        </HStack>
          <UpdateProfileModal />
      </Box>
      <Center>
        <Heading py={4} fontFamily='pacifico' color='#1D6638' fontSize='3xl'>
          Your Current Items:
        </Heading>
      </Center>

      <Wrap spacing={10} justify='center'>
        {items.map((item) => {
          if (item.availability == 'Yes')
            return (
              <WrapItem
                p={4}
                w='25rem'
                h='auto'
                borderColor={'#1D6638'}
                border='2px'
                borderStyle='solid'
                borderRadius={'lg'}
                key={item.itemsId}
                justifyContent='center'
                bgColor='#d2e0d7'
              >
                <UserItem data={item} />
              </WrapItem>
            )
        })}
      </Wrap>

      <Center>
        <Heading py={4} fontFamily='pacifico' color='#1D6638' fontSize='3xl'>
          Your Previous Items:
        </Heading>
      </Center>

      <Wrap spacing={10} justify='center'>
        {items.map((item) => {
          if (item.availability == 'No')
            return (
              <WrapItem
                p={4}
                w='25rem'
                h='auto'
                borderColor={'#1D6638'}
                border='2px'
                borderStyle='solid'
                borderRadius={'lg'}
                key={item.itemsId}
                justifyContent='center'
                bgColor='#d2e0d7'
              >
                <UserItem data={item} />
              </WrapItem>
            )
        })}
      </Wrap>
    </>
  )
}
