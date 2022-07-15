import React, { useEffect } from 'react'
import { Heading, Text, Image, Container, Button } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchAllItems } from '../slices/itemSlice'

export default function FoodItemPage(props) {
  const items = useSelector((state) => state.itemData.items)
  let productId = useParams()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllItems())
  }, [])

  const item = items.find((item) => {
    return item.itemsId == productId.id
  })
  if (!item) return <p>Loading...</p>
  return (
    <>
      <Container>
        <Image src={item?.imageUrl} />
        <Heading>{item?.itemName}</Heading>
        <Text>Allergens: {JSON.parse(item?.allergens).join(', ')}</Text>
        <Text>Description: {item?.description}</Text>
        <Text>Expiry: {item?.expiry}</Text>
        <Text>Availability: {item?.availability}</Text>
        <Text>Location: {item?.postcode}</Text>
        <Text>User: {item?.username}</Text>
        <Button>Add Comment</Button>
      </Container>
    </>
  )
}
