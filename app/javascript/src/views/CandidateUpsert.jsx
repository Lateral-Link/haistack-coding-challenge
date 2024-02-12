import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CandidateForm from '@/components/CandidateForm.jsx'
import { useTranslation } from 'react-i18next'
import { Card, Typography, Button } from 'antd'
import { successToast, errorToast } from '@/lib/toast.js'
import { createCandidate, getCandidate, updateCandidate } from '@/repositories/candidates.js'
const { Title } = Typography

const CandidateUpsert = () => {
  const [candidate, setCandidate] = useState({ name: '', email: '', birthdate: '', errors: {} })
  const { t } = useTranslation()
  const { id } = useParams()

  const handleSubmit = async () => {
    if (!isValid()) return

    id ? await update() : await create()
  }

  const update = async () => {
    const response = await updateCandidate(id, candidate)

    if (response.status !== 200) {
      errorToast(t('candidateUpsert.error'))
      return
    }

    successToast(t('candidateUpsert.updateSuccess'))
  }

  const create = async () => {
    const response = await createCandidate(candidate)

    if (response.status !== 201) {
      errorToast(t('candidateUpsert.error'))
      return
    }

    setCandidate({ name: '', email: '', birthdate: '', errors: {} })
    successToast(t('candidateUpsert.createSuccess'))
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

  useEffect(() => {
    if (!id) return

    const fetchCandidate = async () => {
      const response = await getCandidate(id)

      if (response.status !== 200) {
        errorToast(t('candidateUpsert.error'))
        return
      }

      setCandidate(response.candidate.toForm())
    }

    fetchCandidate()
  }, [id])

  return (
    <div style={{ padding: '20px' }}>
      <Title>
        {t('candidateUpsert.title')}
      </Title>
      <Card style={{ height: '100%', maxWidth: '600px' }}>
        <CandidateForm candidate={candidate} setCandidate={setCandidate} />
        <Button type='primary' onClick={handleSubmit} style={{ marginTop: '20px' }} >{t('generic.submit')}</Button>
      </Card>
    </div>
  )
}

export default CandidateUpsert
