import { Box, Button, Heading, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link as ReactLink } from 'react-router-dom'

import { patchItem } from '@/slices/userItems'

export default function PageItemTile(props) {
  const dispatch = useDispatch()
  const { itemsId, imageUrl, itemName, allergens, createdAt, description } =
    props.data

  const [updatedItem, setUpdatedItem] = useState(props.data)
  const [shouldUpdate, setShouldUpdate] = useState(false)

  function handleAvailability() {
    setShouldUpdate(true)
    if (updatedItem.availability === 'Yes') {
      setUpdatedItem({ ...updatedItem, availability: 'No' })
    } else {
      setUpdatedItem({ ...updatedItem, availability: 'Yes' })
    }
  }

  useEffect(() => {
    if (shouldUpdate) {
      dispatch(patchItem(updatedItem))
    }
  }, [updatedItem])

  return (
    <>
      <Box>
        <Image h='100px' src={imageUrl} />
        <Heading>{itemName}</Heading>
        <Text>Allergens: {allergens}</Text>
        <Text>Description: {description}</Text>
        <Text>Date Posted: {createdAt}</Text>
        {updatedItem.availability === 'Yes' ? (
          <Button onClick={handleAvailability} colorScheme='teal'>
            Make Unavailable
          </Button>
        ) : (
          <Button onClick={handleAvailability} colorScheme='teal'>
            Make Available
          </Button>
        )}
        <ReactLink to={`/item/update/${itemsId}`}>
          <Button colorScheme='teal'>Edit Item</Button>
        </ReactLink>
        <ReactLink to={`/item/${itemsId}`}>
          <Button colorScheme='teal'>View Item</Button>
        </ReactLink>
      </Box>
    </>
  )
}
