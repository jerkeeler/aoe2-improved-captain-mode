import React from 'react';

import PresetModal from '../PresetModal';
import styles from './styles.module.css';

class DraftPresetTile extends React.Component {
  state = {
    showModal: false,
  };

  displayModal = () => {
    this.setState({showModal: true})
  };

  closeModal = () => {
    this.setState({showModal: false});
  };

  render() {
    const { preset } = this.props;
    return (
      <>
        <PresetModal show={this.state.showModal} handleClose={this.closeModal} preset={preset} />
        <div className={styles.tile} onClick={this.displayModal}>
          <h4>{preset.name}</h4>
        </div>
      </>
    );
  }
}

export default DraftPresetTile;
