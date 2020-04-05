import React, { useRef, useState } from 'react';
import { useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './DraftLink.module.css';

const DraftLink = () => {
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>();
  const { draftToken } = useParams();

  const onCopyClick = () => {
    if (!inputRef.current) return;
    inputRef.current.select();
    document.execCommand('copy');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className={styles.label}>
      Send this link to others to join this draft: {draftToken}{' '}
      <span className={styles.copiedContainer}>
        {copied && <span className={styles.copied}>Copied!</span>}
        <FontAwesomeIcon className={styles.icon} icon="copy" onClick={onCopyClick} />{' '}
      </span>
      <input
        className={styles.input}
        value={window.location.href}
        readOnly
        ref={(inputBox) => (inputRef.current = inputBox)}
      />
    </header>
  );
};

export default DraftLink;
