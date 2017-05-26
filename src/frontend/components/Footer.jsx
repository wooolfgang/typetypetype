import React from 'react';
import injectStyles from 'react-jss';

const Footer = ({ classes }) => (
  <div className={classes.container}>
    <span className={classes.span}> This is an open source project made by Li Arolf Rey.
      Click <a href="https://github.com/wooolfgang/typetypetype" target="_blank"> here </a> to view source code on github.
    </span>
  </div>
);

export default injectStyles({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: '0',
    height: '25px',
    borderTop: '1px solid lightgray',
    fontSize: '15px',
    display: 'flex',
  },
  span: {
    margin: 'auto',
  }

})(Footer);