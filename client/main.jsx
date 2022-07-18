import { Auth0Provider } from '@auth0/auth0-react'
import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from '@/App'
import store from '@/store'

import theme from './theme'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Auth0Provider
      domain={'mako-2022-scott.au.auth0.com'}
      clientId={'h5OHHO0RrdGWwpDFY5LVgqe2qFhNr9UD'}
      redirectUri={window.location.origin}
      audience='https://pear2peer/api'
    >
      <ChakraProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ChakraProvider>
    </Auth0Provider>
  </BrowserRouter>
)
