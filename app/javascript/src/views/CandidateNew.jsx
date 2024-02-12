import React, { useState } from 'react'
import CandidateForm from '@/components/CandidateForm.jsx'
import { useTranslation } from 'react-i18next'
import { Card, Typography, Button } from 'antd'
import { successToast, errorToast } from '@/lib/toast.js'
import { createCandidate } from '@/repositories/candidates.js'
const { Title } = Typography

const Candidate = () => {
  const [candidate, setCandidate] = useState({ name: '', email: '', birthdate: '', errors: {} })
  const { t } = useTranslation()

  const handleSubmit = async () => {
    if (!isValid()) return

    const response = await createCandidate(candidate)

    if (response.status !== 201) {
      errorToast(t('candidateNew.error'))
      return
    }

    setCandidate({ name: '', email: '', birthdate: '', errors: {} })
    successToast(t('candidateNew.success'))
  }

  const isValid = () => {
    const newErrors = {}

    if (!candidate.name) {
      newErrors.name = t('candidateForm.errors.name')
    }

    if (!candidate.email) {
      newErrors.email = t('candidateForm.errors.email')
    }

    if (!candidate.birthdate) {
      newErrors.birthdate = t('candidateForm.errors.birthdate')
    }

    if (Object.keys(newErrors).length === 0) {
      return true
    }

    setCandidate({ ...candidate, errors: newErrors })
    return false
  }

  return (
    <div style={{ padding: '20px' }}>
      <Title>
        {t('candidateNew.title')}
      </Title>
      <Card style={{ height: '100%', maxWidth: '600px' }}>
        <CandidateForm candidate={candidate} setCandidate={setCandidate} />
        <Button type='primary' onClick={handleSubmit} style={{ marginTop: '20px' }} >{t('generic.submit')}</Button>
      </Card>
    </div>
  )
}

export default Candidate
