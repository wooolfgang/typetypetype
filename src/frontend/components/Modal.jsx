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
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    margin: '5px 0px 20px 0px'
  },
  button: {
    border: 'none',
    borderBottom: '1px solid black',
    background: 'none',
    cursor: 'pointer',
    fontSize: 20,
    flex: 1
  },
  closeButton: {
    cursor: 'pointer',
  },
  closeBtnContainer: {
    display: 'flex',
    height: '50vh',
    position: 'relative',
    left: '10px',
  }
};

const Modal = ({ props: { open, signinClicked, signupClicked }, onSignupClick, onSigninClick, closeModal, authenticated, setAuthenticated, setUser }) => (
  <div style={open ? styles.modalBackground : { display: 'none' }}>
    <div style={styles.modal}>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={onSigninClick}> Sign In </button>
        <button style={styles.button} onClick={onSignupClick}> Sign Up </button>
      </div>
      {
        signinClicked ?
          <SigninContainer authenticated={authenticated} setAuthenticated={setAuthenticated} setUser={setUser} /> :
          <SignupContainer authenticated={authenticated} setAuthenticated={setAuthenticated} setUser={setUser} />
      }
    </div>
    <div style={styles.closeBtnContainer}>
      <CloseIcon width="30px" height="30px" onClick={closeModal} style={styles.closeButton} />
    </div>
  </div>
);

export default Modal;