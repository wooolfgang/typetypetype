import React from 'react';
import { FacebookButton, GoogleButton } from './SocialButtons';
import { CloseIcon } from './Icons';
import SigninContainer from './SigninContainer';
import SignupContainer from './SignupContainer';

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
    height: '50vh',
    width: '50vh',
  }
};

const ListModal = ({ modalOpen}) => (
  <div style={modalOpen ? styles.modalBackground : { display: 'none' }}>
    <div style={styles.modal}>
      <h1> Hello World </h1>
    </div>
  </div>
);

export default ListModal;