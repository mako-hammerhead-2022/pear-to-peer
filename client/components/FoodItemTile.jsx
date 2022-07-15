import React from 'react'
import { Box, Heading, Text, Image, Button } from '@chakra-ui/react'

export default function FoodItemTile(props) {
  const {
    imageUrl,
    itemName,
    allergens,
    username,
    // description,
    postcode,
    expiry,
    availability,
  } = props.data

  return (
    <>
      <Box>
        <Image h='100px' src={imageUrl} />
        <Heading>{itemName}</Heading>
        <Text>Allergens: {JSON.parse(allergens).join(', ')}</Text>
        <Text>Posted By: {username}</Text>
        <Text>Location: {postcode}</Text>
        <Button>View More</Button>
        {/* <Text>{expiry}</Text> */}
        {/* <Text>{availability}</Text> */}
      </Box>
    </>
  )
}
