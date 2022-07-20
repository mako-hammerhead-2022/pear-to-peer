import { Center, Heading, HStack, Image } from '@chakra-ui/react'
import React from 'react'

import logor from '@/images/3.png'
import logol from '@/images/6.png'

export default function Header() {
  return (
    <>
      <Center mb={4}>
        <HStack>
          <Image h={{ base: 75, md: 100, lg: 150 }} src={logol} />
          <Heading
            fontFamily='pacifico'
            color='#1D6638'
            size={{ base: 'lg', md: '3xl', lg: '4xl' }}
          >
            Pear-To-Peer
          </Heading>
          <Image h={{ base: 75, md: 100, lg: 150 }} src={logor} />
        </HStack>
      </Center>
    </>
  )
}
