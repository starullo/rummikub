import {  useQuery } from 'react-query'

const getPlayerInfo = async () => {
    const playerId = window.localStorage.getItem('playerId')
    const res = await fetch(`https://rummikub-be.herokuapp.com/players/${playerId}`)
    return res.json()
}

const PlayerHook = () => {


    const {data, status} = useQuery('player', getPlayerInfo);

    
    return [data, status]
}

export default PlayerHook



