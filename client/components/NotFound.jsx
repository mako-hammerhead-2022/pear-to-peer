import { Button, Center, Container, Heading, Image } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

import p2p from '@/images/p2p.gif'

export default function NotFound() {
  return (
    <Container bg='#f2f2f2' h='100vh' w='100vw' m='0'>
      <Center>
        <Heading>404 - Page Not Found</Heading>
      </Center>
      <Center>
        <Image src={p2p} alt={'bouncing pear'} h='20em' />
      </Center>
      <Center>
        <Heading>Something went wrong.</Heading>
      </Center>
      <Center>
        <Button colorScheme='teal'>
          <Link to='/'>Back to Home</Link>
        </Button>
      </Center>
    </Container>
  )
}
