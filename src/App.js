import React from 'react'
import {Route, Link} from 'react-router-dom'

import Login from './Login'
import Register from './Register'
import Lobby from './Lobby'

import { QueryClient, QueryClientProvider } from 'react-query'
import GameNotStarted from './GameNotStarted'
import GameStarted from './GameStarted'
 
const queryClient = new QueryClient()

const db = "http://localhost:4343"

function App() {

// useEffect(()=>{

// }, [])

  return (
    <QueryClientProvider client={queryClient}>
    <div >
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      <Route component={Login} exact path="/login"/>
      <Route component={Register} exact path="/register"/>
      <Route component={Lobby} exact path="/lobby"/>
      <Route component={GameNotStarted} exact path="/game-room/:gameId"/>
      <Route component={GameStarted} exact path="/game/:gameId"/>
    </div>
    </QueryClientProvider>
  );
}

export default App;
