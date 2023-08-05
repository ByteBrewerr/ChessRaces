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
  const boardSize = 12;
  const dispatch = useDispatch();

  const [piecePosition, setPiecePosition] = useState<Position>({ row: boardSize-1, col: boardSize/2 });
  const [selectedPiecePosition, setSelectedPiecePosition] = useState<Position | null>(null);
  const [enemyPiecePosition, setEnemyPiecePosition] = useState<Position>({ row: 0, col: boardSize/2-1 });
  const [mountainPositions, setMountainPositions] = useState<Position[]>([{ row: 3, col: 4 }, { row: 7, col: 2 }]);
  const [possibleMoves, setPossibleMoves] = useState<string[]>([]);
  const [isPlayerWinner, setIsPlayerWinner] = useState<boolean | null>(null);
  const [isPlyerMove, setIsPlayerMove] = useState<boolean>(true);

  const [board, setBoard] = useState<JSX.Element[][]>([...Array(boardSize)].map((_, row) => (
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
          mountainPositions={mountainPositions}
          isEmpty={isCellEmpty(row, col)}
          onCellClick={handleCellClick}
        />
      );
    })
  )));

  const handleNewGame = () => {
    setPiecePosition({ row: boardSize-1, col: boardSize/2 });
    setSelectedPiecePosition(null);
    setEnemyPiecePosition({ row: 0, col: boardSize/2-1 });
    setPossibleMoves([]);
    setIsPlayerMove(true);
    dispatch(resetTimer());
    setIsPlayerWinner(null);
  };
  useEffect(() => {
    const updatedBoard = 
    [...Array(boardSize)].map((_, row) => (
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
            mountainPositions={mountainPositions}
            isEmpty={isCellEmpty(row, col)}
            onCellClick={handleCellClick}
          />
        );
      })
    ));
    setBoard(updatedBoard);
  }, [piecePosition, selectedPiecePosition, enemyPiecePosition, possibleMoves]);

  useEffect(() => { // COMPUTER MOVEMENT
    const timer = setTimeout(() => {
      if (!isPlyerMove && isPlayerWinner === null) {
        setEnemyPiecePosition((position) => {
          const computerMove = getComputerMove(position);
          if (computerMove.row === boardSize-1) setIsPlayerWinner(false);
          return computerMove;
        });
        dispatch(setIsTimerRunnig(true));
        setIsPlayerMove(true);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [piecePosition]);

  function handleCellClick(row: number, col: number) {
    if (isPlayerWinner === null && isPlyerMove) {
      if (piecePosition.row === row && piecePosition.col === col && !selectedPiecePosition) {
        setPossibleMoves(calculatePossibleMoves({ row, col }));
        setSelectedPiecePosition({ row, col });
      } else if (selectedPiecePosition) {
        if (calculatePossibleMoves(selectedPiecePosition).includes(`${row}${col}`)) {
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

  function isCellEmpty (row: number, col: number): boolean {
    if ((row === piecePosition.row && col === piecePosition.col) || 
    (row === enemyPiecePosition.row && col === enemyPiecePosition.col) ||
    (mountainPositions.find(position => position.row === row && position.col === col))){
      return false
    }
    else return true
  }

  function getDefaultBoardColor(row: number, col: number): string {
    if ((row % 2 !== 0 && col % 2 === 0) || (row % 2 === 0 && col % 2 !== 0)) {
      return 'bg-green-500';
    } else {
      return 'bg-white';
    }
  }
  
  return (
    <div className="flex flex-wrap w-[720px] h-[720px] justify-center items-center">
      {board}
      <GameEnd isPlayerWinner={isPlayerWinner} handleNewGame={handleNewGame} />
    </div>
  );
};

export default Board;