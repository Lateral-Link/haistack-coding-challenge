import React from 'react'
import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router-dom'
import { Home, Candidate, Candidates, CandidateUpsert } from '@/views/index.js'

const Routes = ({ children }) => {
  return (
    <BrowserRouter>
      {children}

      <ReactRoutes>
        <Route path="/" element={<Home />} />
        <Route path="candidates" element={<Candidates />} />
        <Route path="candidates/new" element={<CandidateUpsert />} />
        <Route path="candidates/:id" element={<Candidate />} />
        <Route path="candidates/:id/edit" element={<CandidateUpsert />} />
      </ReactRoutes>
    </BrowserRouter>
  )
}

export default Routes
