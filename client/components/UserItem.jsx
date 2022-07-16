import React, { useState, useEffect } from 'react'
import { Box, Heading, Text, Image, Button } from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'

export default function PageItemTile(props) {
  const {
    itemsId,
    imageUrl,
    itemName,
    allergens,
    username,
    description,
    expiry,
    availability,
  } = props.data

  const [availabilityState, setAvailabilityState] = useState(availability)

  const handleAvailability = () => {
    if (availabilityState === 'Yes') {
      setAvailabilityState('No')
    } else {
      setAvailabilityState('Yes')
    }
  }

  useEffect(() => {})

  return (
    <>
      <Box>
        <Image h='100px' src={imageUrl} />
        <Heading>{itemName}</Heading>
        <Text>Allergens: {JSON.parse(allergens).join(', ')}</Text>
        <Text>Description: {description}</Text>
        <Text>Expiry: {expiry}</Text>
        {availabilityState === 'Yes' ? (
          <Button onClick={handleAvailability}>Make Unavailable</Button>
        ) : (
          <Button onClick={handleAvailability}>Make Available</Button>
        )}
        <ReactLink to={`/item/update/${itemsId}`}>
          <Button>Edit Item</Button>
        </ReactLink>
        <ReactLink to={`/item/${itemsId}`}>
          <Button>View Item</Button>
        </ReactLink>
      </Box>
    </>
  )
}
