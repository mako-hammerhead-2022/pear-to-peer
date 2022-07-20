import { Box, Heading, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'

import pear from '@/images/p2pdarkg.png'

export default function AboutUs() {
  return (
    <VStack>
      <Heading fontFamily='pacifico' color='#1D6638' py={5}>
        About Us
      </Heading>
      <Image
        opacity='25%'
        borderRadius='full'
        src={pear}
        alt={'Pear Tree'}
        h='20rem'
      />
      <Box w={{ base: '80%', md: '50%' }}>
        <Text fontSize='xl' mb={3} textAlign='justify'>
          Pear 2 Peer is a community focused food sharing initiative which was
          established to help those in need and bring people in the community
          together. While times are tough, and the cost of living is rising,
          there will always be people who are willing to lend a hand and support
          those around them. Pear 2 Peer encourages those people in the
          community who are able to spare a little extra to post what they have
          available that can be given to others.
        </Text>
        <Text fontSize='xl' textAlign='justify'>
          Whether you have an overgrown lemon tree in your front yard, a few
          extra meals from a large pot of stew or you accidentally planted 18
          eggplants in your garden, feel free to sign up, and make a post so
          others can view and consume your excess.
        </Text>
      </Box>
    </VStack>
  )
}
