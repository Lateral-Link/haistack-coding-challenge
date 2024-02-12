import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Avatar, Flex, Typography, Button } from 'antd'
import { GiftOutlined, MailOutlined, UserOutlined, EditOutlined, DeleteFilled } from '@ant-design/icons'

const { Title } = Typography

const CandidateCard = ({ candidate, loading }) => {
  return (
    <Card loading={loading} style={{ height: '100%' }}>
      <Flex vertical gap={16} justify='space-between' style={{ height: '100%' }}>
        <Flex justify='space-between' align='center'>
          <Flex gap={16}>
            <Avatar size='large' icon={<UserOutlined />} style={{ minWidth: '40px' }} />
            <Title level={2}>{candidate.name}</Title>
          </Flex>

          <Flex gap={16} align='center'>
            <Link to={`/candidates/${candidate.id}/edit`}>
              <EditOutlined style={{ fontSize: '16px' }} />
            </Link>
            <Button icon={<DeleteFilled />} danger />
          </Flex>
        </Flex>

        <Flex gap={16} vertical>
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
