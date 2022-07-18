import React from 'react'
import { Outlet } from 'react-router-dom'
import { Grid, GridItem } from '@chakra-ui/react'

import Header from '@/components/Header'
import Nav from '@/components/Nav'

export default function MainLayout() {
  return (
    <Grid
      templateAreas={`
       "header header"
       "nav main"
      `}
      gridTemplateRows='1fr 5fr '
      gridTemplateColumns='1fr 6fr'
      h='100vh'
      w='100vw'
      gap='1'
    >
      <GridItem pl='2' bg='#f2f2f2' area={'header'}>
        <Header />
      </GridItem>
      <GridItem
        pl='2'
        bg='#7DA97A'
        bgGradient='linear(to-t, #7DA97A, #e5eee4)'
        area={'nav'}
      >
        <Nav />
      </GridItem>
      <GridItem pl='2' bg='#f2f2f2' area={'main'}>
        <Outlet />
      </GridItem>
    </Grid>
  )
}
