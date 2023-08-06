import React from "react";
import Position from "../interfaces/Position";

export default function isBarrier(row: number, col: number, barrierPostions: Position[]): boolean {
    return barrierPostions.some(position => position.row === row && position.col === col)
}