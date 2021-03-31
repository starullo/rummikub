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

let p = [
    {value: 0, color: "red"},
    {value: 0, color: "blue"},
    {value: 1, color: "red"},
    {value: 1, color: "blue"},
    {value: 1, color: "orange"},
    {value: 1, color: "black"},
    {value: 2, color: "red"},
    {value: 2, color: "blue"},
    {value: 2, color: "orange"},
    {value: 2, color: "black"},
    {value: 3, color: "red"},
    {value: 3, color: "blue"},
    {value: 3, color: "orange"},
    {value: 3, color: "black"},
    {value: 4, color: "red"},
    {value: 4, color: "blue"},
    {value: 4, color: "orange"},
    {value: 4, color: "black"},
    {value: 5, color: "red"},
    {value: 5, color: "blue"},
    {value: 5, color: "orange"},
    {value: 5, color: "black"},
    {value: 6, color: "red"},
    {value: 6, color: "blue"},
    {value: 6, color: "orange"},
    {value: 6, color: "black"},
    {value: 7, color: "red"},
    {value: 7, color: "blue"},
    {value: 7, color: "orange"},
    {value: 7, color: "black"},
    {value: 8, color: "red"},
    {value: 8, color: "blue"},
    {value: 8, color: "orange"},
    {value: 8, color: "black"},
    {value: 9, color: "red"},
    {value: 9, color: "blue"},
    {value: 9, color: "orange"},
    {value: 9, color: "black"},
    {value: 10, color: "red"},
    {value: 10, color: "blue"},
    {value: 10, color: "orange"},
    {value: 10, color: "black"},
    {value: 11, color: "red"},
    {value: 11, color: "blue"},
    {value: 11, color: "orange"},
    {value: 11, color: "black"},
    {value: 12, color: "red"},
    {value: 12, color: "blue"},
    {value: 12, color: "orange"},
    {value: 12, color: "black"},
    {value: 13, color: "red"},
    {value: 13, color: "blue"},
    {value: 13, color: "orange"},
    {value: 13, color: "black"},
    {value: 1, color: "red"},
    {value: 1, color: "blue"},
    {value: 1, color: "orange"},
    {value: 1, color: "black"},
    {value: 2, color: "red"},
    {value: 2, color: "blue"},
    {value: 2, color: "orange"},
    {value: 2, color: "black"},
    {value: 3, color: "red"},
    {value: 3, color: "blue"},
    {value: 3, color: "orange"},
    {value: 3, color: "black"},
    {value: 4, color: "red"},
    {value: 4, color: "blue"},
    {value: 4, color: "orange"},
    {value: 4, color: "black"},
    {value: 5, color: "red"},
    {value: 5, color: "blue"},
    {value: 5, color: "orange"},
    {value: 5, color: "black"},
    {value: 6, color: "red"},
    {value: 6, color: "blue"},
    {value: 6, color: "orange"},
    {value: 6, color: "black"},
    {value: 7, color: "red"},
    {value: 7, color: "blue"},
    {value: 7, color: "orange"},
    {value: 7, color: "black"},
    {value: 8, color: "red"},
    {value: 8, color: "blue"},
    {value: 8, color: "orange"},
    {value: 8, color: "black"},
    {value: 9, color: "red"},
    {value: 9, color: "blue"},
    {value: 9, color: "orange"},
    {value: 9, color: "black"},
    {value: 10, color: "red"},
    {value: 10, color: "blue"},
    {value: 10, color: "orange"},
    {value: 10, color: "black"},
    {value: 11, color: "red"},
    {value: 11, color: "blue"},
    {value: 11, color: "orange"},
    {value: 11, color: "black"},
    {value: 12, color: "red"},
    {value: 12, color: "blue"},
    {value: 12, color: "orange"},
    {value: 12, color: "black"},
    {value: 13, color: "red"},
    {value: 13, color: "blue"},
    {value: 13, color: "orange"},
    {value: 13, color: "black"}]

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
        window.localStorage.removeItem('gameId')
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
        window.localStorage.setItem('gameId', res.data.id)
        push(`/game-room/${res.data.id}`)
    })
    .catch(err=>{
        console.log(err.message)
    })
}


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
