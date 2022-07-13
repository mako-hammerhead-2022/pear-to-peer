import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import userEvent from '@testing-library/user-event'
import App from '@/App'
import store from '@/store'

// import { useSelector, useDispatch } from 'react-redux'
// import { vi } from 'vitest'

//vi.mock('react-redux')
// cars
// unit test - test a single bolt on a car
// integration test - run an engine
// end to end test - take it for a test drive

// mock the hooks you need // most unit test you can get
// mock the actual provider // still unit test, but tests some setup
// use the real provider // more-like an integration test

// vitest extension

describe('<App />', () => {
  it('renders', () => {
    // useSelector.mockReturnValue(0)
    // useDispatch.mockReturnValue(() => {})
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )
    expect(screen.getAllByText(/vite/i)[0]).toBeInTheDocument()
  })
  it('increments count correctly', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )
    expect(screen.getByText(/0/i)).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button'))
    expect(screen.getByText(/1/i)).toBeInTheDocument()
  })
})
