import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import CandidateManager from './components/candidate_manager'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <CandidateManager />,
    document.getElementById('root')
  )
})
