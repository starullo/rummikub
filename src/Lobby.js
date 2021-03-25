import axios from 'axios'
import React, {useState, useEffect} from 'react'
import jwt_decode from "jwt-decode"
import {useHistory} from 'react-router-dom'
import Game from './Game'
import PlayerInfo from './PlayerInfo'

import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
const queryClient = new QueryClient()


const Lobby = () => {



const {push} = useHistory()

// const [onlinePlayers, setOnlinePlayers] = useState([])





const { isLoading, error, data } = useQuery('repoData', () =>
fetch('http://localhost:4343/players').then(res =>
  res.json()
)
)

const id = window.localStorage.getItem('playerId')
const playerReady = window.localStorage.getItem('playerReady')

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
        push('/lobby')
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
        push('/lobby')
        console.log(res)
    })
    .catch(err=>{
        console.log(err)
    })
}

    return (
        <div>
            {isLoading ? <p>LOADING</p> : error ? <p>AN ERROR HAS OCCURED</p> : ""}
            { data && data.map(pl=>{
                return (
                    <p key={pl.id}>{pl.name}- {pl.player_ready ? "Ready" : "Not Ready"}</p>
                )
            })
        }
        <QueryClientProvider client={queryClient}>
            <PlayerInfo/>
        </QueryClientProvider>
        {/* <button onClick={logOut}>Log Out</button>
        <p onClick={isReady}>{data ? "Ready!" : "Ready?"}</p> */}
        </div>
    )
}

export default Lobby
