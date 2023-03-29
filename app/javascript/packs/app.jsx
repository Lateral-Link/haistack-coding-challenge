import React from 'react';
import { createRoot } from 'react-dom/client';
import CandidateManager from './organisms/CandidateManager';
import Header from './organisms/Header';
import Footer from './organisms/Footer';
import 'stylesheets/application.scss';
import { Toaster } from 'react-hot-toast';

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('root')).render(
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container mx-auto px-4 flex-grow pb-8">
          <Toaster position="bottom-center" />
          <CandidateManager className="mt-4 sm:mt-8 md:mt-12 lg:mt-16 xl:mt-20" />
        </div>
        <Footer />
      </div>
    </>
  );
});