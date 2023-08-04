import React, {FC} from 'react';
import { useSelector } from 'react-redux';
import { selectMinutes, selectSeconds } from '../../../../redux/slices/timer';

interface Props{
  isPlayerWinner: boolean | null
  handleNewGame: ()=>void
}

const GameEnd: FC<Props> = ({isPlayerWinner, handleNewGame}) => {
  const seconds = useSelector(selectSeconds)
  const minutes = useSelector(selectMinutes)
  if (seconds === 0 && minutes ===0){
    isPlayerWinner = false
  }
  if (isPlayerWinner === null){
    return null
  }
  return (  
    <div className='bg-cyan-300 absolute w-[450px] h-[300px] rounded-lg border-[5px] border-black flex flex-col text-center py-6'>
      <div className='text-6xl '>
        {isPlayerWinner ? 'Вы победили!' : 'Компьютер победил'}
      </div>
      <div className='mt-auto'>
        <button className='text-3xl bg-blue-400 p-4 rounded-lg hover:bg-blue-500' onClick={()=>handleNewGame()}>
            Начать заного
        </button>
      </div> 
    </div>
  )
}

export default GameEnd;