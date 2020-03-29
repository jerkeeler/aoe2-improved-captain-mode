import React from 'react';

import { createDraft } from '../../../services/drafts';
import Modal from '../../../components/Modal';
import styles from './styles.module.css';

class PresetModal extends React.Component {
  createDraft = async () => {
    const { preset, history } = this.props;
    const token = await createDraft(preset);
    history.push(`/draft/${token}`);
  };

  render() {
    const { show, handleClose, preset } = this.props;
    return (
      <Modal handleClose={handleClose} show={show}>
        <p>Do you wish to create a new draft with preset <strong>"{preset.name}"</strong>?</p>
        <div className={styles.buttons}>
          <button onClick={this.createDraft}>Create</button>
          <button className="outline" onClick={handleClose}>Cancel</button>
        </div>
      </Modal>
    );
  }
}

export default PresetModal
