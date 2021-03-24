import axios from 'axios'
import React, {useState, useEffect} from 'react'

const Lobby = () => {

const [onlinePlayers, setOnlinePlayers] = useState([])

useEffect(()=>{
    axios.get('http://localhost:4343/players/logged-in')
    .then(res=>{
        console.log(res)
        setOnlinePlayers(res.data)
    })
    .catch(err=>{
        console.log(err)
    })
}, [])

    return (
        <div>
            {onlinePlayers.map(pl=>{
                return (
                    <p>{pl.name}</p>
                )
            })}
        </div>
    )
}

export default Lobby
