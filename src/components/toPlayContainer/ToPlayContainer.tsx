import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/mainPageBackGround.jpg'

const ToPlayContainer: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
      <div
        className="bg-gray-200 p-4 rounded-lg shadow-md bg-center bg-cover mb-20 h-[500px] w-[500px] flex flex-col items-center justify-end"
        style={{ backgroundImage: `url(${img})` }}
      >
        <Link
          className="bg-yellow-500 text-white font-bold py-5 px-5 text-5xl transition-colors duration-500 ease-in-out hover:text-black rounded-lg"
          to="/play"
        >
          Играть
        </Link>
      </div>
    </div>
  );
};

export default ToPlayContainer;