import { Button, Center, Heading } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div>
      <Center>
        <Heading>404 - Page Not Found</Heading>
      </Center>
      <Button colorScheme='teal'>
        <Link to='/'>Back to Home</Link>
      </Button>
    </div>
  )
}
