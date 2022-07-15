import React from 'react'
import { HStack, Heading, Image, Center } from '@chakra-ui/react'
import logol from '@/images/logol.png'
import logor from '@/images/logor.png'

export default function Header() {
  return (
    <Center>
      <HStack>
        <Image src={logol} />
        <Heading>Pear-To-Peer</Heading>
        <Image src={logor} />
      </HStack>
    </Center>
  )
}
