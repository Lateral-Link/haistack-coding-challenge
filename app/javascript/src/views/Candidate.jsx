import React, { useState, useEffect } from 'react'
import { getCandidate } from '@/repositories/candidates.js'
import CandidateCard from '@/components/CandidateCard'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Typography } from 'antd'

const { Title } = Typography

const Candidate = () => {
  const [candidate, setCandidate] = useState([])
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation()
  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCandidate(id)

      setCandidate(response.candidate)
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <Title>
        {t('candidate.candidateDetails')}
      </Title>
      <CandidateCard candidate={candidate} loading={loading} />
    </div>
  )
}

export default Candidate
