import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {useQuery} from 'react-query'


const Lobby = () => {

// const [onlinePlayers, setOnlinePlayers] = useState([])


const { isLoading, error, data } = useQuery('repoData', () =>
fetch('http://localhost:4343/players/logged-in').then(res =>
  res.json()
)
)

    return (
        <div>
            {isLoading ? <p>LOADING</p> : error ? <p>AN ERROR HAS OCCURED</p> : ""}
            { data && data.map(pl=>{
                return (
                    <p key={pl.id}>{pl.name}</p>
                )
            })
        }
        </div>
    )
}

export default Lobby
