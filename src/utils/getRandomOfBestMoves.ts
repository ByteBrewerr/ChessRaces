import Position from "../interfaces/Position";
import aStarSearch from "./aStarSearch";

function getRandomBestMoves(enemyPiecePosition: Position, boardSize: number, calculatePossibleMoves: (position: Position) => Position[]) {

    let minLength = Infinity;
    let bestMoveLines:Position[][] = []

    const possibleMoves = calculatePossibleMoves(enemyPiecePosition);

    for (let move of possibleMoves) {
        let bestMoveLineOfPossibleMove:Position[] = [];
        for(let i=0; i<boardSize-1; i++){
            const moveLine = aStarSearch(move, { row: boardSize - 1, col: i }, calculatePossibleMoves);
        
            if (moveLine.length < minLength) {
                bestMoveLineOfPossibleMove = moveLine;
                minLength = moveLine.length;
            } 
        }
        minLength = Infinity
        bestMoveLines.push(bestMoveLineOfPossibleMove)
    }

    const minLengthOfBestMoves = Math.min(...bestMoveLines.map(moveLine => moveLine.length));
    const filteredBestMoves = bestMoveLines.filter(moveLine => moveLine.length === minLengthOfBestMoves);
    console.log(filteredBestMoves)
    if (filteredBestMoves.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredBestMoves.length);
        return filteredBestMoves[randomIndex][0];
    }
    
    return filteredBestMoves[0][0];
}

export default getRandomBestMoves;