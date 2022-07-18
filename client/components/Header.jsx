import { Center, Heading, HStack, Image } from '@chakra-ui/react'
import React from 'react'

import logol from '@/images/logol.png'
import logor from '@/images/logor.png'

export default function Header() {
  return (
    <Center>
      <HStack>
        <Image h={150} src={logol} />
        <Heading fontFamily='pacifico' color='#1D6638' size='3xl'>
          Pear-To-Peer
        </Heading>
        <Image h={150} src={logor} />
      </HStack>
    </Center>
  )
}
