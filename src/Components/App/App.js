import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from '../Header/Header'
import SetManager from '../SetManager/SetManager'
import Search from '../Search/Search'
import LoginPage from '../LoginPage/LoginPage'
import { connect } from 'react-redux'
import RejectUnauthorized from '../AdminTools/RejectUnauthorized';
import AdminTools from '../AdminTools/AdminTools';
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
          <Route exact path='/#/'></Route>
          <Route exact path='/#/set-manager'><SetManager></SetManager></Route>
          <Route path='/#/swimmer-search'><Search /></Route>
          <Route path='/#/super-admin'>{this.props.user.auth_level >= 3 ? <AdminTools /> : <RejectUnauthorized />}</Route>
          <Route path='/#/sign-in'><LoginPage /></Route>
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
