import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import createCandidate, { candidateMeta } from '@/models/candidate.js'
import dayjs from 'dayjs'

describe('createCandidate function', () => {
  beforeEach(() => {
    vi.spyOn(Date, 'now').mockImplementation(() => new Date('2022-01-01T00:00:00Z').getTime())
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should return the correct values for it\'s attributes', () => {
    const candidateData = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      birthdate: '1990-01-01',
    }
    const candidate = createCandidate(candidateData)

    expect(candidate.id).toBe(candidateData.id)
    expect(candidate.name).toBe(candidateData.name)
    expect(candidate.email).toBe(candidateData.email)
    expect(candidate.birthdate).toEqual(dayjs(candidateData.birthdate))
  })

  describe('when the candidate is missing all attributes', () => {
    it('should return the correct values for it\'s attributes', () => {
      const candidateData = {}
      const candidate = createCandidate(candidateData)

      expect(candidate.id).toBe(undefined)
      expect(candidate.name).toBe(undefined)
      expect(candidate.email).toBe(undefined)
      expect(candidate.birthdate).toEqual(dayjs(undefined))
    })
  })
})

describe('candidateMeta function', () => {
  it('should return the correct values for it\'s attributes', () => {
    const meta = {
      page: 1,
      per_page: 10,
      total_count: 100,
      total_pages: 10,
    }
    const candidateMetaResult = candidateMeta(meta)

    expect(candidateMetaResult.page).toBe(meta.page)
    expect(candidateMetaResult.perPage).toBe(meta.per_page)
    expect(candidateMetaResult.totalCount).toBe(meta.total_count)
    expect(candidateMetaResult.totalPages).toBe(meta.total_pages)
  })

  describe('when the meta is missing all attributes', () => {
    it('should return the correct values for it\'s attributes', () => {
      const meta = {}
      const candidateMetaResult = candidateMeta(meta)

      expect(candidateMetaResult.page).toBe(undefined)
      expect(candidateMetaResult.perPage).toBe(undefined)
      expect(candidateMetaResult.totalCount).toBe(undefined)
      expect(candidateMetaResult.totalPages).toBe(undefined)
    })
  })
})
