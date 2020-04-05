import React from 'react';

import Layout from '../../components/Layout';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CivList from '../../components/CivList/CivList';
import DraftPresetsList from './PresetsList';

const Host = () => (
  <Layout>
    <Navbar />
    <header>
      <p>Select a preset draft mode from the list below or...</p>
      <button className="disabled">
        <strong>Customize</strong>
      </button>
    </header>
    <DraftPresetsList />
    <CivList onCivClick={(civ) => console.log(1111111, civ)} />
    <Footer />
  </Layout>
);

export default Host;
