import { ChakraProvider } from '@chakra-ui/react'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'
import { vi } from 'vitest'

import App from '@/App.jsx'
import AboutUs from '@/components/AboutUs.jsx'
import AddItemForm from '@/components/AddItemForm.jsx'
import Header from '@/components/Header.jsx'
import Home from '@/components/Home.jsx'
import Nav from '@/components/Nav.jsx'
import NotFound from '@/components/NotFound.jsx'
import Profile from '@/components/Profile.jsx'
import Register from '@/components/Register.jsx'
import { fakeItems } from '@/test/fakeData'

vi.mock('@auth0/auth0-react')
vi.mock('@/auth0-utils')

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
vi.mock('@/components/Nav.jsx')
vi.mock('@/components/Header.jsx')
vi.mock('@/components/NotFound.jsx')

const FakeAppProvider = ({ children, initialEntries = ['/'] }) => {
  return (
    <ChakraProvider>
      <Provider store={fakeStore}>
        <Router initialEntries={initialEntries}>{children}</Router>
      </Provider>
    </ChakraProvider>
  )
}

describe('<App />', () => {
  beforeAll(() => {
    Home.mockReturnValue(<div>Home Component</div>)
    Register.mockReturnValue(<div>Register Component</div>)
    Profile.mockReturnValue(<div>Profile Component</div>)
    AboutUs.mockReturnValue(<div>AboutUs Component</div>)
    AddItemForm.mockReturnValue(<div>AddFoodItem Component</div>)
    Header.mockReturnValue(<div>Header Component</div>)
    Nav.mockReturnValue(<div>Nav Component</div>)
    NotFound.mockReturnValue(<div>Not Found Component</div>)
  })
  it('Renders the About Us default route and the navigation', () => {
    render(
      <FakeAppProvider initialEntries={['/']}>
        <App />
      </FakeAppProvider>
    )

    expect(screen.getByText('AboutUs Component')).toBeInTheDocument()
    expect(screen.getByText('Nav Component')).toBeInTheDocument()
  })

  it('Renders Home page at /home', () => {
    render(
      <FakeAppProvider initialEntries={['/home']}>
        <App />
      </FakeAppProvider>
    )

    expect(screen.getByText('Home Component')).toBeInTheDocument()
  })

  it('Renders Register page at /register', () => {
    render(
      <FakeAppProvider initialEntries={['/register']}>
        <App />
      </FakeAppProvider>
    )

    expect(screen.getByText('Register Component')).toBeInTheDocument()
  })

  it('Renders Addfooditem page at /addfooditem', () => {
    render(
      <FakeAppProvider initialEntries={['/addfooditem']}>
        <App />
      </FakeAppProvider>
    )

    expect(screen.getByText('AddFoodItem Component')).toBeInTheDocument()
  })

  it('Renders Profile page at /profile', () => {
    render(
      <FakeAppProvider initialEntries={['/profile']}>
        <App />
      </FakeAppProvider>
    )

    expect(screen.getByText('Profile Component')).toBeInTheDocument()
  })

  it('Renders NotFound page at everywhere else', () => {
    render(
      <FakeAppProvider initialEntries={['/*']}>
        <App />
      </FakeAppProvider>
    )

    expect(screen.getByText('Not Found Component')).toBeInTheDocument()
  })
})
