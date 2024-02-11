import { expect, describe, it, vi, afterEach } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import Candidate from '@/views/Candidate.jsx'
import { getCandidate } from '@/repositories/candidates.js'
import { useParams } from 'react-router-dom'

vi.mock('antd', () => ({
  Typography: {
    Title: ({ children }) => <div>{children}</div>,
  },
}))

vi.mock('@/components/CandidateCard', () => ({
  default: () => <div>CandidateCard</div>,
}))

vi.mock('react-router-dom', () => ({
  useParams: vi.fn(() => ({ id: 1 })),
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}))

vi.mock('@/repositories/candidates.js', () => ({
  getCandidate: vi.fn(() =>({
    candidate: {
      id: 1,
      name: 'John Doe',
      email: 'john@doe.com',
      birthdate: '1990-01-01',
    },
  })),
}))

describe('CandidateCard', () => {
  afterEach(cleanup)

  it('renders the title', () => {
    const { getByText } = render(<Candidate />)

    expect(getByText('candidate.candidateDetails')).toBeTruthy()
  })

  it('calls the getCandidate function with the id', () => {
    useParams.mockReturnValue({ id: 2 })

    render(<Candidate />)

    expect(getCandidate).toHaveBeenCalledWith(2)
  })
})
