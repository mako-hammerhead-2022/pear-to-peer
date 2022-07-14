import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { fetchAllItems } from '../slices/itemSlice'

export default function Home() {
  const items = useSelector((state) => console.log(state))
  const dispatch = useDispatch()
  console.log('items', items)

  useEffect(() => {
    dispatch(fetchAllItems())
  }, [])
  // return <Grid templateColumns='repeat(4, 1fr)'></Grid>
  return (
    <div>
      <h1>Here are the Items</h1>
      <div></div>
    </div>
  )
}
