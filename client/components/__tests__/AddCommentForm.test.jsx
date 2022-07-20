import { useAuth0 } from '@auth0/auth0-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { vi } from 'vitest'

import AddCommentForm from '@/components/AddCommentForm'
import store from '@/store'
import { fakeComment } from '@/test/fakeData'

vi.mock('@auth0/auth0-react')

describe('<AddCommentForm />', () => {
  it('lets a user leave a comment', async () => {
    const auth0Id = vi.fn()
    const mockHandleSubmit = vi.fn()
    const mockOnSuccess = vi.fn()

    useAuth0.mockReturnValue({
      comment: 'Wow, I would love some of those!',
    })

    const handleSubmit = vi.fn()
    render(
      <Provider store={store}>
        <Router>
          <AddCommentForm onSubmit={handleSubmit} onSuccess={mockOnSuccess} />
        </Router>
      </Provider>
    )
    const addCommentButton = screen.getByRole('button', { name: /Add/i })
    expect(addCommentButton).toBeInTheDocument()

    await userEvent.click(addCommentButton)

    const modal = screen.getByRole('group')
    expect(modal).toBeInTheDocument()

    const commentInput = screen.getByText(/comment/i)
    await userEvent.type(commentInput, fakeComment.comment)

    const submitCommentButton = screen.getAllByRole('button')[1]

    await userEvent.click(submitCommentButton)

    waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalledWith({
        comment: fakeComment.comment,
      })
    })
  }, 15000)
})
