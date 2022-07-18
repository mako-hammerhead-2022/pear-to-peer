import { Box, Center, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react'

import pear from '@/images/p2pdarkg.png'

export default function AboutUs() {
  return (
    <Box w='80%'>
      <Center>
        <Image borderRadius='full' src={pear} alt={'Pear Tree'} h='20rem' />
      </Center>
      <Center>
        <Heading>About Us</Heading>
      </Center>
      <Center>
        <Box w='60%'>
          <Text>
            Pear 2 Peer is a community focused food sharing initiative which was
            established to help those in need and bring people in the community
            together. While times are tough, and the cost of living is rising,
            there will always be people who are willing to lend a hand and
            support those around them. Pear 2 Peer encourages those people in
            the community who are able to spare a little extra to post what they
            have available that can be given to others.
          </Text>
          <Text>
            Whether you have an overgrown lemon tree in your front yard, a few
            extra meals from a large pot of stew or you accidentally planted 18
            eggplants in your garden, feel free to sign up, and make a post so
            others can view and consume your excess.
          </Text>
        </Box>
      </Center>
    </Box>
  )
}
