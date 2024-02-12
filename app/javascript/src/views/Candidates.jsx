import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Flex, Typography, Skeleton, Pagination } from 'antd'
import { fetchCandidates } from '@/repositories/candidates.js'
import CandidateCard from '@/components/CandidateCard'

const { Title } = Typography

const Candidates = () => {
  const [candidates, setCandidates] = useState([])
  const [meta, setMeta] = useState({})
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation()

  const reloadCandidates = async (page = 1) => {
    setLoading(true)

    const response = await fetchCandidates({ page })

    setCandidates(response.candidates)
    setMeta(response.meta)
    setLoading(false)
  }

  useEffect(() => {
    reloadCandidates()
  }, [])

  return (
    <Flex vertical wrap gap={20} style={{ padding: '20px' }}>
      <Title>
        {t('candidates.title')}
      </Title>

      <Skeleton active loading={loading}>
        <ul style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {candidates.map((candidate) => (
            <li
              key={candidate.id}
              style={{ minWidth: '350px', flex: 1 }}
              data-testid='candidate-card'
            >
              <CandidateCard candidate={candidate} />
            </li>
          ))}
        </ul>

        <Pagination
          current={meta.page}
          total={meta.totalCount}
          pageSize={meta.perPage}
          onChange={(page) => reloadCandidates(page)}
          style={{ margin: 'auto' }}
          showSizeChanger={false}
          data-testid='pagination'
        />
      </Skeleton>
    </Flex>
  )
}

export default Candidates
