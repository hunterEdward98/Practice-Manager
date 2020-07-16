import React from 'react';
import './App.css';
import { HashRouter as Router, Route } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SetManager from '../SetManager/SetManager'
import Search from '../Search/Search'
import LoginPage from '../LoginPage/LoginPage'
import Registration from '../Registration/Registration'
import { connect } from 'react-redux'
import RejectUnauthorized from '../AdminTools/RejectUnauthorized';
import AdminTools from '../AdminTools/AdminTools';
import Redirect from './Redirect';
class App extends React.Component {
  // when the component mounts, we need to check if the user is signed in from the cookies
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }
  render() {
    return (
      <div className='bg'>
        <div className='container body'>
          <Router>
            <div className="App">
              <Header />
              <Route exact path='/sign-in'><LoginPage /></Route>
              <Route exact path='/register'><Registration /></Route>
              <Route exact path='/'><Redirect /></Route>
              {this.props.user.auth_level ?
                // we only want to allow these routes if the user is signed in, and has an authorization above 0.
                <div>
                  <Route exact path='/set-manager'><SetManager></SetManager></Route>
                  <Route exact path='/swimmer-search'><Search /></Route>
                  <Route path='/super-admin'>{this.props.user.auth_level >= 3 ? <AdminTools /> : <RejectUnauthorized />}</Route>
                </div>
                :
                //we still want to tell the user to sign in, or get approval if they aren't authorized.
                <div className='dark'>
                  <Route exact path='/set-manager'>
                    <RejectUnauthorized /></Route>
                  <Route exact path='/swimmer-search'><RejectUnauthorized /></Route>
                  <Route path='/super-admin'><RejectUnauthorized /></Route>
                </div>
              }
              <footer>
                <Footer />
              </footer>
            </div>
          </Router>
        </div>
      </div >
    );
  }
}

//grab the user from global state
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

//connect to redux, grab some props.
export default connect(mapStateToProps)(App);
