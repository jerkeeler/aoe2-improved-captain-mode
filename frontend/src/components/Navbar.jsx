import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <Link to="/">Home</Link>
    <ul>
      <li><Link to="/host">Host</Link></li>
      <li><Link to="#">Join</Link></li>
      <li><Link to="#">Spectate</Link></li>
    </ul>
  </nav>
);

export default Navbar;
