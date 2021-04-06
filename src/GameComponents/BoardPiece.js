import React from 'react'

const BoardPiece = ({piece, curPlay, setCurPlay, pieceInPlay}) => {

    const handleDragStart = e => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.setData("text/plain", e.target.outerHTML)
    }

    return (
        <p draggable="true" onDragStart={handleDragStart}>{piece.value}</p>
    )
}

export default BoardPiece
