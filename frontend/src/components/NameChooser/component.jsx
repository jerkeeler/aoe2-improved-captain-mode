import React from 'react';

import Modal from '../Modal';
import { randomEl } from '../../random';
import styles from './styles.module.css';

class NameChooser extends React.Component {
  state = {
    captainName: null,
  };

  componentDidMount() {
    const { captainName } = this.props;
    this.changeName(captainName);
  }

  changeName = (name) => {
    this.setState({captainName: name});
  };

  randomName = () => {
    const { names, captainName } = this.props;
    let newName = randomEl(names);
    while (newName === captainName) {
      newName = randomEl(names);
    }
    this.changeName(newName);
  };

  onChange = (event) => {
    this.changeName(event.target.value);
  };

  setName = () => {
    const { handleClose, changeCaptainName } = this.props;
    changeCaptainName(this.state.captainName);
    handleClose();
  };

  close = () => {
    const { handleClose, captainName } = this.props;
    this.changeName(captainName);
    handleClose();
  };

  render() {
    const { show } = this.props;
    return (
      <Modal show={show} handleClose={this.close}>
        <p>What would you like your captain name to be?</p>
        <div className={styles.form}>
          <input value={this.state.captainName} onChange={this.onChange} />
          <span className={styles.icon} onClick={this.randomName}>🔄</span>
        </div>
        <div className={styles.buttons}>
          <button onClick={this.setName}>Set Name</button>
          <button className="outline" onClick={this.close}><em>Cancel</em></button>
        </div>
      </Modal>
    )
  }
}

export default NameChooser;
