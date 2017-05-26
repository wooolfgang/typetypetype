import React from 'react';
import injectStyles from 'react-jss';
import { FacebookButton } from './SocialButtons';

const TypingResults = ({ classes, resetState, props: { currentText, wpm, currentTextDetails } }) => {
  const correctWords = currentText.filter(word => {
    return word.status === 'correct';
  })
  const wrongWords = currentText.filter(word => {
    return word.status === 'wrong';
  })

  return (
    <div className={classes.container}>
      <div className={classes.containerOne}>
        <p> Were you interested with the text? <a href={'https://www.reddit.com' + currentTextDetails.link}> Here </a> is the link </p>
        <p> Your word per minute: {wpm} </p>
        <p> </p>
        <button className={classes.button} onClick={resetState}> Try again? </button>
        <FacebookButton value='Share your WPM on facebook!' />
      </div>
    </div>
  );
};

export default injectStyles({
  container: {
    display: 'flex',
    flexBasis: '50%',
    height: '275px',
    border: '1px solid lightgray',
    background: '#FAFAFA',
    borderRadius: '3px',
    margin: 'auto',
    marginTop: '30px',
    fontSize: '20px'
  },
  containerOne: {
    margin: 'auto',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'red',
    border: '1px solid white',
    color: 'white',
    fontSize: '20px',
    width: '150px',
    cursor: 'pointer',
  },
})(TypingResults);