import React, {useState, useEffect} from 'react'
import {useQuery} from 'react-query'
import {useParams} from 'react-router-dom'

import styled from 'styled-components'

import Piece from '../GameComponents/Piece'


const Div = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
width: 33%;
border: solid black 1px
}
`

const db = "http://localhost:4343"

const BoardGroup = ({play, boardGroupsArray, setBoardGroupsArray, tiles, boardInfo, handleDragStart, idsInPlay, curPlay, setCurPlay, setIdsInPlay, isValidPlay, pps_to_delete, setpps_to_delete}) => {

    const [group, setGroup] = useState([])
    const {gameId} = useParams();
    const playerId = window.localStorage.getItem('playerId')
    



    // let playId;

    // if (groupInfo && groupStatus === "success" && tiles.length > 0) {
    //     playId = tiles[0].play_id
    // }

    // if (groupInfo) {
    //      (tiles)
    // }

    const handleDragStart2 = e => {
        //   e.preventDefault()
        //   e.stopPropagation()
          // e.dataTransfer.dropEffect = "move";
          e.dataTransfer.setData("text/plain", e.target.outerHTML)
      }

      const handleDragEnter = e => {
        e.preventDefault();
        e.stopPropagation();
      };
      const handleDragLeave = e => {
        e.preventDefault();
        e.stopPropagation();
      };
      const handleDragOver = e => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = "move";
      };

      useEffect(()=>{
      
        setGroup(play)
      }, [])
 

    //   useEffect(()=>{
    //       let newThanggggsWowHeyNow = group.filter(obj=>!idsInPlay.includes(obj.id))
    //     setGroup(newThanggggsWowHeyNow)
    //   }, [idsInPlay])

      const handleDrop3 = e => {
        e.preventDefault();
        e.stopPropagation();
        const data = e.dataTransfer.getData("text/plain");
        const wow = data.split(/id|style|>/)
        const id = wow[1].split('"')[1]
        const color = wow[2].split(/:\s|;/)[1]
        const value = wow[3].split("<")[0]
        let newValue;
        if (value !== "WILD") {
            newValue = Number(value)
        } else {
            newValue = "WILD"
        }
        let heynow = id.split("pp")[0] === "pp"
        let newId;
        if (heynow) {
            newId = Number(id.split("pp")[1])
            setpps_to_delete([...pps_to_delete, newId])
        } else {
            newId = Number(id.split("pp")[0])
            setpps_to_delete([...pps_to_delete, newId])
        }
        const newPiece = {id: Number(newId), color, value: newValue, player_id: Number(playerId), game_id: Number(gameId)}
        // let oldGroup = group.filter(obj=>Number(obj.id) !== Number(newId))
        console.log(isValidPlay([...group, newPiece].sort((a,b)=>a.value < b.value ? -1 : a.value > b.value ? 1 : 0)))
        if (isValidPlay([...group, newPiece].sort((a,b)=>a.value < b.value ? -1 : a.value > b.value ? 1 : 0))) {
            console.log('wow', newPiece)
            let oldGroup = [...group]
            oldGroup.push(newPiece)
            setGroup(oldGroup.sort((a,b)=>a<b?-1:a>b?1:0))
            
            // const newThangs = group.filter(p=>p.id !== id)
            // const newIds = newThangs.map(p=>Number(p.id))
            // setIdsInPlay([...idsInPlay, Number(newId)])
            let oldBoardGroupsArray = [...boardGroupsArray]
            oldBoardGroupsArray.push([...group, newPiece])
            setBoardGroupsArray(oldBoardGroupsArray)
        }

      }
      let firstColor; 
      let colorsMatch;
      if (group.length > 0) {
        firstColor = play[0].color;
        colorsMatch = play.every(obj=>obj.color === firstColor)
      }

    return (
        <Div onDragEnter={handleDragEnter} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop3}>
            {!colorsMatch && play.length > 0 && group.map(piece=>{
                return (
                    
                    <Piece pieceInPlay={idsInPlay.includes(piece.id)} handleDragStart={handleDragStart2} draggable="true" key={piece.id * Math.random() * 1000 * Math.random()} piece={piece} curPlay={curPlay} setCurPlay={setCurPlay}/>
                )
            })}
            { colorsMatch && play.length > 0 && group.sort((a,b)=>a.value < b.value ? -1 : a.value > b.value ? 1 : 0).map(piece=>{
                return (
                    
                    <Piece pieceInPlay={idsInPlay.includes(piece.id)} handleDragStart={handleDragStart2} draggable="true" key={piece.id * Math.random() * 1000 * Math.random()} piece={piece} curPlay={curPlay} setCurPlay={setCurPlay}/>
                )
            })}
            </Div>
    )
}

export default BoardGroup
