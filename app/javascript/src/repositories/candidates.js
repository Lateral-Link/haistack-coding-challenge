import { get } from '@/lib/request.js'
import createCandidate from '@/models/candidate.js'

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

export const fetchCandidates = async () => {
  const response = await get(`${BASE_URL}/api/v1/candidates`)
  const candidates = (response.data?.candidates || []).map(createCandidate)

  return {
    candidates,
    status: response.status,
    meta: response.data?.meta,
  }
}

export const getCandidate = async (id) => {
  const response = await get(`${BASE_URL}/api/v1/candidates/${id}`)
  const candidate = createCandidate(response.data)

  return {
    candidate,
    status: response.status,
  }
}
