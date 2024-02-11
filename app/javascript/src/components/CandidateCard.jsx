import React from 'react'
import { Card, Avatar, Flex, Typography } from 'antd'
import { GiftOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'

const { Title } = Typography

const CandidateCard = ({ candidate, loading }) => {
  return (
    <Card loading={loading}>
      <Flex gap={16}>
        <Avatar size='large' icon={<UserOutlined />} />

        <Flex gap={16} vertical>
          <Title level={2}>{candidate.name}</Title>

          <Flex gap={16}>
            <MailOutlined style={{ fontSize: '20px' }} />
            <a href={`mailto:${candidate.email}`} data-testid='email-link'>
              {candidate.email}
            </a>
          </Flex>

          <Flex gap={16}>
            <GiftOutlined style={{ fontSize: '20px' }} />
            <p>{candidate.birthdate?.format('YYYY/MM/DD')}</p>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  )
}

export default CandidateCard
