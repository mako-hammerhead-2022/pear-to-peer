import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'
import { vi } from 'vitest'

import App from '@/App.jsx'
import AboutUs from '@/components/AboutUs.jsx'
import AddItemForm from '@/components/AddItemForm.jsx'
import Home from '@/components/Home.jsx'
import Profile from '@/components/Profile.jsx'
import Register from '@/components/Register.jsx'
import store from '@/store'
import {fakeItems} from '@/test/fakeData'

// import { useSelector, useDispatch } from 'react-redux'

vi.mock('react-redux')
// cars
// unit test - test a single bolt on a car
// integration test - run an engine
// end to end test - take it for a test drive

// mock the hooks you need // most unit test you can get
// mock the actual provider // still unit test, but tests some setup
// use the real provider // more-like an integration test

// vitest extension

const fakeStore = {
  subscribe: vi.fn(),
  getState: vi.fn(() => {
    return {
      items: {
        data: fakeItems,
        loading: false,
        error: null,
      },
    }
  }),
  dispatch: vi.fn(),
}


vi.mock('@/components/Home.jsx')
vi.mock('@/components/Register.jsx')
vi.mock('@/components/Profile.jsx')
vi.mock('@/components/AboutUs.jsx')
vi.mock('@/components/AddItemForm.jsx')

describe('<App />', () => {
  it('Renders the Home Page default route and the navigation', () => {
    Home.mockReturnValue(<div>Home Component</div>)
    Register.mockReturnValue(<div>Register Component</div>)
    Profile.mockReturnValue(<div>Profile Component</div>)
    AboutUs.mockReturnValue(<div>AboutUs Component</div>)
    AddItemForm.mockReturnValue(<div>AddFoodItem Component</div>)
    // useSelector.mockReturnValue(0)
    // useDispatch.mockReturnValue(() => {})
    render(
      <Provider store={fakeStore}>
        <Router initialEntries={['/']}>
        <App />
        </Router>
      </Provider>
    )
    expect(screen.getByText('Home Component')).toBeInTheDocument()
    expect(screen.getByText('Register Component')).toBeInTheDocument()
    expect(screen.getByText('Profile Component')).toBeInTheDocument()
    expect(screen.getByText('AboutUs Component')).toBeInTheDocument()
    expect(screen.getByText('AddFoodItem Component')).toBeInTheDocument()
  })

//   it('increments count correctly', async () => {
//     render(
//       <Provider store={store}>
//         <App />
//       </Provider>
//     )
//     expect(screen.getByText(/0/i)).toBeInTheDocument()
//     await userEvent.click(screen.getByRole('button'))
//     expect(screen.getByText(/1/i)).toBeInTheDocument()
//   })
})