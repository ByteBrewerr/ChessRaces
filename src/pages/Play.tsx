import React, { FC } from 'react';
import Board from '../components/board/Board';
import Timer from '../components/board/Timer';

const Play:FC = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <div className="flex flex-col ">
          <div className='mb-2'>
            <Timer/>
          </div>
          <Board />
        </div>
      </div>
    </>
  );
};

export default Play;