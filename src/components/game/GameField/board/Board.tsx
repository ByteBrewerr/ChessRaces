import React, { FC, useState, useEffect } from 'react';
import BoardCell from './BoardCell';
import GameEnd from '../gameEnd/GameEnd';
import { useDispatch, useSelector } from 'react-redux';
import { resetTimer, selectMinutes, setIsTimerRunnig } from '../../../../redux/slices/timer';

interface Position {
  row: number;
  col: number;
}


const Board: FC = () => {
  const boardSize = 8;
  const dispatch = useDispatch()

  const [piecePosition, setPiecePosition] = useState<Position>({ row: 7, col: 4 });
  const [selectedPiecePosition, setSelectedPiecePosition] = useState<Position | null>(null);
  const [enemyPiecePosition, setEnemyPiecePosition] = useState<Position>({ row: 0, col: 3 });
  const [possibleMoves, setPossibleMoves] = useState<string[]>([]);
  const [isPlayerWinner, setIsPlayerWinner] = useState<boolean | null>(null);
  const [isPlyerMove, setIsPlayerMove] = useState<boolean>(true)

  const handleNewGame = () => {
    setPiecePosition({ row: 7, col: 4 });
    setSelectedPiecePosition(null);
    setEnemyPiecePosition({ row: 0, col: 3 });
    setPossibleMoves([]);
    setIsPlayerMove(true);
    dispatch(resetTimer())
    setIsPlayerWinner(null);
  };
  useEffect(() => { // COMPUTER MOVEMENT
    const timer = setTimeout(() => {
      if (!isPlyerMove && isPlayerWinner === null) {
        setEnemyPiecePosition((position) => {
          const move = getComputerMove(position);
          if(move.row === 7) setIsPlayerWinner(false) // isPlayerWinner
          return move
        });
        dispatch(setIsTimerRunnig(true))
        setIsPlayerMove(true)
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [piecePosition]); 

  const handleCellClick = (row: number, col: number) => {
    if (isPlayerWinner===null && isPlyerMove) {
      if (piecePosition.row === row && piecePosition.col === col && !selectedPiecePosition) {
        setPossibleMoves(calculatePossibleMoves({ row, col }));
        setSelectedPiecePosition({ row, col });
      } else if (selectedPiecePosition) {   
        if (calculatePossibleMoves(selectedPiecePosition).includes(`${row}${col}`)) {
          setPiecePosition({ row, col });
          setIsPlayerMove(false)
          setSelectedPiecePosition(null);
          dispatch(setIsTimerRunnig(false))
          if (row === 0) {
            setIsPlayerWinner(true);
          }
        }
        else setSelectedPiecePosition(null);
        setPossibleMoves([]);
      }
    }
  };

  const getComputerMove = ({ row, col }: Position) => {
    const moves = calculatePossibleMoves({ row, col }, true);
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    const rowMove = parseInt(randomMove[0]);
    const colMove = parseInt(randomMove[1]);
    
    return { row: rowMove, col: colMove };
  };

  const calculatePossibleMoves = ({ row, col }: Position, isEnemyMove = false) => {
    const moves: string[] = [];
    if (!isEnemyMove) {
      if (row > 0 && !(enemyPiecePosition.row === row - 1 && enemyPiecePosition.col === col)) {
        moves.push(`${row - 1}${col}`); // move up
      }
    } else {
      if (row < 7 && !(piecePosition.row === row + 1 && piecePosition.col === col)) {
        moves.push(`${row + 1}${col}`); // move down
      }
    }

    if (col > 0 && !(piecePosition.row === row && piecePosition.col === col - 1) && !(enemyPiecePosition.row === row && enemyPiecePosition.col === col - 1)) {
      moves.push(`${row}${col - 1}`); // move left
    }

    if (col < 7 && !(piecePosition.row === row && piecePosition.col === col + 1) && !(enemyPiecePosition.row === row && enemyPiecePosition.col === col + 1)) {
      moves.push(`${row}${col + 1}`); // move right
    }
    return moves;
  };

  const getDefaultBoardColor = (row: number, col: number): string => {
    if ((row % 2 !== 0 && col % 2 === 0) || (row % 2 === 0 && col % 2 !== 0)) {
      return 'bg-green-500';
    } else return 'bg-white';
  };

  return (
      <div className="flex flex-wrap w-[600px] h-[600px] justify-center items-center">
        {[...Array(boardSize)].map((_, row) => (
          [...Array(boardSize)].map((_, col) => {
            return (
              <BoardCell
                key={`${row}${col}`}
                row={row}
                col={col}
                color={getDefaultBoardColor(row, col)}
                isPossibleToMove={possibleMoves.includes(`${row}${col}`)}
                piecePosition={piecePosition}
                enemyPiecePosition={enemyPiecePosition}
                selectedPiecePosition={selectedPiecePosition}
                onCellClick={handleCellClick}
              />
            );
          })
        ))}
        <GameEnd isPlayerWinner={isPlayerWinner} handleNewGame={handleNewGame} />
      </div>
  );
};

export default Board;