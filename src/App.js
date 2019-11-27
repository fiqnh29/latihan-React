import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import NotHome from './pages/notHome';
import Navbar from './components/Navbar';
import TableBox from './pages/table';

class App extends Component{

  render(){
    return(
      <div>
        <Navbar />
        <Route path='/' component={Home} exact />      
        <Route path='/not-home' component={NotHome} />
        <Route path='/table' component={TableBox} />
      </div>
    )
  }
} 

export default App;