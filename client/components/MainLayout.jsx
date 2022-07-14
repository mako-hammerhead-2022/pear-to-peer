import React from 'react'
import { Outlet } from 'react-router-dom'
import { Grid, GridItem } from '@chakra-ui/react'

import Header from './Header'
import Nav from './Nav'

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
      <GridItem pl='2' bg='green.300' area={'header'}>
        <Header />
      </GridItem>
      <GridItem pl='2' bg='blue.300' area={'nav'}>
        <Nav />
      </GridItem>
      <GridItem pl='2' bg='red.300' area={'main'}>
        <Outlet />
      </GridItem>
      {/* <h1>Pear to Peer</h1> */}
    </Grid>
  )
}
