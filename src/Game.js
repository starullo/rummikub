import axios from 'axios'
import React, { useEffect} from 'react'


const Game = () => {

useEffect(()=>{
    axios.post('https://rummikub-be.herokuapp.com/games', {})
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
