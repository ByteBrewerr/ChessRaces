import React, { FC } from 'react'
import Board from './board/Board'
import Timer from './Timer'


const GameField:FC = () => {  
    return (
        <div className="flex flex-col items-center justify-center h-[90vh]">
            <div className="flex flex-col ">
                <div className='mb-2'>
                    <Timer/>
                </div>
                <Board/>
            </div>
        </div>
    )
}

export default GameField