import { useAuth0 } from '@auth0/auth0-react'
import { render, screen, within } from '@testing-library/react'
import React from 'react'
import { vi } from 'vitest'

import Authenticated from '@/components/Authenticated'

vi.mock('@auth0/auth0-react')

useAuth0.mockReturnValue({ isAuthenticated: true })

describe('<Authenticated />', () => {
  it.todo('')
})
