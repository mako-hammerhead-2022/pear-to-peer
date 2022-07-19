import { Center, Heading, HStack, Image } from '@chakra-ui/react'
import React from 'react'

import logol from '@/images/logol.png'
import logor from '@/images/logor.png'

import Nav from './Nav'

export default function Header() {
  return (
    <>
      <Center>
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
      {/* <Nav /> */}
    </>
  )
}
