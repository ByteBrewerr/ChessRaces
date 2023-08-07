import React from "react";
import Position from "../interfaces/Position";

interface Node {
  position: Position;
  g: number;
  h: number;
  f: number;
  parent: Node | null;
}

export default function aStarSearch(start: Position, end: Position, calculatePossibleMoves: (position: Position) => Position[]) {
    function calculateHeuristic(start: Position, end: Position): number {
      return Math.abs(end.row - start.row) + Math.abs(end.col - start.col);
    }
    const openList: Node[] = [];
    const closedList: Node[] = [];
  
    const startNode: Node = {
      position: start,
      g: 0, // actual cost from begining to end
      h: calculateHeuristic(start, end), // Heuristic
      f: calculateHeuristic(start, end), // cost = g + h
      parent: null,
    };
  
    openList.push(startNode);
  
    while (openList.length > 0) {
      let currentNode: Node = openList[0];
      let currentIndex: number = 0;
  
      for (let i = 0; i < openList.length; i++) {
        if (openList[i].f < currentNode.f) {
          currentNode = openList[i];
          currentIndex = i;
        }
      }
  
      openList.splice(currentIndex, 1);
      closedList.push(currentNode);
  
      if (currentNode.position.row === end.row) {
        let path: Position[] = [];
        let current: Node | null = currentNode;
        while (current !== null) {
          path.push(current.position);
          current = current.parent;
        }
        return path.reverse();
      }
  
      const neighbors: Position[] = calculatePossibleMoves(currentNode.position);
      for (const neighbor of neighbors) {
        
        const neighborNode: Node = {
          position: neighbor,
          g: currentNode.g + 1,
          h: calculateHeuristic(neighbor, end),
          f: currentNode.g + 1 + calculateHeuristic(neighbor, end),
          parent: currentNode,
        };
  
        let isInClosedList: boolean = false;
        for (const node of closedList) {
          if (node.position.row === neighborNode.position.row && node.position.col === neighborNode.position.col) {
            isInClosedList = true;
            break;
          }
        }
  
        if (isInClosedList) {
          continue;
        }
  
        let isInOpenList: boolean = false;
        for (const node of openList) {
          if (node.position.row === neighborNode.position.row && node.position.col === neighborNode.position.col && node.g < neighborNode.g) {
            isInOpenList = true;
            break;
          }
        }
  
        if (!isInOpenList) {
          openList.push(neighborNode);
        }
      }
    }
  
    return [start, start];
  }