import { useAuth0 } from '@auth0/auth0-react'
import { Flex, Link, Spacer } from '@chakra-ui/react'
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
        <Link
          fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
          as={ReactLink}
          to='/'
        >
          About Us
        </Link>
        <Spacer />
        <Link
          fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
          as={ReactLink}
          to='/home'
        >
          Home
        </Link>
        <Spacer />
        <Link
          fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
          as={ReactLink}
          to='/profile'
        >
          Profile
        </Link>
        <Spacer />
        <Link
          fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
          as={ReactLink}
          to='/addfooditem'
        >
          Add Food
        </Link>
        <Spacer />
        <Link
          mx={6}
          fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
          as={ReactLink}
          to='/'
          onClick={handleLogoff}
        >
          Log Off
        </Link>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <Link
          fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
          as={ReactLink}
          to='/'
          onClick={handleRegister}
        >
          Register
        </Link>
        <Spacer />
        <Link
          fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
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
