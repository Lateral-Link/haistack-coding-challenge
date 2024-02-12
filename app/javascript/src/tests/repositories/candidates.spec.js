import { describe, it, expect, vi, afterEach } from 'vitest'
import { get } from '@/lib/request.js'
import { fetchCandidates, getCandidate } from '@/repositories/candidates.js'

vi.mock('@/lib/request.js', () => ({
  get: vi.fn(),
}))

vi.mock('@/models/candidate.js', () => ({
  default: () => 'createCandidate',
  candidateMeta: () => 'candidateMeta',
}))

describe('candidates repository', () => {
  afterEach(() => {
    get.mockClear()
  })

  describe('fetchCandidates', () => {
    it('returns candidates and status', async () => {
      const candidates = [{ id: 1, name: 'John Doe' }]
      const response = { data: { candidates }, status: 200 }
      get.mockResolvedValue(response)

      const result = await fetchCandidates()

      expect(result.candidates).toEqual(['createCandidate'])
      expect(result.status).toBe(200)
    })

    it('calls get with correct params', async () => {
      const candidates = [{ id: 1, name: 'John Doe' }]
      const response = { data: { candidates }, status: 200 }
      get.mockResolvedValue(response)

      await fetchCandidates({ page: 2 })

      expect(get).toHaveBeenCalledWith('http://localhost:3000/api/v1/candidates?page=2&per_page=10')
    })

    describe('when response has meta', () => {
      it('returns meta', async () => {
        const candidates = [{ id: 1, name: 'John Doe' }]
        const meta = { total: 1 }
        const response = { data: { candidates, meta }, status: 200 }
        get.mockResolvedValue(response)

        const result = await fetchCandidates()

        expect(result.meta).toEqual('candidateMeta')
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

  describe('getCandidate', () => {
    it('returns candidate and status', async () => {
      const candidate = { id: 1, name: 'John Doe' }
      const response = { data: candidate, status: 200 }
      get.mockResolvedValue(response)

      const result = await getCandidate(1)

      expect(result.candidate).toEqual('createCandidate')
      expect(result.status).toBe(200)
    })

    describe('when response is not successful', () => {
      it('returns status', async () => {
        const response = { data: {}, status: 500 }
        get.mockResolvedValue(response)

        const result = await getCandidate(1)

        expect(result.candidate).toEqual('createCandidate')
        expect(result.status).toBe(500)
      })
    })

    describe('when response has no data', () => {
      it('returns status', async () => {
        const response = { status: 404 }
        get.mockResolvedValue(response)

        const result = await getCandidate(1)

        expect(result.candidate).toEqual('createCandidate')
        expect(result.status).toBe(404)
      })
    })
  })
})
