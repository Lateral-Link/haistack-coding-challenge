import React from 'react'
import { RouterProvider } from 'react-router-dom'
import i18n from '@/i18n/config.js'
import { I18nextProvider } from 'react-i18next'
import { router } from '@/routes.js'

import './main.css'

const Main = () => {
  return <I18nextProvider i18n={i18n}>
    <RouterProvider router={router} />
  </I18nextProvider>
}

export default Main
