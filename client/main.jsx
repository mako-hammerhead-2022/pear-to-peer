import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { Auth0Provider } from '@auth0/auth0-react'

import App from '@/App'
import store from '@/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
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
  // {/* </React.StrictMode> */}
)
