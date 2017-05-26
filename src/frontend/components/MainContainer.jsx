import React from 'react';
import TypingContainer from './TypingContainer';
import Header from './Header';
import TypingMenu from './TypingMenu';
import Footer from './Footer';
import { Redirect } from 'react-router-dom';
import injectStyles from 'react-jss';

const MainContainer = ({ classes, user, onLogout, setUser }) => (
  <div>
    {
      user ?
        <div className={classes.container}>
          <Header user={user} onLogout={onLogout} />
          <TypingContainer user={user} setUser={setUser} />
          <Footer/>
        </div > :
        undefined
    }
  </div>
);

export default injectStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
})(MainContainer);