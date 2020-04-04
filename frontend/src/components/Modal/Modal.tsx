import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import styles from './Modal.module.css';

interface Props {
  show: boolean;
  handleClose?: () => void;
  children: ReactNode;
}

const modalRoot = document.getElementById('modal-root') as HTMLElement;

const Modal = ({ show, handleClose, children }: Props) => {
  if (!show) return null;
  const component = (
    <div className={styles.modal}>
      <div className={styles.modalBackground} onClick={handleClose} />
      {/*<button onClick={handleClose} className={styles.modalClose}>close</button>*/}
      <div className={styles.modalContent}>{children}</div>
    </div>
  );
  return ReactDOM.createPortal(component, modalRoot);
};

export default Modal;
