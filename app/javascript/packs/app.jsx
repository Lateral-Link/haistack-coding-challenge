import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import CandidateManager from './components/CandidateManager'
import 'stylesheets/application.scss';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <CandidateManager />,
    document.getElementById('root')
  )
})
