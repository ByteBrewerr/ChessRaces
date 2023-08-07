import React from 'react'
import Mountain from '../assets/Mountain'
import Barrier from '../assets/Barrier'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsBarrierSelected, setSelectedBarrier } from '../../../redux/slices/board'

const SidePannel = () => {
  const dispatch = useDispatch()
  const isBarrierSelected = useSelector(selectIsBarrierSelected)
  return (
    <div className='bg-black w-[200px] h-[600px] bg-opacity-50'>
        <div className='flex flex-col justify-center items-center'>
            <button 
              className={`${isBarrierSelected ? 'outline outline-slate-200' : ''} hover:outline-slate-200 hover:outline rounded-lg mt-4 p-1`}
              onClick={()=>dispatch(setSelectedBarrier(true))}>
                <Barrier />
            </button>          
        </div>
    </div>
  )
}

export default SidePannel