/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

export const revealed = (board, x, y) => {
    const max = board.length - 1;

    const checkAdjacentValue = (board, x, y) => {
      for (let i = x-1; i <= x+1; i++){
        if (i < 0 || i > max) {
          continue;
        }
        for (let j = y-1; j <= y+1; j++){
          if (j < 0 || j > max) {
            continue;
          }
          if (!board[i][j].revealed && board[i][j].value === 0) {
            board[i][j].revealed = true;
            checkAdjacentValue(board, i, j);
          }
        }
      }
    }

    if (board[x][y].value !== 0) {
      board[x][y].revealed = true;
    }
    else {
      checkAdjacentValue(board, x, y);
    }

    return { board};
};
