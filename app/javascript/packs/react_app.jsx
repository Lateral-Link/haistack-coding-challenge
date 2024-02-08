// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import { createRoot } from 'react-dom/client'
import Main from '@/main.jsx'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('root')).render(<Main />)
})
