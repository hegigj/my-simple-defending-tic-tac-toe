import { Injectable } from '@angular/core';

@Injectable()
export class BusinessLogicService {
  indexes: number[];
  winningLine: (number[])[];
  blockLine: (number[])[];

  constructor() {
    this.indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    this.winningLine = [
      [0, 4, 8], [2, 4, 6], [0, 3, 6],
      [1, 4, 7], [2, 5, 8], [0, 1, 2],
      [3, 4, 5], [6, 7, 8]
    ];
    this.blockLine = [
      [1, 3, 4], [0, 2, 3, 4, 5], [1, 4, 5],
      [0, 1, 4, 6, 7], [0, 1, 2, 3, 5, 6, 7, 8], [1, 2, 4, 7, 8],
      [3, 4, 7], [3, 4, 5, 6, 8], [4, 5, 7]
    ];
  }

  didSomeOneWin(array) {
    let counter = 0;
    let isEqual = false;
    if (array.length >= 3) {
      this.winningLine.forEach((winLine) => {
        winLine.forEach((win, i) => {
          array.forEach((arr) => {
            if (win === arr) {
              counter++;
            }
          });
          if (i === 2) {
            if (counter === 3) {
              counter = 0;
              isEqual = true;
            } else {
              counter = 0;
            }
          }
        });
      });
    }
    return isEqual;
  }

  pcSecondMove(index, prevPcIndex, prevUserIndex) {
    if (prevPcIndex.length === 0) {
      const blockIndex = Math.floor((Math.random() * (this.blockLine[index].length)));
      console.log('Defending move: ', this.blockLine[index][blockIndex]);
      return this.blockLine[index][blockIndex];
    } else {
      return this.defendingPosition(prevUserIndex, prevPcIndex);
    }
  }

  private defendingPosition(prevUserIndex, prevPcIndex) {
    let pcMove;
    const dangerousMove = [];
    let mostDangerousMove;
    let mostDangerousMovePosition;
    let mostDangerousMoveThread = 3;
    const totalIndex = prevUserIndex.concat(prevPcIndex);

    this.winningLine.forEach((winLine) => {
      dangerousMove.push(winLine.filter(x => prevUserIndex.indexOf(x) === -1));
    });
    dangerousMove.forEach((danger, i) => {
      if (danger.length < mostDangerousMoveThread) {
        mostDangerousMoveThread = danger.length;
        mostDangerousMovePosition = i;
        mostDangerousMove = danger;
      }
    });
    if (mostDangerousMoveThread === 1) {
      if (totalIndex.indexOf(mostDangerousMove[0]) !== -1) {
        pcMove = this.indexes.filter(x => totalIndex.indexOf(x) === -1);
        pcMove = pcMove[Math.floor(Math.random() * (pcMove.length))];
      } else {
        pcMove = mostDangerousMove[0];
      }
    } else {
      mostDangerousMove = mostDangerousMove.filter(x => totalIndex.indexOf(x) === -1);
      pcMove = mostDangerousMove[Math.floor(Math.random() * (dangerousMove[mostDangerousMovePosition].length))];
    }
    console.log('Defending move: ', pcMove);
    return pcMove;
  }
}
