import React, {FC} from 'react'
import mountain from '../../../assets/mountain.png'



const Mountain: FC = () => {
    const containerStyle = {
        background: `url(${mountain})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        };
    return (
        <div className='w-[60px] h-[60px]' style={containerStyle}>
        </div>
    )
}

export default Mountain