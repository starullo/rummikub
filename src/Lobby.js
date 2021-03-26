import axios from 'axios'
import React from 'react'
// import jwt_decode from "jwt-decode"
import {useHistory} from 'react-router-dom'
// import Game from './Game'
// import PlayerInfo from './PlayerInfo'
import {useQuery} from 'react-query'

import PlayerHook from './Queries/getPlayerInfo'
// import PlayersHook from './Queries/getPlayers'

const getPlayers = async () =>{
    const res = await fetch('https://rummikub-be.herokuapp.com/players')
    console.log('fetching')
    return res.json()
        
}

const Lobby = () => {


const [playerData, playerStatus] = PlayerHook()

const {data: players, status: playersStatus} = useQuery('repoData', getPlayers, {refetchInterval: 10000})

const {push} = useHistory()


const id = window.localStorage.getItem('playerId')

const logOut = evt => {
    evt.preventDefault()
        window.localStorage.removeItem('gameToken')
        window.localStorage.removeItem('playerId')
        push('/login')

}

const isReady = evt => {
    evt.preventDefault()
    axios.put(`https://rummikub-be.herokuapp.com/players/${id}/ready`, {player_ready: true})
    .then(res=>{
        window.location.reload(true)
        console.log(res)
    })
    .catch(err=>{
        console.log(err)
    })
}

const notReady = evt => {
    evt.preventDefault()
    axios.put(`https://rummikub-be.herokuapp.com/players/${id}/not-ready`, {player_ready: false})
    .then(res=>{
        window.location.reload(true)
        console.log(res)
    })
    .catch(err=>{
        console.log(err)
    })
}


    return (
        <div>
            {playersStatus === "error" && <p>ERROR</p>}
            {playersStatus === "loading" && <p>LOADING</p>}
            {playersStatus === "success" && players && players.map(pl=>{
                return (
                    <p key={pl.id}>{pl.name}- {pl.player_ready ? "Ready" : "Not Ready"}</p>
                )
            })}
        {playerStatus === "success" && playerData && <button onClick={playerData.player_ready === 0 ? isReady : notReady}>{playerData.player_ready === 1 ? "Nvm, not ready yet" : "Ok I'm ready"}</button>}
        
    <button onClick={logOut}>Log Out</button>
        </div>
    )
}

export default Lobby
