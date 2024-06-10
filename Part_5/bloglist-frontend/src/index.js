import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotifContextProvider } from './NotificationContext'
import { UserContextProvider } from './UserContext'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'

const queryClient = new QueryClient()

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient} contextSharing={true}>
    <UserContextProvider>
      <NotifContextProvider>
        <ChakraProvider theme={theme}>
          <Router>
            <App />
          </Router>
        </ChakraProvider>
      </NotifContextProvider>
    </UserContextProvider>
  </QueryClientProvider>
)
