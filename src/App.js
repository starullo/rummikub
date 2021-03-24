import React, {useState, useEffect} from 'react'
import {Route, Link} from 'react-router-dom'

import Login from './Login'
import Register from './Register'
import Lobby from './Lobby'

function App() {

// useEffect(()=>{

// }, [])

  return (
    <div >
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      <Route component={Login} exact path="/login"/>
      <Route component={Register} exact path="/register"/>
      <Route component={Lobby} exact path="/lobby"/>
    </div>
  );
}

export default App;
