import { useAuth0 } from '@auth0/auth0-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { vi } from 'vitest'

import Register from '@/components/Register'
import store from '@/store'
vi.mock('@auth0/auth0-react')
// const getAccessTokenSilently = vi.fn()

describe('<Register />', () => {
  it('validates', async () => {
    const auth0Id = vi.fn()
    useAuth0.mockReturnValue({
      email: 'floopy@whattheactualf.com',
      auth0Id: auth0Id,
    })

    const handleSubmit = vi.fn()
    render(
      <Provider store={store}>
        <Router>
          <Register onSubmit={handleSubmit} />
        </Router>
      </Provider>
    )
    screen.debug()

    // const registerButton = screen.getAllByRole('button')
    // console.log(registerButton)
  })
})
