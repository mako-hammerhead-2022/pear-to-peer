import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import { updateItem } from '../slices/itemSlice'

export default function UpdateItem() {
  const items = useSelector((state) => state.itemData)
  console.log(items)
  let productId = useParams()
  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(updateItem(productId))
  // }, [items])

  // const item = items.find((item) => {
  //   return item.itemsId == productId.id
  // })
  return (
    <>
      <div>items here</div>
    </>
  )
}
