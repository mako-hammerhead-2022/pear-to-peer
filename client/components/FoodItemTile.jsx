import React from 'react'
import {
  Box,
  Heading,
  Text,
  Image,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'

export default function FoodItemTile(props) {
  const {
    itemsId,
    imageUrl,
    itemName,
    allergens,
    username,
    postcode,
    createdAt,
  } = props.data

  return (
    <>
      <Box>
        <Image h='100px' src={imageUrl} />
        <Heading>{itemName}</Heading>
        <Text>Allergens: {allergens}</Text>
        <Text>Posted By: {username}</Text>
        <Text>Date Posted: {createdAt}</Text>
        <Text>Location: {postcode}</Text>
        <ReactLink to={`/item/${itemsId}`}>
          <Button onClick={onOpen} colorScheme='teal'>
            View More
          </Button>
        </ReactLink>
      </Box>
    </>
  )
}
