import React from 'react';
import { Link } from 'react-router-dom';

import JoinModal from './JoinModal';
import NameNavItem from './NameNavItem';

class Navbar extends React.Component {
  state = {
    joinModal: false,
  };

  closeJoinModal = () => this.setState({ joinModal: false });
  showJoinModal = () => this.setState({ joinModal: true });

  render() {
    return (
      <nav>
        <JoinModal handleClose={this.closeJoinModal} show={this.state.joinModal} />
        <Link to="/">Home</Link>
        <ul>
          <NameNavItem />
          <li><Link to="/host">Host</Link></li>
          <li><a onClick={this.showJoinModal}>Join</a></li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
