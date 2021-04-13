import React from 'react'
import styled from 'styled-components'


const Div = styled.div`
text-align: center;
border: solid black 1px;
width: 12.3%;


&:hover {
    cursor: pointer;
}


`

const Piece = ({piece, curPlay, setCurPlay, handleDragStart, pieceInPlay}) => {


   

    const addToPlay = evt => {
        evt.preventDefault()
        setCurPlay([...curPlay, piece])
    }
    const removeFromPlay = evt => {
        evt.preventDefault()
        const newCurPlay = curPlay.filter(obj=>obj.id!==piece.id)
        setCurPlay([...newCurPlay])
    }




    return (
            <Div style={pieceInPlay ? {display: "none"} : {display: "default"}}>
        <p draggable="true" onDragStart={handleDragStart} style={piece.value === 0 ? {color: "purple"} : piece.color === "black" ? {color: "black"} : piece.color === "red" ? {color: "red"} : piece.color === "orange" ? {color: "orange"} : {color: "blue"}} id={piece.id}>{piece.value === 0 ? "WILD" : piece.value}</p>
        {/* {!pieceInPlay && <button onClick={addToPlay}>Add Piece</button>}<br/>
        {pieceInPlay && <button onClick={removeFromPlay}>Remove Piece</button>} */}
        </Div>
    )
}

export default Piece
