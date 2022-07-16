import React, { useState, useEffect } from 'react'
import { Box, Heading, Text, Image, Button } from '@chakra-ui/react'
import { Link as ReactLink, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { patchItem } from '../slices/itemSlice'

export default function PageItemTile(props) {
  const dispatch = useDispatch()
  const {
    itemsId,
    imageUrl,
    itemName,
    allergens,
    // username,
    description,
    expiry,
    availability,
  } = props.data

  const [updatedItem, setUpdatedItem] = useState(props.data)

  function handleAvailability() {
    if (updatedItem.availability === 'Yes') {
      setUpdatedItem({ ...updatedItem, availability: 'No' })
    } else {
      setUpdatedItem({ ...updatedItem, availability: 'Yes' })
    }
    console.log('updatedItem', updatedItem)
    // await dispatch(patchItem({ ...updatedItem }))
  }

  useEffect(() => {
    dispatch(patchItem(updatedItem))
  }, [updatedItem])

  return (
    <>
      <Box>
        <Image h='100px' src={imageUrl} />
        <Heading>{itemName}</Heading>
        <Text>Allergens: {JSON.parse(allergens).join(', ')}</Text>
        <Text>Description: {description}</Text>
        <Text>Expiry: {expiry}</Text>
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
