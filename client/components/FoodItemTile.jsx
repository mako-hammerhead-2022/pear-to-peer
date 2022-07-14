import React from 'react'
import { Box, Heading, Text, Image } from '@chakra-ui/react'

export default function FoodItemTile(props) {
  console.log(props, 'props')
  const { imageUrl, itemName, allergens, description, expiry, availability } =
    props.data
  console.log(imageUrl)
  return (
    <>
      <Box>
        <Image src={imageUrl} />
        <Heading>{itemName}</Heading>
        <Text>Allergens: {JSON.parse(allergens).join(', ')}</Text>
        <Text>Description: {description}</Text>
        <Text>{expiry}</Text>
        {/* <Text>{availability}</Text> */}
      </Box>
    </>
  )
}
