import { useAuth0 } from '@auth0/auth0-react'
import { render, screen, waitFor,within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Provider  } from 'react-redux'
import { BrowserRouter as Router} from 'react-router-dom'
import { vi } from 'vitest'

import UserItem from '@/components/UserItem'
import { fakeItem } from '@/test/fakeData'

vi.mock('@auth0/auth0-react')

describe('<UserItem />', () => {
  const fakeStore = {
    subscribe: vi.fn(),
    dispatch: vi.fn(),
    getState: vi.fn(),
  }

  fakeStore.getState.mockReturnValue({
    myItems:{
      fakeItem,
      loading: false,
      error: null,
    }
  })

  useAuth0.mockReturnValue({
    isAuthenticated: true,
    user: {},
    getAccessTokenSilently: vi.fn(),
    fakeItem
  })

  it.skip("renders the user's items", async () => {
    render(
      <Provider store={fakeStore}>
        <Router>
        <UserItem />
        </Router>
      </Provider>
    )
    const allergens = screen.getByRole('allergens', {name: /Allergens/i})
    expect(allergens).toBeInTheDocument()



    // const handleSubmit = vi.fn()
    // render(
    //   <Provider store={store}>
    //     <Router>
    //       <UserItem></UserItem>
    //     </Router>
    //     </Provider>
    // )
  })
})