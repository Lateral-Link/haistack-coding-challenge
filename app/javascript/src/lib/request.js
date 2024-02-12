export const request = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: {
      ...options.headers || {},
      'Content-Type': 'application/json',
    },
    ...options,
  })

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
export const del = async (url, options = {}) => request(url, { ...options, method: 'DELETE' })
export const post = async (url, options = {}) =>
  request(url, { ...options, method: 'POST', body: JSON.stringify(options.body) })
export const put = async (url, options = {}) =>
  request(url, { ...options, method: 'PUT', body: JSON.stringify(options.body) })
export const patch = async (url, options = {}) =>
  request(url, { ...options, method: 'PATCH', body: JSON.stringify(options.body) })
