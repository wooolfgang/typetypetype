import React from 'react';
import injectStyles from 'react-jss';
import { Redirect } from 'react-router-dom';
import Modal from './Modal'

class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      signinClicked: true,
      signupClicked: false,
    }
  }

  openModal = () => {
    this.setState({ open: true });
  }

  closeModal = () => {
    this.setState({ open: false });
  }

  onSigninClick = () => {
    this.setState({
      signinClicked: true,
      signupClicked: false,
    });
  }

  onSignupClick = () => {
    this.setState({
      signinClicked: false,
      signupClicked: true,
    });
  }

  render() {
    const { classes, authenticated, setAuthenticated, setUser } = this.props;
    let component = '';
    if (!authenticated) {
      component =
        <div className={classes.container}>
          <div className={classes.innerContainer}>
            <p> TypeTypeType! </p>
            <hr className={classes.line} />
            <p> Challenge friends and foes. Win battles and climb your way to becoming the fastest typer. </p>
            <hr className={classes.line} />
            <button className={classes.button} onClick={this.openModal}> Start Now! </button>
          </div>
          <Modal
            props={this.state}
            onSigninClick={this.onSigninClick}
            onSignupClick={this.onSignupClick}
            closeModal={this.closeModal}
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            setUser={setUser}
          />
        </div>
    }
    else {
      component = <Redirect to="/main" />;
    }
    return (
      <div>
        {component}
      </div>
    );
  }
}

export default injectStyles({
  container: {
    background: '#2F4F4F',
    display: 'flex',
    height: '100vh'
  },
  innerContainer: {
    margin: 'auto',
    marginTop: '30vh',
    textAlign: 'center',
    color: 'white'
  },
  line: {
    width: '500px'
  },
  button: {
    backgroundColor: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '20px',
    width: '150px',
    height: '30px',
  },
})(LandingPage);