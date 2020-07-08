import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from '../Header/Header'
import SetManager from '../SetManager/SetManager'
import Search from '../Search/Search'
import LoginPage from '../LoginPage/LoginPage'
function App() {
  return (
    <Router>
      <div className="App">
        <Header className="App-header">
        </Header>
        <Route path='/'></Route>
        <Route path='/set-manager'><SetManager></SetManager></Route>
        <Route path='/swimmer-search'><Search /></Route>
        <Route path='/super-admin'></Route>
        <Route path='/sign-in'><LoginPage /></Route>
      </div>
    </Router>
  );
}

export default App;
