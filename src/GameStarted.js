import axios from 'axios'
import React, {useState, useEffect} from 'react'

import styled from 'styled-components'

import {useQuery} from 'react-query'
import {useParams} from 'react-router-dom'
import Hand from './GameComponents/Hand'

const Play = styled.div`
width: 3%;
margin: auto;
display: flex;
justify-content: space-between;
`


const db = "http://localhost:4343"

const GameStarted = () => {
    
    const [curPlay, setCurPlay] = useState([])

    const {gameId} = useParams();
    const playerId = window.localStorage.getItem('playerId')



    const getPlayerInfo = async () => {
        const res = await fetch(`${db}/games/${gameId}/game-players`)
        console.log('fetching')
        return res.json()
    }

    const {data: playersInfo, status: playersStatus} = useQuery(`lobbyGame${gameId}PlayersData`, getPlayerInfo, {refetchInterval: 10000})

    // const getPlayerHand = async () => {
    //     const res = await fetch(`${db}/play/${gameId}/hand/${playerId}`)
    //     console.log(`${db}/play/${gameId}/hand/${playerId}`)
    //     return res.json()
    // }

    // const {data: playerHand, status: playerHandStatus} = useQuery(`player${playerId}Hand`, getPlayerHand, {refetchInterval: 10000})



    return (
        <div>
            {playersStatus === "loading" && <p>LOADING PLAYER INFO</p>}
            {playersStatus === "error" && <p>ERROR GETTING PLAYER INFO</p>}
            <Play>
            {curPlay.map(piece=>{
                return (
                    <p style={piece.color === "black" ? {color: "black"} : piece.color === "red" ? {color: "red"} : piece.color === "orange" ? {color: "orange"} : {color: "blue"}}key={piece.id}>{piece.value}</p>
                )
            })}
            </Play>
            {playersStatus === "success" && playersInfo && playersInfo.map(p=>{
                return (
                    <p key={p.id}>{p.name}</p>
                )
            })}
            <Hand curPlay={curPlay} setCurPlay={setCurPlay}/>
        </div>
    )
}

export default GameStarted
