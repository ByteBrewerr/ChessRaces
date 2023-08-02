import React, { FC, useEffect, useState } from 'react';
import BoardCell from './BoardCell';

const Board: FC = () => {
  const boardSize = 8;
  const [board, setBoard] = useState<JSX.Element[][]>([]);
  const [possibleMoves, setPossibleMoves] = useState<{ row: number, col: number }[]>([]);

  useEffect(() => {
    const newBoard = Array.from({ length: boardSize }, (_, row) =>
      Array.from({ length: boardSize }, (_, col) => {
        const color = (row + col) % 2 === 0 ? 'bg-white' : 'bg-green-600';
        const key = `${row}-${col}`;
        const playerPiece = row === 7 && col === 4;
        return <BoardCell key={key} backgroundColor={color} playerPiece={playerPiece} row={row} col={col} onClick={onCellClick} />;
      })
    );
    setBoard(prevBoard => newBoard);;
  }, []);
  
  const getPossibleMoves = (row: number, col: number)=>{
    const moves:{ row: number, col: number }[] = [];
    
    if (row > 0) {
      moves.push({ row: row - 1, col: col });
    }
    if (col > 0) {
      moves.push({ row: row, col: col - 1 });
    }
    if (col < boardSize - 1) {
      moves.push({ row: row, col: col + 1 });
    }
    return moves
  }
  const onCellClick = (row: number, col: number, playerPiece: boolean):void => {
    console.log(board)
    const possibleMoves = getPossibleMoves(row, col)
    if (playerPiece) {
      const newBoard = Array.from({ length: boardSize }, (_, rowIndex)  =>
        Array.from({ length: boardSize }, (_, colIndex)  => {
          

          let color = (rowIndex + colIndex) % 2 === 0 ? 'bg-white' : 'bg-green-600';
          playerPiece = (row === rowIndex && col === colIndex)
          const isPossibleMove = possibleMoves.some(move => move.row === rowIndex && move.col === colIndex);
          if (isPossibleMove) {
            color = 'bg-yellow-500';
          }

          

          return <BoardCell 
            key={`${rowIndex}-${colIndex}`} 
            backgroundColor={color} 
            playerPiece={playerPiece} 
            row={rowIndex} 
            col={colIndex} 
            onClick={onCellClick} 
          />
        })
      );
  
      setBoard(prevBoard => newBoard);;
    }
    
  };

 

  return (
    <div className='h-[90vh] flex justify-center items-center'>
      <div className='flex w-[600px] h-[600px] flex-wrap '>
        {board}
      </div>
    </div>
  );
}

export default Board;