import React from "react";
import Position from "../interfaces/Position";

export default function isMountain(row: number, col: number, mountains: Position[]): boolean {
    return mountains.some(position => position.row === row && position.col === col)
}