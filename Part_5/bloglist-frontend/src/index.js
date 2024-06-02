import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotifContextProvider } from './NotificationContext'
import { UserContextProvider } from './UserContext'

import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient} contextSharing={true}>
    <UserContextProvider>
      <NotifContextProvider>
        <Router>
          <App />
        </Router>
      </NotifContextProvider>
    </UserContextProvider>
  </QueryClientProvider>
)
