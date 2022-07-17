import React, { useEffect } from 'react'
import { Heading, Text, Image, Container } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { fetchAllItems } from '@/slices/itemSlice'
import Comments from '@/components/Comments'

export default function FoodItemPage() {
  const items = useSelector((state) => state.itemData.items)
  const { isAuthenticated } = useAuth0()
  const productId = useParams()
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
      {isAuthenticated && (
        <Container>
          <Image src={item?.imageUrl} />
          <Heading>{item?.itemName}</Heading>
          <Text>Allergens: {JSON.parse(item?.allergens).join(', ')}</Text>
          <Text>Description: {item?.description}</Text>
          <Text>Expiry: {item?.expiry}</Text>
          <Text>Availability: {item?.availability}</Text>
          <Text>Location: {item?.postcode}</Text>
          <Text>User: {item?.username}</Text>
          <Comments />
        </Container>
      )}
    </>
  )
}
