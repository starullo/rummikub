import {useState, useEffect} from 'react'
import {  useQuery, useIsFetching } from 'react-query'

const getPlayers = async () =>{
    const res = await fetch('https://rummikub-be.herokuapp.com/players')
    return res.json()
        
}

const PlayersHook = () => {
    const [players, setPlayers] = useState(null)

    const isFetching = useIsFetching();

    const q = useQuery('repoData', getPlayers)

    useEffect(()=>{
        setPlayers(q.data)
    }, [q.data])

    const playersStatus = q.status
    return [players, playersStatus, isFetching]
}

export default PlayersHook
