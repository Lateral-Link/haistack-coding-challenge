import { describe, it, expect, vi } from 'vitest'
import { get } from '@/lib/request.js'
import { fetchCandidates } from '@/repositories/candidates.js'

vi.mock('@/lib/request.js', () => ({
  get: vi.fn(),
}))

vi.mock('@/models/candidate.js', () => ({ default: () => 'createCandidate' }))

describe('fetchCandidates', () => {
  it('returns candidates and status', async () => {
    const candidates = [{ id: 1, name: 'John Doe' }]
    const response = { data: { candidates }, status: 200 }
    get.mockResolvedValue(response)

    const result = await fetchCandidates()

    expect(result.candidates).toEqual(['createCandidate'])
    expect(result.status).toBe(200)
  })

  describe('when response has meta', () => {
    it('returns meta', async () => {
      const candidates = [{ id: 1, name: 'John Doe' }]
      const meta = { total: 1 }
      const response = { data: { candidates, meta }, status: 200 }
      get.mockResolvedValue(response)

      const result = await fetchCandidates()

      expect(result.meta).toEqual(meta)
    })
  })

  describe('when response has no candidates', () => {
    it('returns empty array', async () => {
      const response = { data: {}, status: 200 }
      get.mockResolvedValue(response)

      const result = await fetchCandidates()

      expect(result.candidates).toEqual([])
    })
  })

  describe('when response is not successful', () => {
    it('returns status', async () => {
      const response = { data: {}, status: 500 }
      get.mockResolvedValue(response)

      const result = await fetchCandidates()

      expect(result.candidates).toEqual([])
      expect(result.status).toBe(500)
    })
  })
})

