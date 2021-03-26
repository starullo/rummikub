import React from 'react'
import {Route, Link} from 'react-router-dom'

import Login from './Login'
import Register from './Register'
import Lobby from './Lobby'

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
        <Route component={Lobby} exact path="/lobby"/>
      </QueryClientProvider>
    </div>
  );
}

export default App;
