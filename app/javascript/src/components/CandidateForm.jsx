import React from 'react'
import { Input, DatePicker, Typography } from 'antd'
import { t } from 'i18next'

const { Title } = Typography

const CandidateForm = ({ candidate, setCandidate }) => {
  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <label htmlFor="name">
        <Title level={4}>{t('candidateForm.nameLabel')}</Title>
        <Input
          placeholder={t('candidateForm.namePlaceholder')}
          id="name"
          status={candidate.errors?.name ? 'error' : 'success'}
          onChange={({ target }) => setCandidate({ ...candidate, name: target.value })}
        />
      </label>

      <label htmlFor="email">
        <Title level={4}>{t('candidateForm.emailLabel')}</Title>
        <Input
          placeholder={t('candidateForm.emailPlaceholder')}
          id="email"
          type="email"
          status={candidate.errors?.email ? 'error' : 'success'}
          onChange={({ target }) => setCandidate({ ...candidate, email: target.value })}
        />
      </label>

      <label htmlFor="birthdate">
        <Title level={4}>{t('candidateForm.birthdateLabel')}</Title>
        <DatePicker
          style={{ width: '100%' }}
          status={candidate.errors?.birthdate ? 'error' : 'success'}
          onChange={(date) => setCandidate({ ...candidate, birthdate: date })}
        />
      </label>
    </form>
  )
}

export default CandidateForm
