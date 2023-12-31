import React, { FC } from 'react';
import PlayerPiece from '../../assets/PlayerPiece';
import EnemyPlayerPiece from '../../assets/EnemyPlayerPiece'
import PossibleMoveImage from '../../assets/PosibleMoveImage';
import Mountain from '../../assets/Mountain';
import Position from '../../../../interfaces/Position';
import Barrier from '../../assets/Barrier';


interface Props {
  row: number
  col: number
  color: string
  isPossibleToMove: boolean
  piecePosition: Position
  enemyPiecePosition: Position
  isMountain: boolean
  isBarrier: boolean
  onCellClick: (row: number, col: number) => void
}

const BoardCell: FC<Props> = ({ row, col, color, piecePosition, enemyPiecePosition, onCellClick, isPossibleToMove, isMountain, isBarrier }) => {
  const onHover = color === 'bg-white' ? 'hover:bg-gray-300' : 'hover:bg-green-600'
  return (
    <div
      className={`w-[60px] h-[60px] flex items-center justify-center cursor-pointer ${color} ${onHover}`}
      onClick={()=>onCellClick(row, col)}
    >
      {piecePosition && piecePosition.row === row && piecePosition.col === col && <PlayerPiece/>}
      {enemyPiecePosition && enemyPiecePosition.row === row && enemyPiecePosition.col === col && <EnemyPlayerPiece/>}
      {isPossibleToMove && <PossibleMoveImage/>}
      {isMountain && <Mountain/>}
      {isBarrier && <Barrier/>}
    </div>
  );
};
export default BoardCell