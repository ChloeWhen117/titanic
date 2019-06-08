import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layouts/Landing';
import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
      <Route exact path="/" component={ Landing } />
    </div>
  </Router> 
  );
}

export default App;
