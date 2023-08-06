import React, { FC, useEffect, useState } from 'react';
import Board from './board/Board';
import Timer from './Timer';
import Position from '../../../interfaces/Position';
import generateMountains from '../../../utils/mountainsGenerator';
import SidePannel from './SidePannel';

const GameField: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
        <div className='mb-2'>
          <Timer />
        </div>
        <div className='flex items-center'>
          <SidePannel/>
          <Board/>
        </div>


    </div>
  );
}

export default GameField;