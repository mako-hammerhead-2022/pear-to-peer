import { Box, Center, Flex, Text } from '@chakra-ui/react'
import React from 'react'

export default function Footer() {
  return (
    <Box mt={10} bgGradient='linear(to-t,  #e5eee4, #7DA97A)'>
      <Center
        h={100}
        fontFamily='pacifico'
        color='#1D6638'
        fontSize={{ base: 'lg', md: 'xl', lg: 'xl' }}
      >
        Copyright © 2022 Pear 2 Pear
      </Center>
    </Box>
  )
}
