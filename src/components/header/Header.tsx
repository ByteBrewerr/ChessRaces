import React, {FC} from 'react'


const Header: FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-transparent sticky">
      <div className="mr-4">
        <h1 className="text-white text-lg cursor-pointer">Chess Races</h1>
      </div>
      <div>
        <button className="px-4 py-2 mr-2 text-white bg-transparent rounded-md hover:bg-gray-100 hover:text-gray-900 text-lg">
          Login
        </button>
        <button className="px-4 py-2 mr-2 text-white bg-transparent rounded-md hover:bg-gray-100 hover:text-gray-900 text-lg">
          SignUp
        </button>
        <button className="px-4 py-2 mr-2 text-white bg-transparent rounded-md hover:bg-gray-100 hover:text-gray-900 text-lg ">
          Stats
        </button>
      </div>
    </header>
  )
}

export default Header