import React from 'react';
import injectStyles from 'react-jss';
import client from '../client';
import { Link } from 'react-router-dom';

import { getUser, getToken } from '../functions';

class SignupContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      usernameError: '',
      passwordError: '',
    }
  }

  onChange = (e) => {
    const key = e.target.placeholder;
    this.setState({
      [key]: e.target.value
    });
  }

  onSubmit = async (e) => {
    const response = await client.service('api/users').create({
      username: this.state.username,
      password: this.state.password,
    });

    const token = await getToken(this.state.username, this.state.password);
    const user = await getUser(token);

    if (user) {
      this.props.setAuthenticated(true);
      this.props.setUser(user);
    }
  }

  render() {
    const { classes, authenticated } = this.props;
    return (
      <div className={classes.container}>
        <input className={classes.input} type="text" placeholder="username" onChange={this.onChange} value={this.state.username} />
        {this.state.usernameError ? <p className={classes.error}> {this.state.usernameError} </p> : undefined}
        <input className={classes.input} type="text" placeholder="email" onChange={this.onChange} value={this.state.email} />
        {this.state.passwordError ? <p className={classes.error}> {this.state.passwordError} </p> : undefined}
        <input className={classes.input} type="password" placeholder="password" onChange={this.onChange} value={this.state.password} />
        <button className={classes.input} type="button" onClick={this.onSubmit}> <Link className={classes.link} to="/main"> Create Account </Link> </button>
      </div>
    );
  }
}

export default injectStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '85%'
  },
  input: {
    margin: '5px 0px 0px 10px',
    height: '22px',
    flex: 1,
    fontSize: '16px',
    display: 'inline-block',
    borderRadius: '1px',
  },
  error: {
    color: 'red'
  },
  link: {
    textDecoration: 'none',
    color: 'black'
  }
})(SignupContainer);