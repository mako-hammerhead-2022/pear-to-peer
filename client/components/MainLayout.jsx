import { Box } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Nav from '@/components/Nav'

export default function MainLayout() {
  return (
    <>
      <Box mb={6} py={3} bgGradient='linear(to-t, #7DA97A, #e5eee4)'>
        <Header />
        <Nav />
      </Box>
      <Box mx={10}>
        <Outlet />
      </Box>
      <Footer />
    </>
  )
}
