import React from 'react';
import injectStyles from 'react-jss';
import client from '../client';
import { Link } from 'react-router-dom';
import { FacebookButton, GoogleButton } from './SocialButtons';

import { getUser, getToken } from '../functions';

class SigninContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    }
  }

  onSubmit = async () => {
    const token = await getToken(this.state.username, this.state.password);
    const user = await getUser(token);

    if (user) {
      this.props.setAuthenticated(true);
      this.props.setUser(user);
    }
  }

  onChange = (e) => {
    const key = e.target.placeholder;
    this.setState({ [key]: e.target.value });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <input className={classes.input} type="text" placeholder="username" value={this.state.username} onChange={this.onChange} />
        <input className={classes.input} type="password" placeholder="password" value={this.state.password} onChange={this.onChange} />
        <button className={classes.input} onClick={this.onSubmit}>  Sign In  </button>
        <p> Sign in with:  </p>
        <FacebookButton value="Login with Facebook" />
        <GoogleButton value="Login with google" />
      </div>
    );
  }
}

export default injectStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '85%',
  },
  input: {
    margin: '5px 0px 0px 10px',
    height: '22px',
    flex: 1,
    fontSize: '16px',
    display: 'inline-block',
    borderRadius: '1px',
  },
  link: {
    textDecoration: 'none',
    color: 'black'
  }
})(SigninContainer);