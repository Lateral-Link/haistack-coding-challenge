import { get } from '@/lib/request.js'
import createCandidate, { candidateMeta } from '@/models/candidate.js'

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000'

export const fetchCandidates = async ({ page } = {}) => {
  const params = new URLSearchParams([
    ['page', page || 1],
    ['per_page', 10],
  ])

  const response = await get(`${API_BASE_URL}/api/v1/candidates?${params}`)
  const candidates = (response.data?.candidates || []).map(createCandidate)
  const meta = candidateMeta(response.data?.meta)

  return { candidates, status: response.status, meta }
}

export const getCandidate = async (id) => {
  const response = await get(`${API_BASE_URL}/api/v1/candidates/${id}`)
  const candidate = createCandidate(response.data)

  return {
    candidate,
    status: response.status,
  }
}
