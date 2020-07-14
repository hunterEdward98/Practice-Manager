import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux';


class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  //prevent refresh on form submission. dispatch to 'LOGIN' with the username and password
  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      //if inputs are filled out, send login request
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
      this.props.history.push('set-manager')
    } else {
      //if inputs are invalid, handle login error
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  //save changes to local state
  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }
  //I have no idea what most of this stuff does. I'll look into it when my project is done
  render() {
    return (
      <div className='container justify-content-center dark'>
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <form onSubmit={this.login}>
          <h1>Login</h1>
          <div>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div className='container'>
            <div className='row justify-content-center'>
              <div className=' col-6 col-md-3'>
                <input
                  className="log-in btn signin col-7"
                  type="submit"
                  name="submit"
                  value="Log In"
                />
                <div className='mt-5'>
                  Don't have an account?
                <NavLink to='/register' className='btn blk col-7'>Register</NavLink>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default withRouter(connect(mapStateToProps)(LoginPage));
