import React, { FC, useState, useEffect } from 'react';
import BoardCell from './BoardCell';
import GameEnd from '../game/gameEnd/GameEnd'

interface Position {
  row: number;
  col: number;
};

const Board: FC = () => {
  const boardSize = 8
  const [piecePosition, setPiecePosition] = useState<Position>({ row: 1, col: 4 }); 
  const [selectedPiecePosition, setSelectedPiecePosition] = useState<Position | null>(null);
  const [enemyPiecePosition, setEnemyPiecePosition] = useState<Position>({ row: 6, col: 3 });
  const [possibleMoves, setPossibleMoves] = useState<string[]>([]);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [winner, setWinner] = useState<string>('');

  const handleNewGame = ()=>{
    setPiecePosition({ row: 1, col: 4 })
    setSelectedPiecePosition(null)
    setEnemyPiecePosition({ row: 6, col: 3 })
    setPossibleMoves([])
    setIsGameStarted(false)
    setWinner('')
  }

  useEffect(() => {
    if(isGameStarted && !winner){
      setEnemyPiecePosition((position) => {
        return getComputerMove(position);
      });
    }
  }, [piecePosition]); 

  const handleCellClick = (row: number, col: number) => {
    setIsGameStarted(true)
    if(!winner){
      if (piecePosition.row === row && piecePosition.col === col && !selectedPiecePosition) { // click on piece
        setPossibleMoves(calculatePossibleMoves({row, col}))
        setSelectedPiecePosition({ row, col });
      } else if (selectedPiecePosition) {
        if (selectedPiecePosition.row === row && selectedPiecePosition.col === col) { // click on selected piece
          setSelectedPiecePosition(null);
        } else if (calculatePossibleMoves(selectedPiecePosition).includes(`${row}${col}`)) { // click on possible move while selected
          setPiecePosition({ row, col });
          setSelectedPiecePosition(null);
          if(row===0){
            setWinner('Вы') // winner
          }
        }
        setPossibleMoves([])
      }
    } 
  };

  const getComputerMove = ({ row, col }: Position) => {
    const moves = calculatePossibleMoves({ row, col }, true)
    const randomMove = moves[Math.floor(Math.random() * moves.length)]
    const rowMove = parseInt(randomMove[0])
    const colMove = parseInt(randomMove[1])
    if (rowMove === 7){
      setWinner('Компьютер')
    }
    return { row: rowMove, col: colMove }
  }

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
      moves.push(`${row}${col - 1}`); //move left
    }

    if (col < 7 && !(piecePosition.row === row && piecePosition.col === col + 1) && !(enemyPiecePosition.row === row && enemyPiecePosition.col === col + 1)) {
      moves.push(`${row}${col + 1}`); // move right
    }
    return moves;
  };

  const getDefaultBoardColor = (row: number, col: number): string => {
    if ((row % 2 !== 0 && col % 2 === 0) || (row % 2 === 0 && col % 2 !== 0)) {
      return "bg-green-500"
    }
    else return "bg-white"
  };

  console.log(possibleMoves)
  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
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
        {winner && <GameEnd winner={winner} handleNewGame={handleNewGame}/>}
      </div>
    </div>
  );
};

export default Board;