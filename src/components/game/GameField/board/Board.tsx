import React, { FC, useState, useEffect } from 'react';
import BoardCell from './BoardCell';
import GameEnd from '../GameEnd';
import { useDispatch, useSelector } from 'react-redux';
import { resetTimer, setIsTimerRunnig } from '../../../../redux/slices/timer';
import aStarSearch from '../../../../utils/aStarSearch';
import Position from '../../../../interfaces/Position';
import Winners from '../../../../enums/Winner.enum';
import getDefaultBoardColor from '../../../../utils/getDefaultBoardColors';
import isMountain from '../../../../utils/isMauntain';
import isBarrier from '../../../../utils/isBarrier';
import { selectPiecePosition, selectSelectedPiecePosition, selectEnemyPiecePosition, selectBarrierPostions, 
selectMountainPositions, selectPossibleMoves, restartTheGame, setWinner, setCurrentMove, setSelectedPiecePosition, selectCurrentMove, selectWinner, setPossibleMoves, setPiecePosition, setEnemyPiecePosition, selectIsBarrierSelected, addNewBarrier, setSelectedBarrier } from '../../../../redux/slices/board';
import Turn from '../../../../enums/Turn.enum';
import getRandomBestMoves from '../../../../utils/getRandomOfBestMoves';

const Board: FC = () => {
  const boardSize = 12;
  const dispatch = useDispatch();
  const piecePosition = useSelector(selectPiecePosition)
  const selectedPiecePosition = useSelector(selectSelectedPiecePosition)
  const enemyPiecePosition = useSelector(selectEnemyPiecePosition)
  const barrierPostions = useSelector(selectBarrierPostions)
  const mountainsPosition = useSelector(selectMountainPositions)
  const possibleMoves = useSelector(selectPossibleMoves)
  const winner = useSelector(selectWinner)
  const currentMove = useSelector(selectCurrentMove)
  const isBarrierSelected = useSelector(selectIsBarrierSelected)
  

  const handleNewGame = () => {
    dispatch(restartTheGame());
    dispatch(resetTimer());
  };
  
  useEffect(() => { // COMPUTER MOVEMENTS
    const timer = setTimeout(() => {
      if (currentMove === Turn.Computer && winner === Winners.Nobody) {
        const bestMove = getRandomBestMoves(enemyPiecePosition, boardSize, calculatePossibleMoves)    
        dispatch(setEnemyPiecePosition(bestMove))
        if (bestMove.row === boardSize-1) {
          dispatch(setWinner(Winners.Computer)) 
        } 
        dispatch(setIsTimerRunnig(true))
        dispatch(setCurrentMove(Turn.Player))
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [piecePosition]);

  function handleCellClick(row: number, col: number) {
    if(isBarrierSelected){
      if (isCellEmpty(row, col)){
        dispatch(addNewBarrier({row,col}))
        dispatch(setSelectedBarrier(false))
      }
      else{
        dispatch(setSelectedBarrier(false))
      }

    }else{
      if (winner === Winners.Nobody && currentMove === Turn.Player) {
        if (piecePosition.row === row && piecePosition.col === col && !selectedPiecePosition) {
          dispatch(setPossibleMoves(calculatePossibleMoves({ row, col })))
          dispatch(setSelectedPiecePosition({ row, col }))
        } else if (selectedPiecePosition) {
          if (possibleMoves.some(position => position.row === row && position.col === col)) {
            dispatch(setPiecePosition({row, col}))
            dispatch(setCurrentMove(Turn.Computer))
            dispatch(setSelectedPiecePosition(null))
            dispatch(setIsTimerRunnig(false))
            if (row === 0) {
              dispatch(setWinner(Winners.Player))
            }
          } else {
            dispatch(setSelectedPiecePosition(null))
          }
          dispatch(setPossibleMoves([]))
        }
      }    
    }
    
  }

  function calculatePossibleMoves({ row, col }: Position) {
    const moves: Position[] = [];
    if (row > 0 && isCellEmpty(row-1,col)) {
      moves.push({row: row - 1,col}); // move up
    }
    if (row < boardSize-1 && isCellEmpty(row+1, col)) {
      moves.push({row: row + 1,col}); // move down
    }
    if (col > 0 && isCellEmpty(row, col-1)) {
      moves.push({row,col:col - 1}); // move left
    }
    if (col < boardSize-1 && isCellEmpty(row, col+1)){
      moves.push({row,col:col + 1}); // move right
    }
    // if (col < boardSize-1 && row > 0 && isCellEmpty(row-1, col+1)){
      //moves.push({row:row-1,col:col + 1}); // move up-right
    //}
    //if (col > 0 && row > 0 && isCellEmpty(row-1, col-1)){
      //moves.push({row:row-1,col:col - 1}); // move up-left
    //}
    //if (col < boardSize-1 && row < boardSize-1 && isCellEmpty(row+1, col+1)){
      //moves.push({row: row+1,col:col + 1}); // move down-right
    //}
    //if (col > 0  && row < boardSize-1 && isCellEmpty(row+1, col-1)){
     // moves.push({row: row+1 ,col:col-1}); // move down-left
    //}
    return moves;

    
  };
  function isCellEmpty (row: number, col: number): boolean {
    if ((row === piecePosition.row && col === piecePosition.col) || 
    (row === enemyPiecePosition.row && col === enemyPiecePosition.col) ||
    (mountainsPosition.find(position => position.row === row && position.col === col))||
    (barrierPostions.find(position => position.row === row && position.col === col))){
      return false
    }
    else return true
  }


  
  return (
    <div className="flex flex-wrap w-[720px] h-[720px] justify-center items-center">
      {([...Array(boardSize)].map((_, row) => (
          [...Array(boardSize)].map((_, col) => {
            return (
              <BoardCell
                key={`${row}${col}`}
                row={row}
                col={col}
                color={getDefaultBoardColor(row, col)}
                isPossibleToMove={possibleMoves.some(position => position.row === row && position.col === col)}
                piecePosition={piecePosition}
                enemyPiecePosition={enemyPiecePosition}
                isMountain={isMountain(row, col, mountainsPosition)}
                isBarrier={isBarrier(row,col, barrierPostions)}
                onCellClick={handleCellClick}
              />
            );
          })
        )))}
      <GameEnd winner={winner} handleNewGame={handleNewGame} />
    </div>
  );
};

export default Board;