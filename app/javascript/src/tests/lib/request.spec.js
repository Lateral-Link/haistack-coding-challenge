import { expect, describe, beforeEach, afterEach, it, vi } from 'vitest'
import { get, post, put, patch, del, request } from '@/lib/request.js'

describe('request functions', () => {
  const mockResponse = (status, responseData) => {
    return Promise.resolve({
      ok: status >= 200 && status < 300,
      status,
      json: () => Promise.resolve(responseData),
    })
  }

  beforeEach(() => {
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('request', () => {
    it('should make a request with given URL and options', async () => {
      const url = 'https://example.com'
      const options = { method: 'GET' }
      const responseData = { message: 'Response data' }
      fetch.mockResolvedValue(mockResponse(200, responseData))

      const result = await request(url, options)

      expect(fetch).toHaveBeenCalledWith(url, options)
      expect(result).toEqual({ data: responseData, status: 200 })
    })

    it('should return status and null data when response is not ok', async () => {
      const url = 'https://example.com'
      const options = { method: 'GET' }
      fetch.mockResolvedValue(mockResponse(404, {}))

      const result = await request(url, options)

      expect(fetch).toHaveBeenCalledWith(url, options)
      expect(result).toEqual({ data: null, status: 404 })
    })
  })

  describe('get', () => {
    it('should make a GET request with given URL and options', async () => {
      const url = 'https://example.com'
      const options = { headers: { Authorization: 'Bearer token' } }
      const responseData = { message: 'GET response data' }
      fetch.mockResolvedValue(mockResponse(200, responseData))

      const result = await get(url, options)

      expect(fetch).toHaveBeenCalledWith(url, { headers: { Authorization: 'Bearer token' } })
      expect(result).toEqual({ data: responseData, status: 200 })
    })
  })

  describe('post', () => {
    it('should make a POST request with given URL, method, and options', async () => {
      const url = 'https://example.com'
      const options = { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: 'value' }) }
      const responseData = { message: 'POST response data' }
      fetch.mockResolvedValue(mockResponse(201, responseData))

      const result = await post(url, options)

      expect(fetch).toHaveBeenCalledWith(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: 'value' }) })
      expect(result).toEqual({ data: responseData, status: 201 })
    })
  })

  describe('put', () => {
    it('should make a PUT request with given URL, method, and options', async () => {
      const url = 'https://example.com'
      const options = { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: 'value' }) }
      const responseData = { message: 'PUT response data' }
      fetch.mockResolvedValue(mockResponse(200, responseData))

      const result = await put(url, options)

      expect(fetch).toHaveBeenCalledWith(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: 'value' }) })
      expect(result).toEqual({ data: responseData, status: 200 })
    })
  })

  describe('delete', () => {
    it('should make a DELETE request with given URL, method, and options', async () => {
      const url = 'https://example.com'
      const options = { headers: { Authorization: 'Bearer token' } }
      const responseData = { message: 'DELETE response data' }
      fetch.mockResolvedValue(mockResponse(204, responseData))

      const result = await del(url, options)

      expect(fetch).toHaveBeenCalledWith(url, { method: 'DELETE', headers: { Authorization: 'Bearer token' } })
      expect(result).toEqual({ data: responseData, status: 204 })
    })
  })

  describe('patch', () => {
    it('should make a PATCH request with given URL, method, and options', async () => {
      const url = 'https://example.com'
      const options = { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: 'value' }) }
      const responseData = { message: 'PATCH response data' }
      fetch.mockResolvedValue(mockResponse(200, responseData))

      const result = await patch(url, options)

      expect(fetch).toHaveBeenCalledWith(url, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: 'value' }) })
      expect(result).toEqual({ data: responseData, status: 200 })
    })
  })
})
