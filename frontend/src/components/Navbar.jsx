import React from 'react';
import { Link } from 'react-router-dom';

import NameNavItem from './NameNavItem';

const Navbar = () => (
  <nav>
    <Link to="/">Home</Link>
    <ul>
      <NameNavItem />
      <li><Link to="/host">Host</Link></li>
      <li><Link to="#">Join</Link></li>
      <li><Link to="#">Spectate</Link></li>
    </ul>
  </nav>
);

export default Navbar;
