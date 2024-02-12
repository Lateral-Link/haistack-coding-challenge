import React from 'react'
import { createRoot } from 'react-dom/client'
import Main from '@/main.jsx'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('root')).render(<Main />)
})
