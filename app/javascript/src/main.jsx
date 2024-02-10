import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from '@/views/index.js'
import i18n from '@/i18n/config.js'
import { I18nextProvider } from 'react-i18next'

import './main.css'

const Main = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
  ])

  return <I18nextProvider i18n={i18n}>
    <RouterProvider router={router} />
  </I18nextProvider>
}

export default Main
