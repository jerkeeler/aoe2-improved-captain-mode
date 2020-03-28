import React from 'react';

import { createDraft } from '../../../services/drafts';
import Modal from '../../../components/Modal';
import styles from './styles.module.css';

class PresetModal extends React.Component {
  createDraftCaptain = () => this.createDraft('captain');
  createDraftSpectator = () => this.createDraft('spectator');

  createDraft = async (role) => {
    const { preset, history } = this.props;
    const token = await createDraft(preset);
    history.push(`/draft/${token}?as=${role}`);
  };

  render() {
    const { show, handleClose, preset } = this.props;
    return (
      <Modal handleClose={handleClose} show={show}>
        <p>Do you wish to start preset <strong>"{preset.name}"</strong> as a captain or a spectator?</p>
        <div className={styles.buttons}>
          <button onClick={this.createDraftCaptain}>Captain</button>
          <button className="outline" onClick={this.createDraftSpectator}>Spectator</button>
        </div>
      </Modal>
    );
  }
}

export default PresetModal
