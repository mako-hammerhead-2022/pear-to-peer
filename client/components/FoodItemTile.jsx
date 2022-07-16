import React from 'react'
import { Box, Heading, Text, Image, Button } from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'

export default function FoodItemTile(props) {
  const {
    itemsId,
    imageUrl,
    itemName,
    allergens,
    username,
    // description,
    postcode,
    // expiry,
    // availability,
  } = props.data

  return (
    <>
      <Box>
        <Image h='100px' src={imageUrl} />
        <Heading>{itemName}</Heading>
        <Text>Allergens: {JSON.parse(allergens).join(', ')}</Text>
        <Text>Posted By: {username}</Text>
        <Text>Location: {postcode}</Text>
        <ReactLink to={`/item/${itemsId}`}>
          <Button colorScheme='teal'>View More</Button>
        </ReactLink>
        {/* <Text>{expiry}</Text> */}
        {/* <Text>{availability}</Text> */}
      </Box>
    </>
  )
}
