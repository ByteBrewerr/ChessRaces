import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import Position from '../../interfaces/Position'
import Winners from '../../enums/Winner.enum'
import generateMountains from '../../utils/mountainsGenerator'
import Turn from '../../enums/Turn.enum'


interface boardState {
    boardSize: number
    piecePosition: Position
    selectedPiecePosition: Position | null
    enemyPiecePosition: Position
    barrierPostions: Position[]
    isBarrierSelected: boolean
    mountainPositions: Position[]
    possibleMoves: Position[]
    currentMove: Turn
    Winner: Winners
}

const initialState: boardState = {
    boardSize: 12,
    piecePosition: { row: 11, col: 6 },
    enemyPiecePosition: {row: 0, col: 5},
    selectedPiecePosition: null,
    barrierPostions: [],
    isBarrierSelected: false,
    mountainPositions: generateMountains(),
    possibleMoves: [],
    currentMove: Turn.Player,
    Winner: Winners.Nobody,
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    restartTheGame(state) {
        state.boardSize = 12
        state.piecePosition= { row: 11, col: 6 }
        state.enemyPiecePosition= {row: 0, col: 5}
        state.selectedPiecePosition= null
        state.barrierPostions=[]
        state.mountainPositions=generateMountains()
        state.possibleMoves=[]
        state.Winner= Winners.Nobody
        state.currentMove = Turn.Player
        state.isBarrierSelected = false
    },
    setPiecePosition(state, action: PayloadAction<Position>){
        state.piecePosition = action.payload
    },
    setEnemyPiecePosition(state, action: PayloadAction<Position>){
        state.enemyPiecePosition = action.payload
    },
    setWinner(state, action: PayloadAction<Winners>) {
        state.Winner = action.payload
    },  
    setCurrentMove(state, action: PayloadAction<Turn>){
        state.currentMove = action.payload
    },
    setSelectedPiecePosition(state, action: PayloadAction<Position | null>){
        state.selectedPiecePosition = action.payload
    },
    setPossibleMoves(state, action: PayloadAction<Position[]>){
        state.possibleMoves = action.payload
    },
    setSelectedBarrier(state, action: PayloadAction<boolean>){
        state.isBarrierSelected = action.payload
    },
    addNewBarrier(state, action: PayloadAction<Position>){
        state.barrierPostions.push(action.payload)
    }
  },
});
  
export const { restartTheGame, setWinner, setCurrentMove, setSelectedPiecePosition,
     setPossibleMoves, setPiecePosition, setEnemyPiecePosition, setSelectedBarrier, addNewBarrier} = boardSlice.actions;

export const selectEnemyPiecePosition = (state:RootState) => state.board.enemyPiecePosition;
export const selectPiecePosition = (state:RootState) => state.board.piecePosition;
export const selectBoardSize = (state:RootState) => state.board.boardSize;
export const selectSelectedPiecePosition = (state:RootState) => state.board.selectedPiecePosition;
export const selectBarrierPostions = (state:RootState) => state.board.barrierPostions;
export const selectMountainPositions = (state:RootState) => state.board.mountainPositions;
export const selectPossibleMoves = (state:RootState) => state.board.possibleMoves;
export const selectWinner = (state:RootState) => state.board.Winner;
export const selectCurrentMove = (state:RootState) => state.board.currentMove;
export const selectIsBarrierSelected = (state:RootState) => state.board.isBarrierSelected;

export default boardSlice.reducer;
  