import React, { Component } from 'react';
import { connect } from 'react-redux';

class RegisterPage extends Component {
    state = {
        username: '',
        password: '',
        org_id: 0,
    };
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_ORGS' })
    }
    //I have no idea what most of this stuff does. I'll look into it when my project is done
    registerUser = (event) => {
        event.preventDefault();
        if (this.state.username && this.state.password) {
            this.props.dispatch({
                type: 'REGISTER',
                payload: {
                    username: this.state.username,
                    password: this.state.password,
                    org: this.state.org_id
                },
            });
        } else {
            this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
        }
    } // end registerUser

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    render() {
        return (
            <div>
                {this.props.errors.registrationMessage && (
                    <h2
                        className="alert"
                        role="alert"
                    >
                        {this.props.errors.registrationMessage}
                    </h2>
                )}
                <form onSubmit={this.registerUser}>
                    <h1>Register User</h1>
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
                    <select required value={this.state.org_id} onChange={this.handleInputChangeFor('org_id')}>
                        {this.props.orgs ? this.props.orgs.map(x => <option value={x.id}>{x.name}</option>) : <option>NO ORGANIZATIONS FOUND. PLEASE CONTACT SITE OWNER</option>}
                    </select>
                    <div>
                        <input
                            className="register"
                            type="submit"
                            name="submit"
                            value="Register"
                        />
                    </div>
                </form>
                <center>
                </center>
            </div>
        );
    }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
    errors: state.errors,
    orgs: state.orgs
});

export default connect(mapStateToProps)(RegisterPage);

