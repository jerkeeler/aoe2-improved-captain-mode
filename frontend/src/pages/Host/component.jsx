import React from 'react';

import Layout from '../../components/Layout';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DraftPresetsList from './PresetsList';

const Host = () => (
  <Layout>
    <Navbar />
    <header>
      <p>Select a preset draft mode from the list below or...</p>
      <a href="#" className="disabled"><strong>Customize</strong></a>
    </header>
    <DraftPresetsList />
    <Footer />
  </Layout>
);

export default Host;
