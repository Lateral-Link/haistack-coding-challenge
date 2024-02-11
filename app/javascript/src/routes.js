import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Home, Candidate } from '@/views/index.js'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'candidates',
    children: [
      {
        path: ':id',
        element: <Candidate />,
      },
    ],
  },
])
