import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useQuery, QueryClientProvider, QueryClient} from 'react-query'
import GameNotStarted from './GameNotStarted';
import GameStarted from './GameStarted'

const db = "http://localhost:4343"


const GameRoom = () => {

    const {id} = useParams();

    const getGameInfo = async () => {
        const res = await fetch(`${db}/games/${id}`)
        console.log('fetching')
        return res.json()
    }

    const {data: gameInfo, status: gameStatus} = useQuery(`lobbyGame${id}Data`, getGameInfo, {refetchInterval: 10000})

    console.log(id)

    const getPlayerInfo = async () => {
        const res = await fetch(`${db}/games/${id}/game-players`)
        console.log('fetching')
        return res.json()
    }

    const {data: playersInfo, status: playersStatus} = useQuery(`lobbyGame${id}PlayersData`, getPlayerInfo, {refetchInterval: 10000})

    console.log(gameInfo, playersInfo)

    return (
        <div>
        {gameStatus === "loading" ? <p>LOADING</p> : gameStatus === "error" ? <p>ERROR</p> : ""}
        {gameStatus === "success"  && gameInfo && gameInfo.in_progress === 0 ? <GameNotStarted playersInfo={playersInfo} playersStatus={playersStatus} gameInfo={gameInfo} gameStatus={gameStatus} id={id}/> : <GameStarted id={id}/>}
        </div>
    )
}

export default GameRoom
