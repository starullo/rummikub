import React from 'react'
import {Route, Link} from 'react-router-dom'

import Login from './Login'
import Register from './Register'
import Lobby from './Lobby'
// import axiosWithAuth from './AxiosWithAuth'
import PrivateRoute from './PrivateRoute'
import Game from './Game'

import { QueryClient, QueryClientProvider } from 'react-query'
 
const queryClient = new QueryClient()

function App() {

// useEffect(()=>{

// }, [])

  return (
    <div >
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      <Route component={Login} exact path="/login"/>
      <Route component={Register} exact path="/register"/>
      <QueryClientProvider client={queryClient}>
        <PrivateRoute component={Lobby} exact path="/lobby"/>
      </QueryClientProvider>
      <PrivateRoute component={Game} exact path="/game"/>
    </div>

  );
}

export default App;
