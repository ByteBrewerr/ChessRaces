import React, { FC, useState } from 'react';
import BoardCell from './BoardCell';

interface Position {
  row: number;
  col: number;
};

const Board: FC = () => {
  const [piecePosition, setPiecePosition] = useState<Position>({ row: 7, col: 4 });
  const [selectedPiecePosition, setSelectedPiecePosition] = useState<Position | null>(null);
  const [enemyPiecePosition, setEnemyPiecePosition] = useState<Position>({ row: 0, col: 4 });

  const handleCellClick = (row: number, col: number) => {
    if ((piecePosition && !selectedPiecePosition) && piecePosition.row === row && piecePosition.col === col) {
      setSelectedPiecePosition({ row, col });
    } else if (selectedPiecePosition) {
      if (selectedPiecePosition.row === row && selectedPiecePosition.col === col) {
        setSelectedPiecePosition(null);
      } else if (calculatePossibleMoves(selectedPiecePosition).includes(`${row}${col}`)) {
        setPiecePosition({ row, col });
        setEnemyPiecePosition((position)=> {
          return getComputerMove(position) 
        })
        setSelectedPiecePosition(null);
      }
    }
  };
  const getComputerMove = ({row, col}: Position)=>{
    const moves: string[] = [];
    if (row > 7) {
      moves.push(`${row + 1}${col}`);
    }
    if (col > 0) {
      moves.push(`${row}${col - 1}`);
    }
    if (col < 7) {
      moves.push(`${row}${col + 1}`);
    }
    const move = moves[Math.floor(Math.random() * moves.length)]
    const rowMove = parseInt(move[0])
    const colMove = parseInt(move[1])
    return {row: rowMove, col: colMove}
  }

  const calculatePossibleMoves = ({ row, col }: Position) => {
    const moves: string[] = [];
    if (row > 0) {
      moves.push(`${row - 1}${col}`);
    }
    if (col > 0) {
      moves.push(`${row}${col - 1}`);
    }
    if (col < 7) {
      moves.push(`${row}${col + 1}`);
    }
    return moves;
  };
  
  const getDefaultBoardColor = (row:number, col:number): string => {
    if ((row % 2 !== 0 && col % 2 === 0) || (row % 2 === 0 && col % 2 !== 0)){
      return "bg-green-500"
    }
    else return "bg-white"
  };

  const isPossibleToMove = (row: number, col: number): boolean => {
    if(selectedPiecePosition){
      if (calculatePossibleMoves(selectedPiecePosition).includes(`${row}${col}`)) {
        return true;
      } 
      else return false
    }   
    else return false
  };

  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
      <div className="flex flex-wrap w-[600px] h-[600px]">
        {[...Array(8)].map((_, row) => (
          [...Array(8)].map((_, col) => {
            return (
              <BoardCell
                key={`${row}${col}`}
                row={row}
                col={col}
                color={getDefaultBoardColor(row, col)}
                isPossibleToMove={isPossibleToMove(row, col)}
                piecePosition={piecePosition}
                enemyPiecePosition={enemyPiecePosition}
                selectedPiecePosition={selectedPiecePosition}
                onCellClick={handleCellClick}
              />
            );
          })
        ))}
      </div>
    </div>
  );
};

export default Board;