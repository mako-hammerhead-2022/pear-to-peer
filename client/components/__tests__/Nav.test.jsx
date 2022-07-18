import { useAuth0 } from '@auth0/auth0-react'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { vi } from 'vitest'

import Nav from '@/components/Nav'

vi.mock('@auth0/auth0-react')

describe('<Nav />', () => {
  it('Renders About Us, Home, Profile, Add Food and Log Off if Authenticated', () => {
    useAuth0.mockReturnValue({ isAuthenticated: true })
    render(
      <Router>
        <Nav />
      </Router>
    )
    const registerLink = screen.getAllByRole('link')
    expect(registerLink.length).toBe(5)
  })
  it('Renders Register and Sign In if not authenticated', () => {
    useAuth0.mockReturnValue({ isAuthenticated: false })
    render(
      <Router>
        <Nav />
      </Router>
    )
    const registerLink = screen.getAllByRole('link')
    expect(registerLink.length).toBe(2)
  })
})
