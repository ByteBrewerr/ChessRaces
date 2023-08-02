import React, { FC } from 'react';
import PlayerPiece from '../playerPiece/PlayerPiece';

type PiecePosition = {
  row: number;
  col: number;
};

const BoardCell: React.FC<{
  row: number;
  col: number;
  piecePosition: PiecePosition | null;
  selectedPiecePosition: PiecePosition | null;
  onCellClick: (row: number, col: number) => void;
}> = ({ row, col, piecePosition, selectedPiecePosition, onCellClick }) => {
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
  const isPieceSelected = selectedPiecePosition && selectedPiecePosition.row === row && selectedPiecePosition.col === col;
  const possibleMoves = isPieceSelected ? calculatePossibleMoves(selectedPiecePosition) : [];

  const handleCellClick = () => {
    onCellClick(row, col);
  };
  
  return (
    <div
      className={`w-12 h-12 flex items-center justify-center ${isPieceSelected ? 'bg-red-500' : (possibleMoves.includes(`${row}${col}`) ? 'bg-green-500' : 'bg-gray-500')}`}
      onClick={handleCellClick}
    >
      {piecePosition && piecePosition.row === row && piecePosition.col === col && 'playerPiece'}
    </div>
  );
};
export default BoardCell