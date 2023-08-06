import React from "react";

export default function getDefaultBoardColor(row: number, col: number): string {
    if ((row % 2 !== 0 && col % 2 === 0) || (row % 2 === 0 && col % 2 !== 0)) {
      return 'bg-green-500';
    } else {
      return 'bg-white';
    }
}