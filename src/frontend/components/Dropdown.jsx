import React from 'react';
import injectStyles from 'react-jss';

const Dropdown = ({ classes, style, onLogout }) => (
  <div style={style} className={classes.container}>
    <div className={classes.innerContainer}>
      <ul className={classes.ul}>
        <li onClick={onLogout}> Logout </li>
      </ul>
    </div>
  </div>
)

export default injectStyles({
  container: {
    position: 'relative',
    left: '-100%',
    display: 'inline-block',
    bottom: '-10px',
  },
  innerContainer: {
    position: 'absolute',
    zIndex: '1',
    width: '120px',
    height: '100px',
    border: '2px solid lightseagreen',
    background: 'white'
  },
  ul: {
    padding: '0px',
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    cursor: 'pointer',
  }
})(Dropdown);