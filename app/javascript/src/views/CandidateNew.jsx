import React, { useState, useEffect } from 'react'
import { getCandidate } from '@/repositories/candidates.js'
import CandidateForm from '@/components/CandidateForm.jsx'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Card, Typography, Button } from 'antd'
import { successToast, errorToast } from '@/lib/toast.js'
import { createCandidate } from '@/repositories/candidates.js'
const { Title } = Typography

const Candidate = () => {
  const [candidate, setCandidate] = useState({ name: '', email: '', birthdate: '' })
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation()
  const { id } = useParams()

  const handleSubmit = async () => {
    const response = await createCandidate(candidate)

    if (response.status !== 201) {
      errorToast(t('candidateNew.error'))
      return
    }

    setCandidate({ name: '', email: '', birthdate: '' })
    successToast(t('candidateNew.success'))
  }

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const response = await getCandidate(id)

        setCandidate(response.candidate)
        setLoading(false)
      }

      fetchData()
    } else {
      setLoading(false)
    }
  }, [])
  return (
    <div style={{ padding: '20px' }}>
      <Title>
        {t('candidateNew.title')}
      </Title>
      <Card loading={loading} style={{ height: '100%', maxWidth: '600px' }}>
        <CandidateForm candidate={candidate} setCandidate={setCandidate} loading={loading} />
        <Button type='primary' onClick={handleSubmit} style={{ marginTop: '20px' }} >{t('generic.submit')}</Button>
      </Card>
    </div>
  )
}

export default Candidate
