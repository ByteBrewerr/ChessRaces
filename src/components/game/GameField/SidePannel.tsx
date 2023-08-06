import React from 'react'
import Mountain from '../assets/Mountain'
import Barrier from '../assets/Barrier'

const SidePannel = () => {
  return (
    <div className='bg-black w-[200px] h-[600px] bg-opacity-50'>
        <div className='flex flex-col justify-center items-center'>
            <button className='focus:outline-slate-200 focus:outline hover:outline-slate-200 hover:outline rounded-lg mt-4 p-1'>
                <Barrier />
            </button>          
        </div>
    </div>
  )
}

export default SidePannel