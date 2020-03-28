import React from 'react';

import NameChooser from '../NameChooser';
import styles from './styles.module.css';

class NameNavItem extends React.Component {
  state = {
    modal: false,
  };

  showModal = () => this.setState({modal: true});
  hideModal = () => this.setState({modal: false});

  render() {
    const { captainName } = this.props;
    return (
      <>
        <NameChooser show={this.state.modal} handleClose={this.hideModal} />
        <li className={styles.label} onClick={this.showModal}>{ captainName } ✏️</li>
      </>
    );
  }
}

export default NameNavItem;
