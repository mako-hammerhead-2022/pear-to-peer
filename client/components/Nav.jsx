import { useAuth0 } from '@auth0/auth0-react'
import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from '@chakra-ui/react'
import React from 'react'
import { Link as ReactLink } from 'react-router-dom'

import { IfAuthenticated, IfNotAuthenticated } from '@/components/Authenticated'

export default function Nav() {
  const { logout, loginWithRedirect } = useAuth0()

  function handleLogoff(e) {
    e.preventDefault()
    logout({ returnTo: window.location.origin })
  }

  function handleRegister(e) {
    e.preventDefault()
    loginWithRedirect({
      redirectUri: `${window.location.origin}/register`,
    })
  }

  function handleSignIn(e) {
    e.preventDefault()
    loginWithRedirect()
  }

  return (
    <Flex mx='10vw' align='center' justify='space-around'>
      <IfAuthenticated>
        <Box>
          <Menu
            display={{ base: 'contents', md: 'none', lg: 'none' }}
            color='#7da97a'
            variant='solid'
          >
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HamburgerIcon color='#7da97a' />}
              variant='solid'
              backgroundColor='#1d6638'
              display={{ base: 'display', md: 'none', lg: 'none' }}
            />
            <MenuList
              variant='solid'
              color='#1d6638'
              display={{ base: 'contents', md: 'none', lg: 'none' }}
            >
              <MenuItem variant='solid' backgroundColor='#a5c2af'>
                <Link
                  fontWeight={'bold'}
                  fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                  as={ReactLink}
                  to='/'
                >
                  About Us
                </Link>
              </MenuItem>
              <MenuItem variant='solid' backgroundColor='#a5c2af'>
                <Link
                  fontWeight={'bold'}
                  fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                  as={ReactLink}
                  to='/home'
                >
                  Home
                </Link>
              </MenuItem>
              <MenuItem variant='solid' backgroundColor='#a5c2af'>
                <Link
                  fontWeight={'bold'}
                  fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                  as={ReactLink}
                  to='/profile'
                >
                  Profile
                </Link>
              </MenuItem>
              <MenuItem variant='solid' backgroundColor='#a5c2af'>
                <Link
                  fontWeight={'bold'}
                  fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                  as={ReactLink}
                  to='/addfooditem'
                >
                  Add Food
                </Link>
              </MenuItem>
              <MenuItem variant='solid' backgroundColor='#a5c2af'>
                <Link
                  fontWeight={'bold'}
                  fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                  as={ReactLink}
                  to='/'
                  onClick={handleLogoff}
                >
                  Log Off
                </Link>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>

        <Link
          fontWeight={'bold'}
          color='#f2f2f2'
          fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
          display={{ base: 'none', md: 'contents', lg: 'contents' }}
          as={ReactLink}
          to='/'
        >
          About Us
        </Link>
        <Spacer />
        <Link
          fontWeight={'bold'}
          color='#f2f2f2'
          fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
          display={{ base: 'none', md: 'contents', lg: 'contents' }}
          as={ReactLink}
          to='/home'
        >
          Home
        </Link>
        <Spacer />
        <Link
          fontWeight={'bold'}
          color='#f2f2f2'
          fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
          display={{ base: 'none', md: 'contents', lg: 'contents' }}
          as={ReactLink}
          to='/profile'
        >
          Profile
        </Link>
        <Spacer />
        <Link
          fontWeight={'bold'}
          color='#f2f2f2'
          fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
          display={{ base: 'none', md: 'contents', lg: 'contents' }}
          as={ReactLink}
          to='/addfooditem'
        >
          Add Food
        </Link>
        <Spacer />
        <Link
          fontWeight={'bold'}
          color='#f2f2f2'
          fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
          display={{ base: 'none', md: 'contents', lg: 'contents' }}
          as={ReactLink}
          to='/'
          onClick={handleLogoff}
        >
          Log Off
        </Link>
      </IfAuthenticated>

      <IfNotAuthenticated>
        <Link
          fontWeight={'bold'}
          color='#f2f2f2'
          fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
          display={{ base: 'contents', md: 'contents', lg: 'contents' }}
          as={ReactLink}
          to='/'
          onClick={handleRegister}
        >
          Register
        </Link>
        <Spacer />
        <Link
          fontWeight={'bold'}
          color='#f2f2f2'
          fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
          display={{ base: 'contents', md: 'contents', lg: 'contents' }}
          as={ReactLink}
          to='/'
          onClick={handleSignIn}
        >
          Sign In
        </Link>
      </IfNotAuthenticated>
    </Flex>
  )
}
