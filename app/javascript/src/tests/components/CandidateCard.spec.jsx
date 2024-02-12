import { expect, describe, it, vi, afterEach } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import CandidateCard from '@/components/CandidateCard.jsx'
import createCandidate from '@/models/candidate'

vi.mock('react-router-dom', () => ({
  Link: ({ children }) => <div>{children}</div>,
}))

vi.mock('antd', () => ({
  Card: ({ children }) => <div>{children}</div>,
  Avatar: ({ children }) => <div>{children}</div>,
  Button: ({ children }) => <div>{children}</div>,
  Flex: ({ children }) => <div>{children}</div>,
  Typography: {
    Title: ({ children }) => <div>{children}</div>,
  },
}))

describe('CandidateCard', () => {
  afterEach(cleanup)

  const candidate = createCandidate({
    id: 1,
    name: 'John Doe',
    email: 'john@doe.com',
    birthdate: '1990-01-01',
  })

  it('renders a card with the candidate information', () => {
    const { getByText } = render(<CandidateCard candidate={candidate} loading={false} />)

    expect(getByText('John Doe')).toBeTruthy()
    expect(getByText('john@doe.com')).toBeTruthy()
    expect(getByText('1990/01/01')).toBeTruthy()
  })

  it('renders a link to send an email to the candidate', () => {
    const { getByTestId } = render(<CandidateCard candidate={candidate} loading={false} />)

    expect(getByTestId('email-link').getAttribute('href')).toBe('mailto:john@doe.com')
  })
})
