import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router';
import { router } from './router';
import './index.css'
import '@mantine/core/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { createTheme, MantineProvider } from '@mantine/core';
import { Toaster } from 'react-hot-toast';

const theme = createTheme({
  /** Put your mantine theme override here */
});

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <MantineProvider theme={theme}>
        <RouterProvider router={ router } />
        <Toaster />
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
