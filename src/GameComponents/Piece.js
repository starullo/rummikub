import React from 'react'
import styled from 'styled-components'


const Div = styled.div`
text-align: center;
border: solid black 1px;

&:hover {
    cursor: pointer;
}

.invisible {
    opacity: 0;
}

`

const Piece = ({piece, curPlay, setCurPlay, dragStart}) => {

    const addToPlay = evt => {
        evt.preventDefault()
        setCurPlay([...curPlay, piece])
    }
    const removeFromPlay = evt => {
        evt.preventDefault()
        const newCurPlay = curPlay.filter(obj=>obj.id!==piece.id)
        setCurPlay([...newCurPlay])
    }

    const pieceInPlay = curPlay.find(obj=>obj.id===piece.id);




    return (
            <Div draggable="true">
        <p className={pieceInPlay ? "" : "invisible"}>PLAYED</p>
        <p style={piece.color === "black" ? {color: "black"} : piece.color === "red" ? {color: "red"} : piece.color === "orange" ? {color: "orange"} : {color: "blue"}}key={piece.id}>{piece.value}</p>
        {!pieceInPlay && <button onClick={addToPlay}>Add Piece</button>}<br/>
        {pieceInPlay && <button onClick={removeFromPlay}>Remove Piece</button>}
        </Div>
    )
}

export default Piece
