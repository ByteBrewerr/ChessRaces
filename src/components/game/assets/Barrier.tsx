import React from 'react'
import barrier from '../../../assets/barrier.png'


const Barrier = () => {
    const containerStyle = {
        background: `url(${barrier})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      };
  return (
    <div className='w-[50px] h-[50px]' style={containerStyle}>

    </div>
  )
}

export default Barrier