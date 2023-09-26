import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import CandidateList from './CandidateList';
import CandidateNew from './CandidateNew';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<CandidateList />} />
        <Route path="/candidate/new" element={<CandidateNew />} />
      </Routes>
    </BrowserRouter>,
    document.getElementById('root')
  );
});
