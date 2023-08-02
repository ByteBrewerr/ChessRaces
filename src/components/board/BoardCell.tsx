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
  const onHover = ():string => {
    if (color==='bg-yellow-500') return 'hover:bg-yellow-600'
    if (color==='bg-white') return 'hover:bg-gray-300'
    if (color==='bg-green-500') return 'hover:bg-green-600'
    else return ''
  }
  return (
    <div
      className={`w-[75px] h-[75px] flex items-center justify-center ${color} ${onHover()}`}
      onClick={()=>onCellClick(row, col)}
    >
      {piecePosition && piecePosition.row === row && piecePosition.col === col && <PlayerPiece/>}
      {enemyPiecePosition && enemyPiecePosition.row === row && enemyPiecePosition.col === col && <EnemyPlayerPiece/>}
      {isPossibleToMove && <PossibleMoveImage/>}
    </div>
  );
};
export default BoardCell