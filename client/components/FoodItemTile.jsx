import {
  Box,
  Button,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
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
      <Box>
        <Image h='100px' src={imageUrl} />
        <Heading>{itemName}</Heading>
        <Text>Allergens: {allergens}</Text>
        <Text>Posted By: {username}</Text>
        <Text>Date Posted: {createdAt}</Text>
        <Text>Location: {postcode}</Text>

        <Button onClick={onOpen} colorScheme='teal'>
          View More
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay bgGradient='linear(to-t, #7DA97A, #e5eee4)' />
          <ModalContent>
            <ModalHeader bg='#e5eee4' color='#1d6638'>
              {itemName}
            </ModalHeader>
            <ModalCloseButton bg='#7da97a' />
            <ModalBody bg='#e5eee4'>
              <Image src={imageUrl} />
              <Text>Allergens: {allergens}</Text>
              <Text>Description: {description}</Text>
              <Text>Location: {postcode}</Text>
              <Text>Posted By: {username}</Text>
              <Text>Date Posted: {createdAt}</Text>
              <Comments id={itemsId}></Comments>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </>
  )
}
