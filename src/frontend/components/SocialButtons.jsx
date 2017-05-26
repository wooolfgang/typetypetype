import React from 'react';

const styles = {
  facebookBtn: {
    display: 'block',
    backgroundColor: '#3b5998',
    border: 'none',
    borderRadius: '2px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    width: '250px',
    height: '25px',
    margin: '8px auto',
  },
  twitterBtn: {
    display: 'block',
    backgroundColor: '#55acee',
    border: 'none',
    borderRadius: '2px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    width: '250px',
    height: '25px',
    margin: '8px auto',
  },
  googleBtn: {
    display: 'block',
    backgroundColor: '#ea4335',
    border: 'none',
    borderRadius: '2px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    width: '250px',
    height: '25px',
    margin: '8px auto',
  }
}

const FacebookButton = ({ value }) => (
  <div>
    <button style={styles.facebookBtn}> {value} </button>
  </div>
);

const TwitterButton = ({ value }) => (
  <div>
    <button style={styles.twitterBtn}> {value} </button>
  </div>
);

const GoogleButton = ({ value }) => (
  <div>
    <button style={styles.googleBtn}> {value} </button>
  </div>
);
export { FacebookButton, TwitterButton, GoogleButton };