import { describe, it, expect, vi } from 'vitest'
import { successToast, errorToast } from '@/lib/toast.js'
import toast from 'toastify-js'

vi.mock('toastify-js', () => ({
  default: vi.fn(() => ({
    showToast: vi.fn(),
  })),
}))

describe('lib/toast', () => {
  it('successToast', () => {
    const message = 'Success!'
    successToast(message)
    expect(toast).toHaveBeenCalledWith({
      text: message,
      close: true,
      style: {
        borderRadius: '10px',
        background: 'green',
      },
    })
  })

  it('errorToast', () => {
    const message = 'Error!'
    errorToast(message)
    expect(toast).toHaveBeenCalledWith({
      text: message,
      close: true,
      style: {
        borderRadius: '10px',
        background: 'red',
      },
    })
  })
})
