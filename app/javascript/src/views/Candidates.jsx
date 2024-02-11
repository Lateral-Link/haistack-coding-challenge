import React from 'react'
import { useTranslation } from 'react-i18next'

const Candidates = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h1>
        {t('candidates')}
      </h1>
    </div>
  )
}

export default Candidates
