import axios from 'axios'
import React, {useState, useEffect} from 'react'


const Game = () => {

useEffect(()=>{
    axios.post('http://localhost:4343/games', {})
    .then(res=>{
        console.log(res)
    })
    .catch(err=>{
        console.log(err)
    })
}, [])

    return (
        <div>
            owiejfoweijfoweifj
        </div>
    )
}

export default Game
