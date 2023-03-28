import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import CandidateManager from './components/CandidateManager'
import 'stylesheets/application.scss';
import { Toaster } from 'react-hot-toast';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <div className="container mx-auto px-4">
      <Toaster position='bottom-center' />
      <CandidateManager className="mt-4 sm:mt-8 md:mt-12 lg:mt-16 xl:mt-20" />
    </div>,
    document.getElementById('root')
  );
});
