import React from "react";
import Position from "../interfaces/Position";

const generateMountains = () => {
    const minMountains = 14;
    const maxMountains = 20;

    const numMountains = Math.floor(Math.random() * (maxMountains - minMountains + 1)) + minMountains;
    const mountains: Position[] = [];

    while (mountains.length < numMountains) {
      const row = Math.floor(Math.random() * 10) + 1;
      const col = Math.floor(Math.random() * 12);

      if (row !== 0 && row !== 11 && col !== 0 && col !== 11) {
        const isDuplicated = mountains.some(mountain => mountain.row === row && mountain.col === col);
        if (!isDuplicated) {
          mountains.push({ row, col });
        }
      }
    }

    return mountains;
};
export default generateMountains
