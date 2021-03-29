import React from 'react'

import axios from 'axios'
import {useQuery, QueryClientProvider, QueryClient} from 'react-query'
import {useHistory} from 'react-router-dom'

const db = "http://localhost:4343"

const queryClient = new QueryClient()




const LobbyGame = (props) => {

    const id = window.localStorage.getItem('playerId')
    const {push} = useHistory();



    const getGameInfo = async () => {
        const res = await fetch(`${db}/games/${props.id}/game-players`)
        console.log('fetching')
        return res.json()
    }

    const {data: gameInfo, status: gameStatus} = useQuery(`game${props.id}Data`, getGameInfo, {refetchInterval: 10000})

    const joinGame = evt => {
        evt.preventDefault();
            console.log(id)
            axios.post(`${db}/games/${props.id}/game-players`, {player_id: id, game_id: props.id})
            .then(res=>{
                console.log(res)
                window.localStorage.setItem('gpid', res.data.id)
                push(`game-room/${props.id}`)
            })
            .catch(err=>{
                console.log(err)
            })}  

    // const startGame = evt => {
    //     evt.preventDefault()
    //     axios.put(`${db}/games/${props.id}/start`, {})
    //     .then(res=>{
    //         console.log(res)
    //     })
    //     .catch(err=>{
    //         console.log(err.message)
    //     })
    // }

    if (gameStatus === "success" && gameInfo && gameInfo.length < 1) {
        axios.delete(`${db}/games/${props.id}`)
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <QueryClientProvider client={queryClient}>
        <div style={{border: "solid black 1px", paddingBottom: "3%", marginBottom: "5%"}} key={props.id + 2 / id + 2}>
            <p>Game# {props.id}</p>
            <div>
                <p>Players:</p>
                {gameStatus === "loading" && "LOADING"}
                {gameStatus === "error" && "ERROR"}
                {gameStatus === "success" && gameInfo.map(player=>{
                    return (
                        <p key={player.id}>{player.name}</p>
                    )
                })}
            </div>
            <button onClick={joinGame} key={props.id + id} style={{display: "inline"}}>Join this game</button>
        </div>
        </QueryClientProvider>
    )
};

export default LobbyGame
