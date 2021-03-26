import React, {useState, useEffect} from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const PlayerInfo = (props) => {
    const [ready, setReady] = useState(false)

    const {push} = useHistory();

    const id = window.localStorage.getItem('playerId')
    

    const { isLoading, error, data } = useQuery('playerData', () =>
    fetch(`https://rummikub-be.herokuapp.com/players/${id}`).then(res =>
      res.json()
    )
    )

    console.log(data)

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
            // window.location.reload(true)
            setReady(true)
            props.setWow(!props.wow)
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
            // window.location.reload(true)
            setReady(false)
            props.setWow(!props.wow)
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        axios.get('https://rummikub-be.herokuapp.com/players')
        .then(res=>{
            setPlayers(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }, [])


    return (
        <div>
            {isLoading && <p>LOADING</p>}
            {error && <p>ERROR!</p>}
            {!isLoading && !error && data && <><p onClick={isReady}>{ready ? "Ready!" : "Ready?"}</p>
    <button onClick={notReady}>Nvm, not ready yet</button>
    <button onClick={logOut}>Log Out</button></>}
        </div>
    )
}

export default PlayerInfo
