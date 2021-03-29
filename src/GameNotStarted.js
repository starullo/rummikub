import React, {useState} from 'react'
import axios from 'axios'
import {useParams, useHistory} from 'react-router-dom'
import {useQuery} from 'react-query'

const db = "http://localhost:4343"


const GameNotStarted = () => {

    const {gameId} = useParams();

    const [ready, setReady] = useState(false)

    const playerId = Number(window.localStorage.getItem('playerId'))

    const gpid = window.localStorage.getItem('gpid')

    const {push} = useHistory();

    const startGame = evt => {
        evt.preventDefault()

    }

    const getGameInfo = async () => {
        const res = await fetch(`${db}/games/${gameId}`)
        console.log('fetching')
        return res.json()
    }

    const {data: gameInfo, status: gameStatus} = useQuery(`lobbyGame${gameId}Data`, getGameInfo, {refetchInterval: 10000})

    const getPlayerInfo = async () => {
        const res = await fetch(`${db}/games/${gameId}/game-players`)
        console.log('fetching')
        return res.json()
    }

    const {data: playersInfo, status: playersStatus} = useQuery(`lobbyGame${gameId}PlayersData`, getPlayerInfo, {refetchInterval: 10000})

    function readyToggle(evt) {
        evt.preventDefault()

        axios.put(`${db}/games/${gameId}/game-players/${gpid}`, {ready: !pFinder(playerId).ready})
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err.message)
        })
    }






console.log(playersInfo, gameInfo)

const wow = window.localStorage.getItem('gpid')


const leaveGame = evt => {
    evt.preventDefault()
    axios.delete(`${db}/games/${gameId}/game-players/${playerId}`)
    .then(res=>{
        console.log(res)
        window.localStorage.removeItem('gpid')
        push('/lobby')
    })
    .catch(err=>{
        console.log(err.message)
    })
}

if (playersInfo && playersStatus === "success" && playersInfo.length > 1 && playersInfo.every(p=>p.ready)) {
    if (playerId === 1) {
        axios.get(`${db}/play/${gameId}`)
        .then(res=>{
            push(`/game/${gameId}`)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    else {
        push(`/game/${gameId}`)
    }
    
}

function pFinder(id) {
    return playersInfo.find(obj=>{
        return obj.player_id === id
    })
}

let playerReady;
if (playersInfo && playersStatus === "success" && playersInfo.filter(p=>{ return p.id === playerId})[0]) {
    playerReady = playersInfo.filter(p=>{ console.log(p.player_id, playerId); return p.id === playerId})[0].ready
}

console.log(playerReady)
    return (
        <div>
        {playersStatus === "loading" && <p>LOADING</p>}
        {playersStatus === "error" && <p>ERROR</p>}
        {playersStatus === "success" && playersInfo.map(player=>{
                return (
                    <p key={player.id}>{player.name} is {player.ready === 1 ? "ready" : "not ready"}</p>
                )
            })}
        {playersStatus === "success" && pFinder(playerId) && <><button onClick={readyToggle}>{pFinder(playerId).ready === 0 ? "ok i'm ready" : "nvm I'm not ready"}</button><br/>
        <button onClick={leaveGame}>Leave Game</button></>}
    </div>
    )
}

export default GameNotStarted
