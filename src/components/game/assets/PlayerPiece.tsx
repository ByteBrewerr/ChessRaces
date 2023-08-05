import React, { FC } from 'react';
import piece from '../../../assets/playerPiece.png';

const PlayerPiece: FC = () => {
  const containerStyle = {
    background: `url(${piece})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  };

  return (
    <div className='w-[50px] h-[50px]' style={containerStyle}>
    </div>
  );
}

export default PlayerPiece;