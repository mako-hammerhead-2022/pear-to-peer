import React from 'react'
import { Link } from 'react-router-dom'
import { Center, Button, Heading } from '@chakra-ui/react'

export default function NotFound() {
  return (
    <div>
      <Center>
        <Heading>404 - Page Not Found</Heading>
      </Center>
      <Button>
        <Link to='/'>Back to Home</Link>
      </Button>
    </div>
  )
}
