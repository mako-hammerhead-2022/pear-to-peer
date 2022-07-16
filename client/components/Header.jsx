import React from 'react'
import { HStack, Heading, Image, Center } from '@chakra-ui/react'
import logol from '@/images/logol.png'
import logor from '@/images/logor.png'

export default function Header() {
  return (
    <Center>
      <HStack>
        <Image h={150} src={logol} />
        <Heading color='#1D6638'>Pear-To-Peer</Heading>
        <Image h={150} src={logor} />
      </HStack>
    </Center>
  )
}
