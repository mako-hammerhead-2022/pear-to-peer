import { Box } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'

import Header from '@/components/Header'
import Nav from '@/components/Nav'

export default function MainLayout() {
  return (
    <>
      <Box py={3} bgGradient='linear(to-t, #7DA97A, #e5eee4)'>
        <Header />
        <Nav />
      </Box>
      {/* <Grid
      templateAreas={`"header" "main"`}
      gridTemplateRows='1fr 5fr '
      gridTemplateColumns='1fr'
      h='100vh'
      w='100vw'
      >
      <GridItem
        pl='2'
        bg='#f2f2f2'
        area={'header'}
        bgGradient='linear(to-t, #7DA97A, #e5eee4)'
        >
      </GridItem> */}
      {/* <GridItem
        pl='2'
        bg='#7DA97A'
        // bgGradient='linear(to-t, #7DA97A, #e5eee4)'
        area={'nav'}
        >
      </GridItem> */}
      {/* <GridItem pl='2' bg='#f2f2f2' area={'main'}> */}
      <Outlet />
      {/* </GridItem>
    </Grid> */}
    </>
  )
}
