import React, { FC, useEffect, useState } from 'react';
import BoardCell from './BoardCell';

type PiecePosition = {
  row: number;
  col: number;
};

const Board: React.FC = () => {
  const [piecePosition, setPiecePosition] = useState<PiecePosition>({ row: 7, col: 4 });
  const [selectedPiecePosition, setSelectedPiecePosition] = useState<PiecePosition | null>(null);

  const handleCellClick = (row: number, col: number) => {
    if (piecePosition && piecePosition.row === row && piecePosition.col === col) {
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

  const calculatePossibleMoves = (position: PiecePosition) => {
    const moves: string[] = [];
    const { row, col } = position;

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

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="grid grid-cols-8 gap-1">
        {[...Array(8)].map((_, row) => (
          [...Array(8)].map((_, col) => (
            <BoardCell
              key={`${row}${col}`}
              row={row}
              col={col}
              piecePosition={piecePosition}
              selectedPiecePosition={selectedPiecePosition}
              onCellClick={handleCellClick}
            />
          ))
        ))}
      </div>
      <div className="text-center mt-4">{piecePosition && piecePosition.row === 7 && piecePosition.col === 4 && 'playerPiece'}</div>
    </div>
  );
};

export default Board;