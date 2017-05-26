import React from 'react';
import injectStyles from 'react-jss';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import client from '../client';

const styles = {
  hidden: {
    display: 'none',
  }
}

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false
    }
  }

  onClick = () => {
    this.setState({ clicked: this.state.clicked ? false : true });
  }

  render() {
    const { classes, user, onLogout } = this.props;
    return (
      <div className={classes.container}>
        <span className={classes.logo}> TypeTypeType! </span>
        <div>
          <button className={classes.username} onClick={this.onClick}> {user.username} </button>
          <Dropdown style={this.state.clicked ? { display: 'inline-block' } : styles.hidden} onLogout={onLogout} />
        </div>
      </div>
    );
  }
}

export default injectStyles({
  container: {
    background: 'lightseagreen',
    borderBottom: '1px solid white',
    display: 'flex',
    height: '60px',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    color: 'white',
    marginLeft: '20px',
    fontSize: '22px'
  },
  username: {
    color: 'white',
    border: '2px solid white',
    background: 'none',
    fontSize: '22px',
    cursor: 'pointer',
    marginRight: '20px'
  }
})(Header);