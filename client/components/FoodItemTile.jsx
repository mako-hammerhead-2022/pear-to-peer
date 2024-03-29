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
import React from 'react'

import Comments from '@/components/Comments'

export default function FoodItemTile(props) {
  const {
    itemsId,
    imageUrl,
    itemName,
    allergens,
    username,
    postcode,
    createdAt,
    description,
  } = props.data
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <VStack>
        <Box h='150px' w='150px' overflow={'hidden'}>
          <Image borderRadius={'lg'} src={imageUrl} alt={itemName} />
        </Box>
        <Heading fontFamily='pacifico' color='#1D6638' fontSize='3xl'>
          {itemName}
        </Heading>
        <HStack>
          <Text fontSize='lg' color='#1D6638' fontWeight={'bold'}>
            Allergens:
          </Text>
          <Text as='i' fontSize='lg'>
            {allergens}
          </Text>
        </HStack>
        <HStack>
          <Text fontSize='lg' color='#1D6638' fontWeight={'bold'}>
            Posted By:
          </Text>
          <Text fontSize='lg'>{username}</Text>
        </HStack>
        <HStack>
          <Text fontSize='lg' color='#1D6638' fontWeight={'bold'}>
            Date Posted:{' '}
          </Text>
          <Text fontSize='lg'>{createdAt}</Text>
        </HStack>
        <HStack>
          <Text fontSize='lg' color='#1D6638' fontWeight={'bold'}>
            Location:{' '}
          </Text>
          <Text fontSize='lg'>{postcode}</Text>
        </HStack>

        <Button
          mb={4}
          w={'full'}
          onClick={onOpen}
          border='2px'
          color='#1D6638'
          borderColor={'#1D6638'}
          bgColor='#e5eee4'
          _hover={{ background: '#1D6638', color: '#e5eee4' }}
        >
          View More
        </Button>
      </VStack>

      <Modal size='xl' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bgGradient='linear(to-t, #7DA97A, #e5eee4)' />
        <ModalContent>
          <ModalHeader bg='#e5eee4' color='#1d6638'>
            {itemName}
          </ModalHeader>
          <ModalCloseButton
            border='2px'
            color='#1D6638'
            borderColor={'#1D6638'}
            bgColor='#e5eee4'
            _hover={{ background: '#1D6638', color: '#e5eee4' }}
          />
          <ModalBody bg='#e5eee4'>
            <Center>
              <Image
                maxH={500}
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
              <Text as='i' fontSize='xl'>
                {allergens}
              </Text>
            </HStack>

            <Text fontSize='xl' fontWeight={'bold'}>
              Description:{' '}
            </Text>
            <Text mb={2} fontSize='xl'>
              {description}
            </Text>

            <HStack mb={2}>
              <Text fontSize='xl' fontWeight={'bold'}>
                Location:{' '}
              </Text>
              <Text fontSize='xl'>{postcode}</Text>
            </HStack>
            <HStack mb={2}>
              <Text fontWeight={'bold'}>Posted By: </Text>
              <Text>{username}</Text>
            </HStack>
            <HStack mb={2}>
              <Text fontWeight={'bold'}>Date Posted: </Text>
              <Text>{createdAt}</Text>
            </HStack>

            <Comments id={itemsId}></Comments>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
