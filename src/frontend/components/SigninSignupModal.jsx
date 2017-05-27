import React from 'react';
import { FacebookButton, GoogleButton } from './SocialButtons';
import SigninContainer from './SigninContainer';
import SignupContainer from './SignupContainer';
import Modal from './Modal';

const styles = {
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
};

const SigninSignupModal = ({ props: { modalOpen, signinClicked, signupClicked }, onSignupClick, onSigninClick, closeModal, authenticated, setAuthenticated, setUser }) => (
  <Modal modalOpen={modalOpen} width={'50vh'} height={'50vh'} closeModal={closeModal}>
    <div style={styles.buttonContainer}>
      <button style={styles.button} onClick={onSigninClick}> Sign In </button>
      <button style={styles.button} onClick={onSignupClick}> Sign Up </button>
    </div>
    {
      signinClicked ?
        <SigninContainer authenticated={authenticated} setAuthenticated={setAuthenticated} setUser={setUser} /> :
        <SignupContainer authenticated={authenticated} setAuthenticated={setAuthenticated} setUser={setUser} />
    }
  </Modal>
);

export default SigninSignupModal;