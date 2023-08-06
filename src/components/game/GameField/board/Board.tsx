import React, { FC, useState, useEffect } from 'react';
import BoardCell from './BoardCell';
import GameEnd from '../gameEnd/GameEnd';
import { useDispatch, } from 'react-redux';
import { resetTimer, setIsTimerRunnig } from '../../../../redux/slices/timer';
import aStarSearch from '../../../../utils/aStarSearch';
import Position from '../../../../interfaces/Position';



interface Props {
  mountains: Position[];
}

const Board: FC<Props> = ({mountains}) => {
  const boardSize = 12;
  const dispatch = useDispatch();
  const [piecePosition, setPiecePosition] = useState<Position>({ row: 11, col: boardSize/2 });
  const [selectedPiecePosition, setSelectedPiecePosition] = useState<Position | null>(null);
  const [enemyPiecePosition, setEnemyPiecePosition] = useState<Position>({ row: 0, col: boardSize/2 - 1 });
  const [possibleMoves, setPossibleMoves] = useState<Position[]>([]);
  const [isPlayerWinner, setIsPlayerWinner] = useState<boolean | null>(null);
  const [isPlyerMove, setIsPlayerMove] = useState<boolean>(true);
  

  const handleNewGame = () => {
    setPiecePosition({ row: boardSize-1, col: boardSize/2 });
    setSelectedPiecePosition(null);
    setEnemyPiecePosition({ row: 0, col: boardSize/2-1 });
    setPossibleMoves([]);
    setIsPlayerMove(true);
    dispatch(resetTimer());
    setIsPlayerWinner(null);
  };
  
  useEffect(() => { // COMPUTER MOVEMENTS
    const timer = setTimeout(() => {
      if (!isPlyerMove && isPlayerWinner === null) {
        setEnemyPiecePosition((position) => {
          const move = aStarSearch(position, { row: 11, col: 1 }, calculatePossibleMoves)[1]
          if (move.row === boardSize-1) setIsPlayerWinner(false)
          return move;
        });
        dispatch(setIsTimerRunnig(true));
        setIsPlayerMove(true);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [piecePosition]);

  function handleCellClick(row: number, col: number) {
    if (isPlayerWinner === null && isPlyerMove) {
      if (piecePosition.row === row && piecePosition.col === col && !selectedPiecePosition) {
        setPossibleMoves(calculatePossibleMoves({ row, col }));
        setSelectedPiecePosition({ row, col });
      } else if (selectedPiecePosition) {
        if (possibleMoves.some(position => position.row === row && position.col === col)) {
          setPiecePosition({ row, col });
          setIsPlayerMove(false);
          setSelectedPiecePosition(null);
          dispatch(setIsTimerRunnig(false));
          if (row === 0) {
            setIsPlayerWinner(true);
          }
        } else {
          setSelectedPiecePosition(null);
        }
        setPossibleMoves([]);
      }
    }
  }


  function calculatePossibleMoves({ row, col }: Position) {
    function isCellEmpty (row: number, col: number): boolean {
      if ((row === piecePosition.row && col === piecePosition.col) || 
      (row === enemyPiecePosition.row && col === enemyPiecePosition.col) ||
      (mountains.find(position => position.row === row && position.col === col))){
        return false
      }
      else return true
    }

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
    if (col < boardSize-1 && row > 0 && isCellEmpty(row-1, col+1)){
      moves.push({row:row-1,col:col + 1}); // move up-right
    }
    if (col > 0 && row > 0 && isCellEmpty(row-1, col-1)){
      moves.push({row:row-1,col:col - 1}); // move up-left
    }
    if (col < boardSize-1 && row < boardSize-1 && isCellEmpty(row+1, col+1)){
      moves.push({row: row+1,col:col + 1}); // move down-right
    }
    if (col > 0  && row < boardSize-1 && isCellEmpty(row+1, col-1)){
      moves.push({row: row+1 ,col:col-1}); // move down-left
    }
    console.log(moves)
    return moves;
  };


  function getDefaultBoardColor(row: number, col: number): string {
    if ((row % 2 !== 0 && col % 2 === 0) || (row % 2 === 0 && col % 2 !== 0)) {
      return 'bg-green-500';
    } else {
      return 'bg-white';
    }
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
                mountainPositions={mountains}
                onCellClick={handleCellClick}
              />
            );
          })
        )))}
      <GameEnd isPlayerWinner={isPlayerWinner} handleNewGame={handleNewGame} />
    </div>
  );
};

export default Board;