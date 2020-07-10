import React from 'react';
import './App.css';
import { HashRouter as Router, Route, withRouter } from 'react-router-dom'
import Header from '../Header/Header'
import SetManager from '../SetManager/SetManager'
import Search from '../Search/Search'
import LoginPage from '../LoginPage/LoginPage'
import { connect } from 'react-redux'
import RejectUnauthorized from '../AdminTools/RejectUnauthorized';
import AdminTools from '../AdminTools/AdminTools';
import Redirect from './Redirect';
class App extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Header className="App-header">
          </Header>
          <Route exact path='/'><Redirect /></Route>
          <Route exact path='/home'></Route>
          <Route exact path='/set-manager'><SetManager></SetManager></Route>
          <Route exact path='/swimmer-search'><Search /></Route>
          <Route path='/super-admin'>{this.props.user.auth_level >= 3 ? <AdminTools /> : <RejectUnauthorized />}</Route>
          <Route exact path='/sign-in'><LoginPage /></Route>
        </div>
      </Router>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(App);
