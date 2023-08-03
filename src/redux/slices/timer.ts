import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface timerState {
    minutes: number
    seconds: number
}

const initialState: timerState = {
    minutes: 0,
    seconds: 1,
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
      },
    },
  });
  
  export const { decrementMinute, decrementSecond, setSeconds, resetTimer } = timerSlice.actions;
  
  export const selectMinutes = (state:RootState) => state.timer.minutes;
  export const selectSeconds = (state:RootState) => state.timer.seconds;
  
  export default timerSlice.reducer;
  