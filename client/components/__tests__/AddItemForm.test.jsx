import { useAuth0 } from '@auth0/auth0-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { vi } from 'vitest'

import AddItemForm from '@/components/AddItemForm'
import store from '@/store'
import { fakeItem } from '@/test/fakeData'

vi.mock('@auth0/auth0-react')

describe('<AddItemForm />', () => {
  it('lets a user add an item', async () => {
    const mockHandleSubmit = vi.fn()
    const mockOnSuccess = vi.fn()

    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user: {},
      getAccessTokenSilently: vi.fn(),
      fakeItem,
    })

    const handleSubmit = vi.fn()
    render(
      <Provider store={store}>
        <Router>
          <AddItemForm onSubmit={handleSubmit} on Success={mockOnSuccess} />
        </Router>
      </Provider>
    )
    const addItemButton = screen.getByRole('button', { name: /Add Item/i })
    expect(addItemButton).toBeInTheDocument()

    await userEvent.click(addItemButton)

    const itemName = screen.getByLabelText(/Item Name:/i)
    const allergens = screen.getByLabelText(/Allergens:/i)
    const description = screen.getByLabelText(/Description of food item:/i)
    const image = screen.getByLabelText(/Upload image:/i)
    const availability = screen.getByLabelText(/Is this item available?/i)

    await userEvent.click(addItemButton)

    waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalledWith({
        itemName: fakeItem.itemName,
        allergens: fakeItem.allergens,
        description: fakeItem.description,
        imageUrl: fakeItem.imageUrl,
        availability: fakeItem.availability,
      })
    })
  }, 15000)
})
