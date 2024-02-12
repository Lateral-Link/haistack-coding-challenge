import React from 'react'
import i18n from '@/i18n/config.js'
import { I18nextProvider } from 'react-i18next'
import Routes from '@/routes.jsx'
import NavBar from '@/components/NavBar.jsx'

import './main.css'
import 'toastify-js/src/toastify.css'

const Main = () => {
  return <I18nextProvider i18n={i18n}>
    <Routes>
      <NavBar />
    </Routes>
  </I18nextProvider>
}

export default Main
