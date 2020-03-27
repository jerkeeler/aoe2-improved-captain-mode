import React from 'react';
import ReactDOM from 'react-dom';

import styles from './styles.module.css';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ show, handleClose, children }) => {
  if (!show)
    return null;
  const component = (
    <div className={styles.modal}>
      <div className={styles.modalBackground} onClick={handleClose} />
      {/*<button onClick={handleClose} className={styles.modalClose}>close</button>*/}
      <div className={styles.modalContent}>
        {children}
      </div>
    </div>
  );
  return ReactDOM.createPortal(
    component,
    modalRoot,
  );
};

export default Modal;
