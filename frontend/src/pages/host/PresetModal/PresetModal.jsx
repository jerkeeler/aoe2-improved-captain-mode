import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { createDraft } from '../../../services/drafts';
import Modal from '../../../components/Modal';
import DraftMinimap from '../../../components/DraftMinimap';
import styles from './PresetModal.module.css';

const PresetModal = ({ preset, handleClose, show }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const createDraftAsync = async () => {
    if (loading)
      return;
    setLoading(true);
    const token = await createDraft(preset);
    history.push(`/draft/${token}`);
    setLoading(false);
  };

  return (
    <Modal handleClose={handleClose} show={show}>
      <p>Do you wish to create a new draft with preset <strong>"{preset.name}"</strong>?</p>
      <DraftMinimap draftConfig={preset} />
      <div className={styles.buttons}>
        <button onClick={createDraftAsync}>Create</button>
        <button className="outline" onClick={handleClose}>Cancel</button>
      </div>
    </Modal>
  )
};

export default PresetModal
