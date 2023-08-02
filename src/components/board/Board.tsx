import React, { FC, useState, useEffect } from 'react';
import BoardCell from './BoardCell';

interface Position {
  row: number;
  col: number;
};

const Board: FC = () => {
  const [piecePosition, setPiecePosition] = useState<Position>({ row: 4, col: 2 });
  const [selectedPiecePosition, setSelectedPiecePosition] = useState<Position | null>(null);
  const [enemyPiecePosition, setEnemyPiecePosition] = useState<Position>({ row: 2, col: 2 });
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  
  useEffect(() => {
    if(isGameStarted){
      setEnemyPiecePosition((position) => {
        return getComputerMove(position);
      });
    }
  }, [piecePosition]);

  const handleCellClick = (row: number, col: number) => {
    setIsGameStarted(true)
    if (piecePosition.row === row && piecePosition.col === col && !selectedPiecePosition) {
      setSelectedPiecePosition({ row, col });
    } else if (selectedPiecePosition) {
      if (selectedPiecePosition.row === row && selectedPiecePosition.col === col) {
        setSelectedPiecePosition(null);
      } else if (calculatePossibleMoves(selectedPiecePosition).includes(`${row}${col}`)) {
        setPiecePosition({ row, col });
        setSelectedPiecePosition(null);
      }
    }
  };

  const getComputerMove = ({ row, col }: Position) => {
    const moves = calculatePossibleMoves({ row, col }, true)
    const randomMove = moves[Math.floor(Math.random() * moves.length)]
    const rowMove = parseInt(randomMove[0])
    const colMove = parseInt(randomMove[1])
    return { row: rowMove, col: colMove }
  }

  const calculatePossibleMoves = ({ row, col }: Position, isEnemyMove = false) => {
    const moves: string[] = [];
    if (!isEnemyMove) {
      if (row > 0 && !(enemyPiecePosition.row === row - 1 && enemyPiecePosition.col === col)) {
        moves.push(`${row - 1}${col}`);
      }
    } else {
      if (row < 7 && !(piecePosition.row === row + 1 && piecePosition.col === col)) {
        moves.push(`${row + 1}${col}`);
      }
    }

    if (col > 0 && !(piecePosition.row === row && piecePosition.col === col - 1) && !(enemyPiecePosition.row === row && enemyPiecePosition.col === col - 1)) {
      moves.push(`${row}${col - 1}`);
    }

    if (col < 7 && !(piecePosition.row === row && piecePosition.col === col + 1) && !(enemyPiecePosition.row === row && enemyPiecePosition.col === col + 1)) {
      moves.push(`${row}${col + 1}`);
    }
    console.log(moves)
    return moves;
  };

  const getDefaultBoardColor = (row: number, col: number): string => {
    if ((row % 2 !== 0 && col % 2 === 0) || (row % 2 === 0 && col % 2 !== 0)) {
      return "bg-green-500"
    }
    else return "bg-white"
  };

  const isPossibleToMove = (row: number, col: number): boolean => {
    if (selectedPiecePosition) {
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