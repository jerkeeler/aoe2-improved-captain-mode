import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../../components/Layout';
import Footer from '../../components/Footer';
import JoinModal from '../../components/JoinModal';
import NameNavItem from '../../components/NameNavItem';

const Home = () => {
  const [joinModal, setJoinModal] = useState(false);

  return (
    <Layout>
      <JoinModal handleClose={() => setJoinModal(false)} show={joinModal} />
      <nav>
        <p></p>
        <ul>
          <NameNavItem />
        </ul>
      </nav>
      <header>
        <h1>
          Age of Empires II <u>Improved</u> Captain's Mode
        </h1>
        <p>
          DE civilizations{' '}
          <span role="img" aria-label="thumbs up">
            👍
          </span>
          , maps{' '}
          <span role="img" aria-label="map">
            🗺
          </span>
          , replayable drafts{' '}
          <span role="img" aria-label="replay icon">
            🔁
          </span>
          , and shareable draft configurations!{' '}
          <span role="img" aria-label="heading exploding">
            🤯
          </span>
        </p>
        <p>
          <Link to="/host">
            <strong>Host</strong>
          </Link>
          <button className="outline" onClick={() => setJoinModal(true)}>
            <em>Join</em>
          </button>
        </p>
      </header>
      <section>
        <aside>
          <h3>About</h3>
          <p>
            Captain's mode is an Age of Empires II mode where two parties take turns picking and banning civilizations.
            This is used in the competitive scene to add another layer of strategy to a series of games. For some
            series, players take turns picking maps from a map pool as well.
          </p>
        </aside>
      </section>
      <Footer />
    </Layout>
  );
};

export default Home;
