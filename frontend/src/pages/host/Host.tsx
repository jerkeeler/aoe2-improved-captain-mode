import React from 'react';

import Layout from '../../components/Layout';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DraftPresetsList from './PresetsList';

const Host = () => {
  return (
    <Layout>
      <Navbar />
      <header>
        <p>Select a preset draft mode from the list below or...</p>
        <button className="disabled">
          <strong>Customize</strong>
        </button>
      </header>
      <DraftPresetsList />
      <Footer />
    </Layout>
  );
};

export default Host;
