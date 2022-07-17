import React, { useState, useEffect } from 'react'
import { Box, Heading, Text, Image, Button } from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { patchItem } from '@/slices/currentItem'

export default function PageItemTile(props) {
  const dispatch = useDispatch()
  const {
    itemsId,
    imageUrl,
    itemName,
    allergens,
    createdAt,
    description,
    expiry,
    availability,
  } = props.data
  console.log(props, 'is props')

  const [updatedItem, setUpdatedItem] = useState(props.data)
  const [shouldUpdate, setShouldUpdate] = useState(false)

  function handleAvailability() {
    setShouldUpdate(true)
    if (updatedItem.availability === 'Yes') {
      setUpdatedItem({ ...updatedItem, availability: 'No' })
    } else {
      setUpdatedItem({ ...updatedItem, availability: 'Yes' })
    }
    // await dispatch(patchItem({ ...updatedItem }))
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
