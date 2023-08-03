import React, {FC} from 'react';

interface Props{
  winner: string
  handleNewGame: ()=>void
}

const gameEnd: FC<Props> = ({winner, handleNewGame}) => {
  const winnerText = winner==='Компьютер' ? 'Компьютер победил!' : 'Вы победили!'
  
  return (
    <div className='bg-cyan-300 absolute w-[450px] h-[300px] rounded-lg border-[5px] border-black flex flex-col text-center py-6'>
      <div className='text-6xl '>
        {winnerText}
      </div>
      <div className='mt-auto'>
        <button className='text-3xl bg-yellow-500 p-4 rounded-lg hover:bg-yellow-400' onClick={()=>handleNewGame()}>
            Начать заного
        </button>
      </div> 
    </div>
  )
}

export default gameEnd;