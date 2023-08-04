import React, { FC } from 'react';
import possibleMove from '../../../assets/possibleMove.png';

const PossibleMoveImage: FC = () => {
  const containerStyle = {
    background: `url(${possibleMove})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  };

  return (
    <div className='w-[20px] h-[20px]' style={containerStyle}>
    </div>
  );
}

export default PossibleMoveImage;