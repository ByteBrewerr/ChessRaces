import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrementMinute, decrementSecond, selectMinutes, selectSeconds, resetTimer, setSeconds, selectIsTimerRunning } from '../../../redux/slices/timer';

const Timer: FC = () => {
  const minutes = useSelector(selectMinutes);
  const seconds = useSelector(selectSeconds);
  const isTimerRunning = useSelector(selectIsTimerRunning)
  const dispatch = useDispatch();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const startTimer = () => {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            return
          } 
          else {
            dispatch(decrementMinute());
            dispatch(setSeconds(59));
          }
        }
        dispatch(decrementSecond());
      }, 1000);
    };
    if (isTimerRunning){
      startTimer();
    };

    return () => {
      clearInterval(interval);
    };
  }, [seconds, minutes, isTimerRunning]);

  return (
    <div className="bg-white p-2 rounded font-bold text-3xl inline-block">
      {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
    </div>
  );
};

export default Timer;
