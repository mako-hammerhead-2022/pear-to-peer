import React from 'react'
import { Link as ReactLink } from 'react-router-dom'
import { Link, VStack } from '@chakra-ui/react'

import { useAuth0 } from '@auth0/auth0-react'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

export default function Nav() {
  const { logout, loginWithRedirect } = useAuth0()
  function handleLogoff(e) {
    e.preventDefault()
    logout()
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
    <>
      <VStack>
        <IfAuthenticated>
          <Link as={ReactLink} to='/aboutus'>
            About Us
          </Link>
          <Link as={ReactLink} to='/'>
            Home
          </Link>
          <Link as={ReactLink} to='/profile'>
            Profile
          </Link>
          <Link as={ReactLink} to='/' onClick={handleLogoff}>
            Log Off
          </Link>
        </IfAuthenticated>
        <IfNotAuthenticated>
          <Link as={ReactLink} to='/' onClick={handleRegister}>
            Register
          </Link>
          <Link as={ReactLink} to='/' onClick={handleSignIn}>
            Sign In
          </Link>
        </IfNotAuthenticated>
      </VStack>
    </>
  )
}

// 1. import { Link as ReachLink } from "@reach/router"

// 2. Then use it like this
{
  /* <Link as={ReachLink} to='/home'>
  Home
</Link> */
}
