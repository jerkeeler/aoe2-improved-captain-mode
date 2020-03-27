import React from 'react';
import { Link } from 'react-router-dom';

import Footer from '../components/Footer';
import Layout from '../components/Layout';

const Home = () => (
  <Layout>
    <header>
      <h1>Age of Empires II <u>Improved</u> Captain's Mode</h1>
      <p>DE civilizations 👍, maps 🗺, replayable drafts 🔁, and shareable draft configurations! 🤯</p>
      <p>
        <Link to="/host"><strong>Host</strong></Link>
        <a><em>Join</em></a>
        <a><em>Spectate</em></a>
      </p>
    </header>
    <section>
      <aside>
        <h3>About</h3>
        <p>Captain's mode is an Age of Empires II mode where two parties take turns picking and banning civilizations. This is used in the competitive scene to add another layer of strategy to a series of games. For some series, players take turns picking maps from a map pool as well.</p>
      </aside>
    </section>
    <Footer />
  </Layout>
);

export default Home;
