import {useState, useEffect} from 'react'
import {  useQuery } from 'react-query'

const db = "http://localhost:4343"



const PlayersHook = () => {
    const [players, setPlayers] = useState(null)
    const [wow, setWow] = useState(false)
    const getPlayers = async () =>{
        const res = await fetch('https://rummikub-be.herokuapp.com/players')
        setWow(!wow)
        return res.json()
            
    }
    


    const q = useQuery('repoData', getPlayers)

    useEffect(()=>{
        setPlayers(q.data)
        setWow(!wow)
    }, [q.data])

    const playersStatus = q.status
    return [players, playersStatus]
}

export default PlayersHook
