import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import createCandidate from '@/models/candidate.js'
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
