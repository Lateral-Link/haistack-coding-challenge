import { expect, describe, test } from 'vitest'
import { render } from '@testing-library/react'
import Main from '@/main.jsx'

describe('Main', () => {
  test('renders', async () => {
    const { getByText } = render(<Main />)
    expect(getByText('Hello World!')).toBeTruthy()
  })
})
