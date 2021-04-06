import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {useQuery} from 'react-query'
import {useParams} from 'react-router-dom'
import BoardGroup from './BoardGroup'

import { Modal } from 'antd';

import Draggable from 'react-draggable';


import Piece from './Piece'
import axios from 'axios'
import GamePiece from '../GameComponents/GamePiece'



const PlayerHand = styled.div`
width: 95%;
margin: auto;
height: 20vh;
border: solid black 1px;
align-items: center;
display: flex;
flex-direction: row;
justify-content: space-between;
flex-wrap: wrap;

p {
    display: inline-block;
}

`

const DropZone = styled.div`
width: 60%;
margin: 3% auto;
border: solid black 1px;
display: flex;
justify-content: center;
height: 20vh;
p {
    display: inline-block;
    border: solid black 1px;
    margin: auto 3%;
    transform: scale(3);
}
`


const db = "http://localhost:4343"

const Hand = ({ pps_to_delete, playersInfo, playersStatus, curHand, setCurHand, curPlay, setCurPlay, playersHand, playersHandStatus, fuckingId, setFuckingId, theNewCurPlay, setTheNewCurPlay, idsInPlay, setIdsInPlay, modal, setModal, formValues, setFormValues, handleDrop, handleDragOver, handleDragEnter, handleDragLeave, handleDragStart, drawPiece, postPlay, playerHand, playerHandStatus}) => {






    const {gameId} = useParams();
    const playerId = window.localStorage.getItem('playerId')









    // useEffect(()=>{
    //     if (playerHandStatus === "success" && playerHand) {
    //         setVisibleHand(playerHand)
    //     }
        
    // })

    // useEffect(()=>{
    //     if (playerHandStatus === "success" && playerHand) {
    //         setCurHand(playerHand)
    //     }
    //     const ids = curPlay.map(p=>Number(p.id))
    //     setIdsInPlay(ids)
    // }, [curPlay, curHand])

    // if (playerHandStatus === "success" && playerHand) {
    //     let hand = player
    //     setCurHand(playerHand)
    // }


    let numTiles = 0
    if (playerHandStatus === "success" && playerHand) {
        for (let i = 0; i < playerHand.length; i++) {
            if (playerHand[i].player_id === Number(playerId)) {
                 numTiles++;
            }
        }
    }



    return (
        <div>
        {/* {playerHandStatus === "loading" && <p>LOADING YOUR HAND</p>}
        {playerHandStatus === "error" && <p>ERROR GETTING YOUR HAND</p>} */}
        {playerHandStatus === "success" && playerHand && <p>{playerHand.length} tiles left</p>}
        <button onClick={drawPiece}>Draw</button>
            <button onClick={postPlay}>Play Hand</button>
            <button onClick={e=>{e.preventDefault();window.location.reload()}}>Restart Turn</button>
        <DropZone onDrop={e => handleDrop(e)}
      onDragOver={handleDragOver}
      onDragEnter={e => handleDragEnter(e)}
      onDragLeave={e => handleDragLeave(e)}>
            {curPlay.length === 0 ? <p>Drag Pieces Here</p> : curPlay && curPlay.map(piece=>{
                return (
                    <p id={piece.id} draggable="true" onDragStart={handleDragStart} style={piece.color === "black" ? {color: "black"} : piece.color === "red" ? {color: "red"} : piece.color === "orange" ? {color: "orange"} : {color: "blue"}}key={piece.id * Math.random() * 1000 * Math.random() / Math.random()}>{piece.value}</p>
                )
            })}
        
            </DropZone>
        <PlayerHand
      onDragOver={handleDragOver}
      onDragEnter={e => handleDragEnter(e)}
      onDragLeave={e => handleDragLeave(e)}>
        {playerHandStatus === "success" && playerHand && playerHand.filter(p=>{return !pps_to_delete.includes(p.id) && p.player_id === Number(playerId)}).map(piece=>{
           
                return (
                    <GamePiece pieceInPlay={idsInPlay.includes(piece.id)} handleDragStart={handleDragStart} draggable="true" key={piece.id * Math.random() * 1000 * Math.random() / Math.random()} id={"pp" + piece.id} piece={piece} curPlay={curPlay} setCurPlay={setCurPlay} />
            )

            })}
        </PlayerHand>

        </div>
    )
}

export default Hand
