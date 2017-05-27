import React from 'react';
import { CloseIcon } from './Icons';

const styles = {
  modalBackground: {
    display: 'flex',
    position: 'fixed',
    zIndex: '1',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '75vh',
    width: '100vh',
    overflow: 'hidden',
  },
  closeButton: {
    cursor: 'pointer',
  },
  closeBtnContainer: {
    height: '50vh',
    position: 'relative',
    zIndex: '1',
  }
};

const Modal = ({ children, modalOpen, width, height, closeModal }) => {
  if (width) {
    styles.modal.width = width;
  }
  if (height) {
    styles.modal.height = height;
    styles.closeBtnContainer.height = height;
  }

  return (
    <div style={modalOpen ? styles.modalBackground : { display: 'none' }}>
      <div style={styles.modal}>
        {children}
      </div>
      <div style={styles.closeBtnContainer}>
        <CloseIcon width="30px" height="30px" onClick={closeModal} style={styles.closeButton} />
      </div>
    </div >
  );
}

export default Modal;