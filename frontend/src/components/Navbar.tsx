import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import JoinModal from './JoinModal';
import NameNavItem from './NameNavItem';

const Navbar = () => {
  const [joinModal, setJoinModal] = useState(false);
  const closeJoinModal = () => setJoinModal(false);
  const showJoinModal = () => setJoinModal(true);

  return (
    <nav>
      <JoinModal handleClose={closeJoinModal} show={joinModal} />
      <Link to="/">Home</Link>
      <ul>
        <NameNavItem />
        <li>
          <Link to="/host">Host</Link>
        </li>
        <li>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a onClick={showJoinModal} role="button">
            Join
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
