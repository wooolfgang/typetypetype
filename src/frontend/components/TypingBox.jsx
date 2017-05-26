import React from 'react';
import injectStyles from 'react-jss';

const styles = {
  currentWord: {
    backgroundColor: 'lightgray', padding: '1px', borderRadius: '4px'
  },
  correctWord: {
    color: 'green'
  },
  wrongWord: {
    color: 'red'
  },
  normWord: {
    color: '#333'
  }
}

const TypingBox = ({ classes, props: { currentText, currentKey } }) => (
  <div className={classes.container}>
    <div className={classes.containerTwo}>
      { currentText.length !== 0 ?
        currentText.map((val, key) =>
          <span
            key={key}
            style=
            {key === currentKey ?
              styles.currentWord :
              val.status === 'correct' ?
                styles.correctWord : val.status === 'wrong' ?
                  styles.wrongWord :
                  styles.normWord}> {val.word}
          </span>
        ) : 
        <span> Fetching text... </span>
      }
    </div>
  </div>
);

export default injectStyles({
  container: {
    display: 'flex',  
    backgroundColor: '#FAFAFA',
    width: '800px',
    alignSelf: 'center',
    minWidth: '700px',
    marginTop: '20px',
    lineHeight: '1.5'
  },
  containerTwo: {
    height: '200px',
    border: '1px solid lightgray',
    borderRadius: '5px',
    fontSize: '22px',
    padding: '15px',
    overflow: 'hidden',
    margin: 'auto',
    width: '100%'
  }
})(TypingBox);

