import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface timerState {
  minutes: number
  seconds: number
  isTimerRunning: boolean
}

const initialState: timerState = {
  minutes: 10,
  seconds: 0,
  isTimerRunning: false,
}

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    decrementMinute: (state) => {
      state.minutes-=1;
    },
    decrementSecond: (state) => {
      state.seconds-=1;
    },
    setSeconds(state, action: PayloadAction<number>) {
      state.seconds = action.payload + 1;
    },
    resetTimer: (state) => {
      state.minutes = 10;
      state.seconds = 0;
      state.isTimerRunning = false
    },
    setIsTimerRunnig:(state, action: PayloadAction<boolean>)=>{
      state.isTimerRunning = action.payload
    }
  },
});
  
export const { decrementMinute, decrementSecond, setSeconds, resetTimer, setIsTimerRunnig } = timerSlice.actions;

export const selectMinutes = (state:RootState) => state.timer.minutes;
export const selectSeconds = (state:RootState) => state.timer.seconds;
export const selectIsTimerRunning = (state:RootState) => state.timer.isTimerRunning;

export default timerSlice.reducer;
  