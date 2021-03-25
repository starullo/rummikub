import axios from 'axios'
import React, {useState, useEffect} from 'react'
import jwt_decode from "jwt-decode"
import {useHistory} from 'react-router-dom'
import Game from './Game'
import PlayerInfo from './PlayerInfo'

import { QueryClient, QueryClientProvider, useQuery } from 'react-query'


const Lobby = () => {
    const [wow, setWow] = useState(false)
    const [players, setPlayers] = useState([])



const {push} = useHistory()

// const [onlinePlayers, setOnlinePlayers] = useState([])


let users = []


const { isLoading, error, data } = useQuery('repoData', () =>
fetch('http://localhost:4343/players').then(res => {
    res.json()
    
}
  
)
)
const id = window.localStorage.getItem('playerId')

const logOut = evt => {
    evt.preventDefault()
        window.localStorage.removeItem('gameToken')
        window.localStorage.removeItem('playerId')
        push('/login')

}

const isReady = evt => {
    evt.preventDefault()
    axios.put(`http://localhost:4343/players/${id}/ready`, {player_ready: true})
    .then(res=>{
        // window.location.reload(true)

        console.log(res)
    })
    .catch(err=>{
        console.log(err)
    })
}

const notReady = evt => {
    evt.preventDefault()
    axios.put(`http://localhost:4343/players/${id}/not-ready`, {player_ready: false})
    .then(res=>{
        // window.location.reload(true)

        console.log(res)
    })
    .catch(err=>{
        console.log(err)
    })
}

useEffect(()=>{
    axios.get('http://localhost:4343/players')
    .then(res=>{
        setPlayers(res.data)
    })
    .catch(err=>{
        console.log(err)
    })
}, [])


console.log(players)
    return (
        <div>
            <p>hey</p>
            {isLoading && <p>LOADING</p>}
            { error && <p>AN ERROR HAS OCCURED</p>}
            {players.map(pl=>{
                return (
                    <p key={pl.id}>{pl.name}- {pl.player_ready ? "Ready" : "Not Ready"}</p>
                )
            })
        }
        {/* <QueryClientProvider client={queryClient2}>
            <PlayerInfo setWow={setWow} wow={wow}/>
        </QueryClientProvider> */}
        {/* <button onClick={logOut}>Log Out</button>*/}
        <p onClick={isReady}>{data ? "Ready!" : "Ready?"}</p>
        <button onClick={notReady}>Nvm, not ready yet</button>
    <button onClick={logOut}>Log Out</button>
        </div>
    )
}

export default Lobby
