import React from 'react';
import injectStyles from 'react-jss';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import LandingPage from './LandingPage';
import MainContainer from './MainContainer';
import client from '../client';
import { getUser } from '../functions';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      user: undefined,
    }
  }

  componentDidMount = async () => {
    try {
      const token = await client.authenticate();
      const user = await getUser(token);

      if (user) {
        this.setAuthenticated(true);
        this.setUser(user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  setAuthenticated = (condition) => {
    this.setState({ authenticated: condition });
  }

  setUser = (user) => {
    this.setState({ user: user });
  }

  onLogout = () => {
    client.logout();
    this.setAuthenticated(false);
    this.setUser(undefined);  
  }

  render() {
    const { classes } = this.props;
    return (
      <Router>
        <div>
          <Route exact path="/" render={() =>
            !this.state.authenticated ?
              <LandingPage authenticated={this.state.authenticated} setAuthenticated={this.setAuthenticated} setUser={this.setUser} /> :
              <Redirect to="/main" />
          }
          />
          <Route path="/main" render={() =>
            this.state.authenticated ?
              <MainContainer user={this.state.user} onLogout={this.onLogout} setUser={this.setUser} /> :
              <Redirect to="/" />
          }
          />
        </div>
      </Router>
    );
  }
}

export default injectStyles({
  '@global': {
    body: {
      fontSize: '20px',
      fontFamily: 'Source Sans Pro, Helvetica, Arial',
      color: '#333',
      margin: 0,
      padding: 0,
      height: '100vh',
    },
  },
})(App);