import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from '../Header/Header'
function App() {
  return (
    <Router>
      <div className="App">
        <Header className="App-header">
        </Header>
        <Route path='/'></Route>
        <Route path='/set-manager'></Route>
        <Route path='/swimmer-search'></Route>
        <Route path='super-admin'></Route>
        <Route path='sign-in'></Route>
      </div>
    </Router>
  );
}

export default App;
