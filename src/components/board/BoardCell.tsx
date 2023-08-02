import React, { FC } from 'react';
import PlayerPiece from '../playerPiece/PlayerPiece';

interface Cell {
  backgroundColor: string;
  playerPiece: boolean;
  row: number;
  col: number;
  onClick: (col: number, row: number, playerPiece: boolean) => void;
}

const BoardCell: FC<Cell> = ({ backgroundColor, playerPiece, row, col, onClick }) => {
  const onHover = backgroundColor === 'bg-white' ? 'hover:bg-gray-300' : 'hover:bg-green-700';
  return (
    <button
      className={`${backgroundColor} w-[75px] h-[75px] ${onHover} cursor-pointer`}
      onClick={() => onClick(row, col, playerPiece)} 
    >
      {playerPiece && <PlayerPiece />}
    </button>
  );
};

export default BoardCell