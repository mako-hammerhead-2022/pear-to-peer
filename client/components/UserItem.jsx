import { useAuth0 } from '@auth0/auth0-react'
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import Comments from '@/components/Comments'
import UpdateItemModal from '@/components/UpdateItemModal'
import { patchItem } from '@/slices/currentItem'

export default function PageItemTile(props) {
  const dispatch = useDispatch()
  const { itemsId, imageUrl, itemName, allergens, createdAt, description } =
    props.data

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { getAccessTokenSilently } = useAuth0()

  const [updatedItem, setUpdatedItem] = useState(props.data)
  const [shouldUpdate, setShouldUpdate] = useState(false)
  const [token, setToken] = useState(null)

  async function handleAvailability() {
    const fetchToken = await getAccessTokenSilently()
    setToken(fetchToken)
    setShouldUpdate(true)
    if (updatedItem.availability === 'Yes') {
      setUpdatedItem({ ...updatedItem, availability: 'No' })
    } else {
      setUpdatedItem({ ...updatedItem, availability: 'Yes' })
    }
  }

  useEffect(() => {
    if (shouldUpdate) {
      dispatch(patchItem({ item: updatedItem, token }))
    }
  }, [updatedItem])

  return (
    <>
      <Box>
        <VStack>
          <Box h='150px' w='150px' overflow={'hidden'}>
            <Image borderRadius={'lg'} src={imageUrl} alt={itemName} />
          </Box>
          <Center>
            <Heading fontFamily='pacifico' color='#1D6638' fontSize='3xl'>
              {itemName}
            </Heading>
          </Center>
          <HStack>
            <Text fontSize='lg' color='#1D6638' fontWeight={'bold'}>
              Allergens:{' '}
            </Text>
            <Text fontSize='lg'>{allergens}</Text>
          </HStack>

          <Text fontSize='lg' color='#1D6638' fontWeight={'bold'}>
            Description:{' '}
          </Text>
          <Text height={'18vh'} size={'md'} overflow='scroll' fontSize='lg'>
            {description}
          </Text>

          <HStack>
            <Text fontSize='lg' color='#1D6638' fontWeight={'bold'}>
              Date Posted:{' '}
            </Text>
            <Text fontSize='lg'>{createdAt}</Text>
          </HStack>
        </VStack>
        <VStack mt={4}>
          {updatedItem.availability === 'Yes' ? (
            <Button
              mb={4}
              w={'14vw'}
              onClick={handleAvailability}
              bgColor='#7da97a'
            >
              Make Unavailable
            </Button>
          ) : (
            <Button
              mb={4}
              w={'7vw'}
              onClick={handleAvailability}
              bgColor='#7da97a'
            >
              Make Available
            </Button>
          )}
          <HStack my={4} justify={'space-around'}>
            <Box>
              <UpdateItemModal data={props.data} />
            </Box>
            <Box>
              <Button onClick={onOpen} bgColor='#7da97a'>
                View Item
              </Button>
            </Box>
          </HStack>
        </VStack>

        <Modal size='xl' isOpen={isOpen} onClose={onClose}>
          <ModalOverlay
            bgGradient='linear(to-t, #7DA97A, #e5eee4)'
            backdropFilter='auto'
            backdropBlur='10px'
          />
          <ModalContent>
            <ModalHeader bg='#e5eee4' color='#1d6638'>
              {itemName}
            </ModalHeader>
            <ModalCloseButton bg='#7da97a' />
            <ModalBody bg='#e5eee4'>
              <Center>
                <Image
                  borderRadius={'lg'}
                  mb={4}
                  src={imageUrl}
                  alt={itemName}
                />
              </Center>
              <HStack mb={2}>
                <Text fontSize='xl' fontWeight={'bold'}>
                  Allergens:{' '}
                </Text>
                <Text fontSize='xl'>{allergens}</Text>
              </HStack>
              <Text fontSize='xl' fontWeight={'bold'}>
                Description:{' '}
              </Text>
              <Text mb={2} fontSize='xl'>
                {description}
              </Text>
              <HStack>
                <Text fontWeight={'bold'}>Date Posted: </Text>
                <Text>{createdAt}</Text>
              </HStack>

              <Comments id={itemsId}></Comments>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </>
  )
}
