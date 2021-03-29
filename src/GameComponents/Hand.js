import React from 'react'
import styled from 'styled-components'
import {useQuery} from 'react-query'
import {useParams} from 'react-router-dom'

import Piece from './Piece'

const PlayerHand = styled.div`
display: flex;
justify-content: space-between;
flex-wrap: wrap;
width: 95%;
margin: auto;


p {
    display: block;
    width: 13%;
}

`


const db = "http://localhost:4343"

const Hand = ({curPlay, setCurPlay}) => {

    const {gameId} = useParams();
    const playerId = window.localStorage.getItem('playerId')

    const getPlayerHand = async () => {
        const res = await fetch(`${db}/play/${gameId}/hand/${playerId}`)
        console.log(`${db}/play/${gameId}/hand/${playerId}`)
        return res.json()
    }

    const {data: playerHand, status: playerHandStatus} = useQuery(`player${playerId}Hand`, getPlayerHand)

console.log(playerHand)


    return (
        <div>
        {playerHandStatus === "loading" && <p>LOADING YOUR HAND</p>}
        {playerHandStatus === "error" && <p>ERROR GETTING YOUR HAND</p>}
        <PlayerHand>
        {playerHandStatus === "success" && playerHand && playerHand.map(piece=>{
            return (
                    <Piece piece={piece} curPlay={curPlay} setCurPlay={setCurPlay}/>
            )
            })}
        </PlayerHand>
        </div>
    )
}

export default Hand
