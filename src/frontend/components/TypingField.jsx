import React from 'react';
import injectStyles from 'react-jss';

const TypingField = ({ classes, onKeyPress, onChange, props: { textfieldValue } }) => (
  <div className={classes.container}>
    <input
      type="text"
      className={classes.input}
      value={textfieldValue}
      onKeyPress={onKeyPress}
      onChange={onChange}
    />
  </div>
);

export default injectStyles({
  container: {
  },
  input: {
    width: '400px',
    height: '50px',
    fontSize: '22px !important',
  }
})(TypingField);