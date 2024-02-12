import { describe, it, beforeEach, vi, expect } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import Candidates from '@/views/Candidates.jsx'
import { fetchCandidates } from '@/repositories/candidates.js'

vi.mock('antd', () => ({
  Skeleton: ({ children }) => <div>{children}</div>,
  Pagination: ({ children, ...props }) => <div {...props}>{children}</div>,
  Flex: ({ children }) => <div>{children}</div>,
  Typography: {
    Title: ({ children }) => <div>{children}</div>,
  },
}))

vi.mock('@/repositories/candidates', () => ({
  fetchCandidates: vi.fn(),
}))

vi.mock('@/components/CandidateCard', () => ({
  default: () => <div>CandidateCard</div>,
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}))

describe('Candidates', () => {
  beforeEach(() => {
    fetchCandidates.mockClear()
    cleanup()
  })

  describe('with candidates', () => {
    beforeEach(() => {
      fetchCandidates.mockResolvedValue({
        candidates: [{ id: 1 }, { id: 2 }],
        meta: { page: 1, totalCount: 2, perPage: 10 },
      })
    })

    it('renders the candidates title', () => {
      const { getByText } = render(<Candidates />)

      expect(getByText('candidates.title')).toBeTruthy()
    })

    it('renders the candidate list', async () => {
      const { findAllByTestId } = render(<Candidates />)

      const cards = await findAllByTestId('candidate-card')

      expect(cards).toHaveLength(2)
    })

    it('renders the pagination', async () => {
      const { findByTestId } = render(<Candidates />)

      const pagination = await findByTestId('pagination')

      expect(pagination).toBeTruthy()
      expect(pagination.getAttribute('current')).toBe('1')
      expect(pagination.getAttribute('total')).toBe('2')
      expect(pagination.getAttribute('pageSize')).toBe('10')
    })
  })
})

