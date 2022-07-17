import React, { useEffect } from 'react'
import { Heading, Text, Image, Container, Button } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Comments from '@/components/Comments'
import { fetchItemById } from '../slices/currentItem'

export default function FoodItemPage() {
  const item = useSelector((state) => state.currentItem)
  const productId = useParams()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchItemById(productId.id))

    // return (
    //   dispatch(clearCurrentItem())
    // )
  }, [])

  if (!item) return <p>Loading...</p>

  return (
    <>
      {item && (
        <Container>
          <Image src={item?.imageUrl} />
          <Heading>{item?.itemName}</Heading>
          {/* <Text>Allergens: {JSON.parse(item?.allergens).join(', ')}</Text> */}
          <Text>Description: {item?.description}</Text>
          <Text>Expiry: {item?.expiry}</Text>
          <Text>Availability: {item?.availability}</Text>
          <Text>Location: {item?.postcode}</Text>
          <Text>User: {item?.username}</Text>
          <Comments itemId={productId.id} />
        </Container>
      )}
    </>
  )
}
