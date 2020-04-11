import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useDraftState from '../../../hooks/useDraftState';

import styles from './DraftLink.module.css';

const DraftLink = () => {
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>();
  const {
    draftInfo: { numSpectators },
  } = useDraftState();

  const onCopyClick = () => {
    if (!inputRef.current) return;
    inputRef.current.select();
    document.execCommand('copy');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.wrapper}>
      <span />
      <header className={styles.label}>
        Send this link to others to join this draft:
        <span className={styles.copiedContainer}>
          {copied && <span className={styles.copied}>Copied!</span>}
          <FontAwesomeIcon className={styles.icon} icon="copy" onClick={onCopyClick} />{' '}
        </span>
        <input
          className={styles.input}
          value={window.location.href}
          readOnly
          ref={(inputBox) => (inputRef.current = inputBox)}
          onClick={onCopyClick}
        />
      </header>
      <span className={styles.spectators}>
        <span className={styles.specNumbers}>{numSpectators}</span>
        <FontAwesomeIcon icon="eye" />
      </span>
    </div>
  );
};

export default DraftLink;
