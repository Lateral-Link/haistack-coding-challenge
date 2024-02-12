import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button, Divider } from 'antd'

const NavBar = () => {
  const { t } = useTranslation()

  return (
    <ul style={{
      display: 'flex', gap: '4px', flexWrap: 'wrap',
      justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <li>
        <Button type="link">
          <Link to='candidates'>
            <p>{t('navBar.allCandidates')}</p>
          </Link>
        </Button>
      </li>
      <Divider type="vertical" />
      <li>
        <Button type="link">
          <Link to='candidates/new'>
            <p>{t('navBar.newCandidate')}</p>
          </Link>
        </Button>
      </li>
    </ul>
  )
}

export default NavBar

