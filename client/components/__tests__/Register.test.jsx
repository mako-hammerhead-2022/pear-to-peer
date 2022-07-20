import { useAuth0 } from '@auth0/auth0-react'
import { render, screen} from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { vi } from 'vitest'

import Register from '@/components/Register'
import store from '@/store'
vi.mock('@auth0/auth0-react')

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
  })
})
