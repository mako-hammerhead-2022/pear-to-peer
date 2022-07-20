import { Box, Button, Heading, Image, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

import p2p from '@/images/p2p.gif'

export default function NotFound() {
  return (
    <Box bg='#fffff' h='100vh' w='100vw' m='0'>
      <VStack pt={20}>
        <Heading color='#1D6638'>404 - Page Not Found</Heading>
        <Image src={p2p} alt={'bouncing pear'} h='20em' />
        <Heading color='#1D6638'>Something went wrong.</Heading>
        <Button bgColor='#7da97a'>
          <Link to='/'>Back to Home</Link>
        </Button>
      </VStack>
    </Box>
  )
}
