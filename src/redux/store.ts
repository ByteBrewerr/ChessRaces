import { configureStore } from '@reduxjs/toolkit'
import timerSlice from './slices/timer'
import boardSlice  from './slices/board'

export const store = configureStore({
  reducer: {
    timer: timerSlice,
    board: boardSlice,
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch