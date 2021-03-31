import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {useQuery} from 'react-query'
import {useParams} from 'react-router-dom'


import Piece from './Piece'
import axios from 'axios'

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
    console.log(gameId, playerId)

    const getPlayerHand = async () => {
        const res = await fetch(`${db}/play/${gameId}/hand/${playerId}`)
        return res.json()
    }

    const {data: playerHand, status: playerHandStatus} = useQuery(`player${playerId}Hand`, getPlayerHand)

console.log(playerHand)

const d = evt => {
    evt.preventDefault()
    evt.stopPropagation()
}

const dragStart = evt => {
    evt.preventDefault()
    evt.stopPropagation()
    evt.dataTransfer.setData("text", evt.target.props.value);
    evt.dataTransfer.effectAllowed = "move";
}

const dragOver = evt => {
    evt.preventDefault()
    evt.stopPropagation()
    evt.dataTransfer.dropEffect = "move";
}

function drop(evt) {
    evt.preventDefault();
    evt.stopPropagation()
    const data = evt.dataTransfer.getData("text");
    window.alert(data)
  }


    return (
        <div>
        {playerHandStatus === "loading" && <p>LOADING YOUR HAND</p>}
        {playerHandStatus === "error" && <p>ERROR GETTING YOUR HAND</p>}
        <div onDragEnd={d} onDragLeave={d} onDragEnter={d} onDragStart={d} onDrag={dragStart} onDrop={(e)=>{drop(e)}} onDragOver={(e)=>{dragOver(e)}}>
            {curPlay.length === 0 && <p style={{display: "block", width: "40%", margin: "auto", paddingTop: "10%", border: "solid black 1px"}}>Drag Pieces Here</p>}
        {curPlay.map(piece=>{
                return (
                    <p style={piece.color === "black" ? {color: "black"} : piece.color === "red" ? {color: "red"} : piece.color === "orange" ? {color: "orange"} : {color: "blue"}}key={piece.id}>{piece.value}</p>
                )
            })}
        <PlayerHand>
        {playerHandStatus === "success" && playerHand && playerHand.map(piece=>{
            return (
                    <Piece draggable="true" ragStart={dragStart} key={piece.id} id={piece.id} piece={piece} curPlay={curPlay} setCurPlay={setCurPlay} />
            )
            })}
        </PlayerHand>
        </div>
        </div>
    )
}

export default Hand
