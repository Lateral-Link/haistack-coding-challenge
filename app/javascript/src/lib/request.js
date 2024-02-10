export const request = async (url, options = {}) => {
  const response = await fetch(url, options)

  if (!response.ok) {
    return {
      data: null,
      status: response.status,
    }
  }

  return {
    data: await response.json(),
    status: response.status,
  }
}

export const get = async (url, options = {}) => request(url, options)
export const post = async (url, options = {}) => request(url, { ...options, method: 'POST' })
export const put = async (url, options = {}) => request(url, { ...options, method: 'PUT' })
export const del = async (url, options = {}) => request(url, { ...options, method: 'DELETE' })
export const patch = async (url, options = {}) => request(url, { ...options, method: 'PATCH' })
