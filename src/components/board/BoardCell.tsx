import React, { FC } from 'react';
import PlayerPiece from '../game/PlayerPiece';
import EnemyPlayerPiece from '../game/EnemyPlayerPiece'
import PossibleMoveImage from '../game/PosibleMoveImage';

interface PiecePosition  {
  row: number;
  col: number;
};
interface Props {
  row: number;
  col: number;
  color: string;
  isPossibleToMove: boolean
  piecePosition: PiecePosition | null;
  enemyPiecePosition: PiecePosition | null
  selectedPiecePosition?: PiecePosition | null;
  onCellClick: (row: number, col: number) => void;
}

const BoardCell: FC<Props> = ({ row, col, color, piecePosition, enemyPiecePosition, onCellClick, isPossibleToMove }) => {
  const onHover = color === 'bg-white' ? 'hover:bg-gray-300' : 'hover:bg-green-600'
    
  return (
    <div
      className={`w-[75px] h-[75px] flex items-center justify-center cursor-pointer ${color} ${onHover}`}
      onClick={()=>onCellClick(row, col)}
    >
      {piecePosition && piecePosition.row === row && piecePosition.col === col && <PlayerPiece/>}
      {enemyPiecePosition && enemyPiecePosition.row === row && enemyPiecePosition.col === col && <EnemyPlayerPiece/>}
      {isPossibleToMove && <PossibleMoveImage/>}
    </div>
  );
};
export default BoardCell