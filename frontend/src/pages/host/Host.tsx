import React from 'react';

import Layout from '../../components/Layout';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DraftPresetsList from './PresetsList';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import ChosenCivs from '../../components/ChosenCivs';

const Host = () => {
  const civs = useSelector(({ data }: RootState) => data.civs);
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
      <ChosenCivs civs={[civs[0], civs[1], civs[23], civs[15]]} choice="banned" numChooseable={6} />
      <Footer />
    </Layout>
  );
};

export default Host;
