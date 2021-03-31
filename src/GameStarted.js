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

    const isValidPlay = () => {
        const values = curPlay.map(obj=>obj.value)
        const colors = curPlay.map(obj=>obj.color)
        if (curPlay.length < 3) {
            return false;
        }
        const firstColor = colors[0]
        if (colors.every(color=>color === firstColor)) {
            for (let i = 1; i < values.length; i++) {
                if (values[i] !== (values[i - 1] + 1)) {
                    return false;
                }
            }
            return true;
        } else {
            for (let i = 1; i < values.length; i++) {
                if (values[i] !== (values[i - 1])) {
                    return false
                }
            }   
            return true;
        }

    }

    const {gameId} = useParams();

    const playerId = window.localStorage.getItem('playerId')





    const getPlayerInfo = async () => {
        const res = await fetch(`${db}/games/${gameId}/game-players`)
        console.log('fetching')
        return res.json()
    }

    const {data: playersInfo, status: playersStatus} = useQuery(`lobbyGame${gameId}PlayersData`, getPlayerInfo, {refetchInterval: 10000})

    useEffect(()=>{
        const gs = window.localStorage.getItem("gameStarted")
        let playerIds;
        if (playersInfo) {
            playerIds = playersInfo.map(p=>p.id)
        }
        
        
        if (gs === "false") {
            for (let i = 0; i < 14; i++) {
                axios.post(`${db}/play/${gameId}/${playerId}/firstdraw`)
                .then(res=>{
                    console.log(res)
                })
                .catch(err=>{
                    console.log(err.message)
                })
            }
            window.localStorage.setItem('gameStarted', "true")
    }
    })

    const drawPiece = evt => {
        evt.preventDefault()
        evt.stopPropagation()
        axios.get(`${db}/play/${gameId}/draw/${playerId}`)
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err.message)
        })
    }

    // const getPlayerHand = async () => {
    //     const res = await fetch(`${db}/play/${gameId}/hand/${playerId}`)
    //     console.log(`${db}/play/${gameId}/hand/${playerId}`)
    //     return res.json()
    // }

    // const {data: playerHand, status: playerHandStatus} = useQuery(`player${playerId}Hand`, getPlayerHand, {refetchInterval: 10000})


    return (
        <div onDragOver={(evt)=>{ evt.stopPropagation()}}>
            {playersStatus === "loading" && <p>LOADING PLAYER INFO</p>}
            {playersStatus === "error" && <p>ERROR GETTING PLAYER INFO</p>}
            <Play>
            {curPlay.length > 0 && isValidPlay(curPlay) && <p>Valid Play</p>}
            {curPlay.length > 0 && !isValidPlay(curPlay) && <p>Invalid Play</p>}
            <button onClick={drawPiece}>Draw</button>
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
