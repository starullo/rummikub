import axios from 'axios'
import React, {useState, useEffect} from 'react'

import styled from 'styled-components'

import {useQuery} from 'react-query'
import {useParams} from 'react-router-dom'
import Hand from './GameComponents/Hand'
import BoardGroup from './GameComponents/BoardGroup'

const Play = styled.div`
width: 3%;
margin: auto;
display: flex;
justify-content: space-between;
`

const Board = styled.div`
display: flex;
flex-direction: column;
justify-content: space-evenly;
flex-wrap: wrap;
width: 80%;
div {
    width: 33%;
    margin: auto;
}
`


const db = "http://localhost:4343"

const initialFormValues = {color: "", value: ""}

const GameStarted = () => {

    const [pps_to_delete, setpps_to_delete] = useState([])
    const [fuckingId, setFuckingId] = useState(null)
    const [theNewCurPlay, setTheNewCurPlay] = useState({})
    const [idsInPlay, setIdsInPlay] = useState([])
    const [modal, setModal] = useState(false)
    const [boardPlays, setBoardPlays] = useState([])
    const [curPlay, setCurPlay] = useState([])
    const [curHand, setCurHand] = useState([])
    const [boardGroupsArray, setBoardGroupsArray] = useState([])

    const [formValues, setFormValues] = useState(initialFormValues)

    const isValidPlay = (arr) => {
        const values = arr.map(obj=>obj.value)
        const colors = arr.map(obj=>obj.color)
        if (arr.length < 3) {
            return false;
        }
        let firstColor;
        let firstColorIndex;
        let colorsMatch;
        for (let i = 0; i < colors.length; i++) {
            if (values[i] === "WILD" || Number(values[i]) === 0) {
                continue;
            } else {
                firstColor = colors[i]
                firstColorIndex = i;
                break
            }

        }
        for (let i = firstColorIndex; i < colors.length; i++) {
            console.log(values[i])
            if (i === colors.length - 1) {
                colorsMatch = true;
                continue
            }
            if (values[i] === "WILD" || Number(values[i]) === 0) {
                
                continue
                
            } else {
                if (colors[i] !== firstColor) {
                    colorsMatch = false;
                    break;
                }
                

            }
        }
        let prevValue;
        if (colorsMatch) {
            for (let i = 1; i < values.length; i++) {
                if (values[i] === "WILD") {
                    continue;
                }
                if (prevValue && Number(values[i]) !== Number(prevValue) + 1) {
                    return false;
                }
                prevValue = values[i]
                continue;
                }
            return true;
        } else {
            let firstValue;
            let firstValueIndex;
            for (let i = 0; i < values.length; i++) {
                if (values[i] !== "WILD") {
                    firstValue = values[i];
                    firstValueIndex = i;
                    break;
                }
            }
            for (let i = firstValueIndex; i < values.length; i++) {
                if (values[i] === "WILD") {
                    continue;
                }
                if (values[i] !== firstValue) {
                    return false;
                }
            }   
            return true;
        }

    }

    const {gameId} = useParams();

    const playerId = window.localStorage.getItem('playerId')





    const getPlayerInfo = async () => {
        const res = await fetch(`${db}/games/${gameId}/game-players`)
        return res.json()
    }



    const {data: playersInfo, status: playersStatus} = useQuery(`lobbyGame${gameId}PlayersData`, getPlayerInfo, {refetchInterval: 10000})

    // if (playersStatus === "success" && playersInfo) {
    //     let playersReady = playersInfo.every(obj=>{
    //         return obj.ready === 1
    //     })
    //     if (playersReady) {

    //     }
    // }


    const getPlayersHand = async () => {
        const res = await fetch(`${db}/play/${gameId}/hands/${playerId}`)
        return res.json()
    }

    const {data: playersHand, status: playersHandStatus} = useQuery(`player${playerId}Hand`, getPlayersHand, {refetchInterval: 3000})


    const getGameStatus = async () => {
        const res = await fetch(`${db}/play/${gameId}/status`)
        return res.json()
    }

    const {data: gameStatusInfo, status: gameStatusStatus} = useQuery(`game${gameId}status`, getGameStatus, {refetchInterval: 2000})

    const getNumTilesInfo = async () => {
        const res = await fetch(`${db}/play/${gameId}/tiles`)
        return res.json()
    }

    const {data: numTilesInfo, status: numTilesInfoStatus} = useQuery(`awwtoofuckingbad`, getNumTilesInfo, {refetchInterval: 3000})

    // useEffect(()=>{
    //     const gs = window.localStorage.getItem("gameStarted")

        
        
    //     if (gs === "false") {
    //         if (Number(playerId) === 1) {
    //             axios.get(`${db}/play/${gameId}/forfuckssake`)
    //             .then(res=>{
    //                 console.log('fuck you')
    //                 window.localStorage.setItem('gameStarted', "true")
    //             })
    //             .catch(err=>{
    //                 console.log('fuck youuu')
    //                 window.localStorage.setItem('gameStarted', "true")
    //             })
    //         }
            
    // } 
    // })


    async function fuckOff() {
        for (let i = 0; i < 14; i++) {
            try {
            const wow = await axios.get(`${db}/play/${gameId}/${playerId}/draw/false`)
            }
            catch (err) {
            }
           
        }

        window.localStorage.setItem('gameStarted', "true")
    }



    if (gameStatusStatus === "success" && gameStatusInfo) {
    }

    if (gameStatusStatus === "success" && gameStatusInfo) {
    }

    const drawPiece = evt => {
        evt.preventDefault()
        evt.stopPropagation()
        if (gameStatusStatus === "success" && gameStatusInfo && gameStatusInfo.turn === Number(playerId)) {
        axios.get(`${db}/play/${gameId}/${playerId}/drawendturn`)
        .then(res=>{
        })
        .catch(err=>{
        })
    }
    }
    if (playersInfo) {
    }

    // const getPlayerHand = async () => {
    //     const res = await fetch(`${db}/play/${gameId}/hand/${playerId}`)
    //      (`${db}/play/${gameId}/hand/${playerId}`)
    //     return res.json()
    // }

    // const {data: playerHand, status: playerHandStatus} = useQuery(`player${playerId}Hand`, getPlayerHand, {refetchInterval: 10000})



    const getBoardInfo = async () => {
        const res = await fetch(`${db}/play/${gameId}/board`)
        return res.json()
    }

    const {data: boardInfo, status: boardStatus} = useQuery(`boardPieces`, getBoardInfo, {refetchInterval: 3000})

    const getPlayerHand = async () => {
        const res = await fetch(`${db}/play/${gameId}/hand/${playerId}`)
        return res.json()
    }

    const {data: playerHand, status: playerHandStatus} = useQuery(`wowfuck`, getPlayerHand, {refetchInterval: 3000})

    let fuck = []
    if (boardStatus === "success" && boardInfo) {
        fuck = []
        for (let i = 0; i < boardInfo.length; i++) {
            let wow = {}
            for (let i = 0; i < boardInfo.length; i++) {
                if (!wow[boardInfo[i].play_id]) {
                    wow[boardInfo[i].play_id] = []
                }
                wow[boardInfo[i].play_id].push(boardInfo[i])
      
            }
            fuck = [];
            let keys = Object.keys(wow);
            keys.forEach((p, i)=>{
        
                fuck.push(wow[p])
            })
        }
    }

    const postPlay = e => {
        e.preventDefault();
        if (gameStatusStatus === "success" && gameStatusInfo && gameStatusInfo.turn === Number(playerId)) {
            if (curPlay.length > 0) {
                if (!isValidPlay(curPlay)) {
                    return false;
                }
            }
            if (fuck.length < 1) {
        const newPlay = curPlay.map(obj=>{
            if (obj.value === "WILD") {
                return {
                    ...obj, value: 0
                }
            } else {
                return obj
            }
        })
        axios.post(`${db}/play/${gameId}/plays/${playerId}`, newPlay)
        .then(res=>{
            setCurPlay([])
        })
        .catch(err=>{
        })
    } else {
        console.log(fuck)
        if (fuck.every(arr=>isValidPlay(arr))) {
            let postedObj = {curPlay, boardPlays: fuck, pps_to_delete}
            axios.post(`${db}/play/${gameId}/plays/${playerId}/multipleplays`, postedObj)
            .then(res=>{
                setCurPlay([])
                console.log(res)
            })
            .catch(err=>{
                console.log(err)
            })
        }
        
        

    }
    }
}





    // useEffect(()=>{
    //     if (boardStatus === "success" && boardInfo) {
    //         let wow = {}
    //         for (let i = 0; i < boardInfo.length; i++) {
    //             if (!wow[boardInfo[i].play_id]) {
    //                 wow[boardInfo[i].play_id] = []
    //             }
    //             wow[boardInfo[i].play_id].push(boardInfo[i])
    //         }
    //         let keys = Object.keys(wow);
    //         keys.forEach(play_id=>{
    //             setBoardPlays([...boardPlays, wow[play_id]])
    //         })
    //     }
    // }, [boardInfo])



    if (numTilesInfoStatus === "success" && numTilesInfo) {
    }

    if (playersInfo === "success" && playersInfo && playersInfo.find(p=>p.has_won === Number(1))) {
        axios.get(`${db}/play/${gameId}/endGame`)
        .then(res=>{
        })
        .catch(err=>{
        })
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
      const handleDrop = e => {
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
        console.log(newPiece)
        if (playerHandStatus === "success" && playerHand) {
            if (playerHand.find(obj=>obj.id === Number(newId))) {
                setpps_to_delete([...pps_to_delete, Number(newId)])
                console.log(Number(newId))
            }
        }
        if (!idsInPlay.includes(Number(newId))) {
            setCurPlay([...curPlay, newPiece])
            setIdsInPlay([...idsInPlay, Number(newId)])
        }
      
        
  
      }
      const handleDrop2 = e => {
          e.preventDefault();
          e.stopPropagation();
          const data = e.dataTransfer.getData("text/plain");
          const wow = data.split(/id|style|>/)
          const id = wow[1].split('"')[1]
          const color = wow[2].split(/:\s|;/)[1]
          const value = wow[3].split("<")[0]
          const newThangs = curPlay.filter(p=>p.id !== id)
          const newIds = newThangs.map(p=>Number(p.id))

          setCurPlay(newThangs)
          setIdsInPlay(newIds)
      }
  
      const handleDragStart = e => {
        //   e.preventDefault()
        //   e.stopPropagation()
          // e.dataTransfer.dropEffect = "move";
          e.dataTransfer.setData("text/plain", e.target.outerHTML)
      }

 
let plays = [];
if (boardStatus === "success" && boardInfo) {
    boardInfo.forEach(obj=>{
        if (!plays.includes(obj.play_id)) {
            plays.push(obj.play_id)
        }
    })
}

const getPlaysInfo = async () => {
    const res = await fetch(`${db}/play/${gameId}/plays`)
    return res.json()
}

const {data: playsInfo, status: playsStatus} = useQuery(`wowheywowheywow`, getPlaysInfo, {refetchInterval: 3000})

if (playsStatus === "success" && playsInfo) {
}

    return (
        <div>
            {gameStatusStatus === "success" && gameStatusInfo && gameStatusInfo.completed === 1 && playersInfo === "success" && playersInfo && playersInfo.find(p=>p.has_won === Number(1)) ? <p>GAME OVER</p> : 
        <div onDragOver={(evt)=>{ evt.stopPropagation()}}>
            {gameStatusStatus === "success" && gameStatusInfo && <p>{gameStatusInfo.turn === Number(playerId) ? "Your turn!" : gameStatusInfo.turn_name + "'s turn"}</p>}
            {playersStatus === "loading" && <p>LOADING PLAYER INFO</p>}
            {playersStatus === "error" && <p>ERROR GETTING PLAYER INFO</p>}
            <Board onDragOver={handleDragOver}>
            {playsStatus === "success" && playsInfo && playsInfo.map((play, i)=>{
                return (
                    <BoardGroup play={play} pps_to_delete={pps_to_delete} setpps_to_delete={setpps_to_delete} isValidPlay={isValidPlay} boardGroupsArray={boardGroupsArray} setBoardGroupsArray={setBoardGroupsArray} idsInPlay={idsInPlay} setIdsInPlay={setIdsInPlay} curPlay={curPlay} setCurPlay={setCurPlay} boardInfo={boardInfo} key={i * Math.random() / + i + 2 / Math.random() * Math.random()}/>
                )
            })}
        </Board>
            <div style={{display: "flex"}}>
            {playersStatus === "success" && playersInfo && playersInfo.map(p=>{
                return (
                    <p style={gameStatusStatus === "success" && gameStatusInfo && gameStatusInfo.turn === Number(p.player_id) ? {fontWeight: "bold"} : {fontWeight: "normal"}}key={p.id}>{p.name}</p>
                )
            })}
            </div>
            <Hand pps_to_delete={pps_to_delete} setpps_to_delete={setpps_to_delete} playerHand={playerHand} playerHandStatus={playerHandStatus} drawPiece={drawPiece} postPlay={postPlay} playersInfo={playersInfo} playersStatus={playersStatus} curHand={curHand} setCurHand={setCurHand} curPlay={curPlay} setCurPlay={setCurPlay} playersHand={playersHand} playersHandStatus={playersHandStatus} fuckingId={fuckingId} setFuckingId={setFuckingId} theNewCurPlay={theNewCurPlay} setTheNewCurPlay={setTheNewCurPlay} idsInPlay={idsInPlay} setIdsInPlay={setIdsInPlay} modal={modal} setModal={setModal} formValues={formValues} setFormValues={setFormValues} handleDrop={handleDrop} handleDragOver={handleDragOver} handleDragEnter={handleDragEnter} handleDragLeave={handleDragLeave} handleDragStart={handleDragStart} />
        </div>}
        </div>
    )
}

export default GameStarted
