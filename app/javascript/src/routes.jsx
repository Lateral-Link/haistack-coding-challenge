import React from 'react'
import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router-dom'
import { Home, Candidate, Candidates, CandidateNew } from '@/views/index.js'

const Routes = ({ children }) => {
  return (
    <BrowserRouter>
      {children}

      <ReactRoutes>
        <Route path="/" element={<Home />} />
        <Route path="candidates" element={<Candidates />} />
        <Route path="candidates/new" element={<CandidateNew />} />
        <Route path="candidates/:id" element={<Candidate />} />
      </ReactRoutes>
    </BrowserRouter>
  )
}

export default Routes
