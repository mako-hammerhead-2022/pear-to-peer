import React, { useEffect } from 'react'
import { Heading, Text, Image, Container } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import Comments from '@/components/Comments'
import { clearCurrentItem, fetchItemById } from '@/slices/currentItem'

export default function FoodItemPage() {
  const item = useSelector((state) => state.currentItem)
  const { isAuthenticated } = useAuth0()
  const productId = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchItemById(productId.id))

    return () => {
      dispatch(clearCurrentItem())
    }
  }, [])

  if (!item) return <p>Loading...</p>

  return (
    <>
      {isAuthenticated && item.allergens && (
        <Container>
          <Image src={item?.imageUrl} />
          <Heading>{item?.itemName}</Heading>
          <Text>Allergens: {item?.allergens}</Text>
          <Text>Description: {item?.description}</Text>
          <Text>Location: {item?.postcode}</Text>
          <Text>User: {item?.username}</Text>
          <Text>Date Posted: {item?.createdAt}</Text>
          <Comments itemId={productId.id} />
        </Container>
      )}
    </>
  )
}
