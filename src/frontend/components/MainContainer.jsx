import React from 'react';
import TypingContainer from './TypingContainer';
import Header from './Header';
import TypingMenu from './TypingMenu';
import { Redirect } from 'react-router-dom';

const MainContainer = ({ user, onLogout, setUser }) => (
  <div>
    {
      user ?
        <div>
          <Header user={user} onLogout={onLogout} />
          <TypingContainer user={user} setUser={setUser} />
        </div > :
        undefined
    }
  </div>
);

export default MainContainer;