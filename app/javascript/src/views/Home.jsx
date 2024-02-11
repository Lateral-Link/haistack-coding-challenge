import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Home = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h1>{t('welcomeToHaistack')}</h1>
      <Link to="/candidates">Go to candidates page</Link>
    </div>
  )
}

export default Home
