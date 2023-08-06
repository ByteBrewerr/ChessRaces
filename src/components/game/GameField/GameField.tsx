import React, { FC, useEffect, useState } from 'react';
import Board from './board/Board';
import Timer from './Timer';
import Position from '../../../interfaces/Position';
import generateMountains from '../../../utils/mountainsGenerator';

const GameField: FC = () => {
  const [mountains, setMountains] = useState<Position[]>([]);

  useEffect(() => { 
    const generatedMountains = generateMountains();
    setMountains(generatedMountains);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
      <div className="flex flex-col">
        <div className='mb-2'>
          <Timer />
        </div>
        <Board mountains={mountains} />
      </div>
    </div>
  );
}

export default GameField;