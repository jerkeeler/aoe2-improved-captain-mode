import React from 'react';

import Modal from '../Modal';
import styles from './styles.module.css';

class JoinModal extends React.Component {
  state = {
    token: null,
  };

  onChange = (e) => {
    this.setState({token: e.target.value});
  };

  onJoin = () => {
    if (!this.state.token)
      return;
    const { history } = this.props;
    history.push(`/draft/${this.state.token}`);
  };

  render() {
    const { handleClose, show } = this.props;
    return (
      <Modal handleClose={handleClose} show={show}>
        <p>Enter the token of the draft you would like to join:</p>
        <div className={styles.inputWrapper}>
          <input onChange={this.onChange} placeholder="aaa..." />
        </div>
        <div className={styles.buttons}>
          <button onClick={this.onJoin}>Join</button>
          <button onClick={handleClose} className="outline">Close</button>
        </div>
      </Modal>
    );
  }
}

export default JoinModal;
