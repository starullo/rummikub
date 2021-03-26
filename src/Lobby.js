import axios from 'axios'
import React from 'react'
// import jwt_decode from "jwt-decode"
import {useHistory} from 'react-router-dom'
// import Game from './Game'
// import PlayerInfo from './PlayerInfo'

import PlayerHook from './Queries/getPlayerInfo'
import PlayersHook from './Queries/getPlayers'


const Lobby = () => {

const [playerData, playerStatus] = PlayerHook()
const [playersData, playersStatus, isFetching] = PlayersHook()
// const [players, setPlayers] = useState(playersData)
// useEffect(()=>{
//     setPlayers(playersData)
// // })
// console.log(players)


const {push} = useHistory()

// const [onlinePlayers, setOnlinePlayers] = useState([])







const id = window.localStorage.getItem('playerId')

const logOut = evt => {
    evt.preventDefault()
        window.localStorage.removeItem('gameToken')
        window.localStorage.removeItem('playerId')
        push('/login')

}

const isReady = evt => {
    evt.preventDefault()
    axios.put(`https://rummikub-be.herokuapp.com/players/${id}/ready`, {player_ready: true})
    .then(res=>{
        window.location.reload(true)
        console.log(res)
    })
    .catch(err=>{
        console.log(err)
    })
}

const notReady = evt => {
    evt.preventDefault()
    axios.put(`https://rummikub-be.herokuapp.com/players/${id}/not-ready`, {player_ready: false})
    .then(res=>{
        window.location.reload(true)
        console.log(res)
    })
    .catch(err=>{
        console.log(err)
    })
}

// let playerReady;


// useEffect(()=>{
//     setPlayers(data)
//     console.log(data, players)
// }, [data])

// useEffect(()=>{
//     setPlayerInfo(data2)
// }, [data2])

// console.log(data)


    return (
        <div>
            {isFetching}
            {playersStatus === "error" && <p>ERROR</p>}
            {playersStatus === "loading" && <p>LOADING</p>}
            {playersStatus === "success" && playersData && playersData.map(pl=>{
                return (
                    <p key={pl.id}>{pl.name}- {pl.player_ready ? "Ready" : "Not Ready"}</p>
                )
            })}


        {/* <QueryClientProvider client={queryClient2}>
            <PlayerInfo setWow={setWow} wow={wow}/>
        </QueryClientProvider> */}
        {/* <button onClick={logOut}>Log Out</button>*/}
        {playerStatus === "success" && playerData && <p onClick={isReady}>{playerData.player_ready ? "Ready!" : "Ready?"}</p>}
        <button onClick={notReady}>Nvm, not ready yet</button>
    <button onClick={logOut}>Log Out</button>
        </div>
    )
}

export default Lobby
