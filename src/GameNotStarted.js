import React from 'react'
import axios from 'axios'
import {useParams, useHistory} from 'react-router-dom'
import {useQuery} from 'react-query'


const db = "http://localhost:4343"


const GameNotStarted = () => {




    const {gameId} = useParams();

    const playerId = Number(window.localStorage.getItem('playerId'))


    const {push} = useHistory();



    // const getGameInfo = async () => {
    //     const res = await fetch(`${db}/games/${gameId}`)
    //     return res.json()
    // }

    // const {data: gameInfo, status: gameStatus} = useQuery(`lobbyGame${gameId}Data`, getGameInfo, {refetchInterval: 10000})

    const getPlayerInfo = async () => {
        const res = await fetch(`${db}/games/${gameId}/game-players`)
        return res.json()
    }

    const {data: playersInfo, status: playersStatus} = useQuery(`lobbyGame${gameId}PlayersData`, getPlayerInfo, {refetchInterval: 10000})

    function readyToggle(evt) {
        evt.preventDefault()
        let ready;
        if (pFinder(playerId) === 1) {
            ready = false;
            window.localStorage.setItem("gameStarted", false)
        } else {
            ready = true;
            window.localStorage.setItem("gameStarted", false)
        }
        axios.put(`${db}/games/${gameId}/game-players`, {ready, player_id: playerId})
        .then(res=>{
        })
        .catch(err=>{
        })
    }









const leaveGame = evt => {
    evt.preventDefault()
    axios.delete(`${db}/games/${gameId}/game-players/${playerId}`)
    .then(res=>{
        window.localStorage.removeItem('gameId')
        push('/lobby')
    })
    .catch(err=>{
    })
}




function pFinder(id) {
    if (playersInfo) {
    return playersInfo.find(obj=>{
        return obj.player_id === Number(id)
    })
}
}



let playerReady;
if (playersInfo && playersStatus === "success" && playersInfo.filter(p=>{ return p.id === playerId})[0]) {
    playerReady = playersInfo.filter(p=>{  return p.id === playerId})[0].ready
}



const playersReady = playersInfo && playersStatus === "success" && playersInfo.length > 1 && playersInfo.every(p=>p.ready === 1)

// useEffect(()=>{
//     if (playersReady) {
//         axios.get(`${db}/play/${gameId}/firstdraw`)
//         .then(res=>{
//             push(`/game/${gameId}`)
//         })
//         .catch(err=>{
//             push(`/game/${gameId}`)
//              (err.message)
//         })
//     }
// }, [playersReady])


if (playersReady) {
    if (Number(playerId) === 1) {
        axios.get(`${db}/play/${gameId}/forfuckssake`)
        .then(res=>{
            window.localStorage.setItem('gameStarted', "true")
        })
        .catch(err=>{
            window.localStorage.setItem('gameStarted', "true")
        })
    }
    push(`/game/${gameId}`)
    }
    
    


    return (
        <div>
        {playersStatus === "loading" && <p>LOADING</p>}
        {playersStatus === "error" && <p>ERROR</p>}
        {playersStatus === "success" && playersInfo.map(player=>{
                return (
                    <p key={player.id * Math.random() * 1000 * Math.random() / Math.random()}>{player.name} is {playerReady === 1 ? "ready" : "not ready"}</p>
                )
            })}
        {playersStatus === "success" && pFinder(playerId) && <><button onClick={readyToggle}>{pFinder(playerId).ready === 0 ? "ok i'm ready" : "nvm I'm not ready"}</button><br/>
        <button onClick={leaveGame}>Leave Game</button></>}
    </div>
    )
}

export default GameNotStarted
