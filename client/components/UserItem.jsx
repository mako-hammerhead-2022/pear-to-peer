import React, { useState, useEffect } from 'react'
import { Box, Heading, Text, Image, Button } from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'

export default function PageItemTile(props) {
  const {
    itemsId,
    imageUrl,
    itemName,
    allergens,
    // username,
    description,
    expiry,
    // availability,
  } = props.data

  // const [availabilityState, setAvailabilityState] = useState(availability)
  const [updatedItem, setUpdatedItem] = useState(props.data)
  console.log('updatedItem', updatedItem)

  const handleAvailability = () => {
    if (updatedItem.availability === 'Yes') {
      setUpdatedItem({ ...updatedItem, availability: 'No' })
    } else {
      setUpdatedItem({ ...updatedItem, availability: 'Yes' })
    }
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
          <Button onClick={handleAvailability}>Make Unavailable</Button>
        ) : (
          <Button onClick={handleAvailability}>Make Available</Button>
        )}
        <Button>Edit Item</Button>
        <ReactLink to={`/item/${itemsId}`}>
          <Button>View Item</Button>
        </ReactLink>
      </Box>
    </>
  )
}
