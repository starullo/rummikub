import axios from 'axios'
import React, {useState, useEffect} from 'react'
// import jwt_decode from "jwt-decode"
import {useHistory} from 'react-router-dom'

import LobbyGame from './LobbyGame'


import PlayerHook from './Queries/getPlayerInfo'
// import PlayersHook from './Queries/getPlayers'


import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

import {Route} from 'react-router-dom'

const db = "http://localhost:4343"

const queryClients = {};
 
const queryClient = new QueryClient()

// const getPlayers = async () =>{
//     const res = await fetch('${db}/players')
//     console.log('fetching')
//     return res.json()
        
// }



const getLobbyPlayers = async () => {
    const res = await fetch(`${db}/games/lobby`)
    return res.json()
}

const getGames = async () => {
    const res = await fetch(`${db}/games/lobby`)
    console.log(res)
    return res.json()
}




const Lobby = () => {

    // const [games, setGames] = useState([])


// const [playerData, playerStatus] = PlayerHook()

// const {data: players, status: playersStatus} = useQuery('playersData', getPlayers, {refetchInterval: 10000})

const {data: games, status: gamesStatus} = useQuery('gamesData', getGames, {refetchInterval: 10000})

// const {data: players, status: playersStatus} = useQuery('playersData', getGames, {refetchInterval: 10000})

const {push} = useHistory()


const id = window.localStorage.getItem('playerId')

const logOut = evt => {
    evt.preventDefault()
        window.localStorage.removeItem('gameToken')
        window.localStorage.removeItem('playerId')
        push('/login')

}

const joinGame = evt => {
    evt.preventDefault()
    axios.put(`${db}/games`, {player_id: id})
    .then(res=>{
        console.log(res)
    })
    .catch(err=>{
        console.log(err)
    })
}

// const isReady = evt => {
//     evt.preventDefault()
//     axios.put(`${db}/players/${id}/ready`, {player_ready: true})
//     .then(res=>{
//         window.location.reload(true)
//         console.log(res)
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// }

// const notReady = evt => {
//     evt.preventDefault()
//     axios.put(`${db}/players/${id}/not-ready`, {player_ready: false})
//     .then(res=>{
//         window.location.reload(true)
//         console.log(res)
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// }

// let everyoneReady;
// if (players) {
//     everyoneReady = players.every(p=>p.player_ready === 1)
// } 
// if (everyoneReady) {
//     startGame()
// }
// let gameId;
const startNewGame = evt => {
    evt.preventDefault()
    axios.post(`${db}/games/lobby`, {player_id: id})
    .then(res=>{
        console.log(res)
        window.localStorage.setItem('gpid', res.data[1])
        push(`/game-room/${res.data[0].id}`)
    })
    .catch(err=>{
        console.log(err.message)
    })
}

console.log(games)

    return (
        <div>
            {gamesStatus === "error" && <p>ERROR</p>}
            {gamesStatus === "loading" && <p>LOADING</p>}
            {gamesStatus === "success" && games && games.map(game=>{
                return (
                    <LobbyGame id={game.id} />
                )
            })}
            <button onClick={startNewGame}>Start New Game</button>
            {/* <Route exact path="/game"><QueryClientProvider client={queryClient}><Game gameId={gameId}/></QueryClientProvider></Route>
            {!everyoneReady && <>
            {playersStatus === "error" && <p>ERROR</p>}
            {playersStatus === "loading" && <p>LOADING</p>}
            {playersStatus === "success" && players && players.map(pl=>{
                return (
                    <p key={pl.id}>{pl.name}- {pl.player_ready ? "Ready" : "Not Ready"}</p>
                )
            })}
        {playerStatus === "success" && playerData && <button onClick={playerData.player_ready === 0 ? isReady : notReady}>{playerData.player_ready === 1 ? "Nvm, not ready yet" : "Ok I'm ready"}</button>}
        
    <button onClick={logOut}>Log Out</button></>} */}
        </div>
    )
}

export default Lobby
