import React from 'react';
import injectStyles from 'react-jss';

const Countdown = ({ time, classes }) => {
  const minute = Math.floor(time / 60000);
  const seconds = Math.floor(time % 60000 / 1000);

  return (
    <div className={classes.container}>
      <span> {minute}:{seconds === 0 ? '00' : seconds < 10 ? '0' + seconds : seconds}</span>
    </div>
  );
};

export default injectStyles({
  container: {
    height: '53px',
    width: '70px',
    border: '1px solid DarkCyan',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
})(Countdown);
