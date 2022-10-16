# HW4 MineSweeper

## Timer
```jsx=
useEffect(() => {
if (gameOver)
    setTime(0);
else 
    setTimeout(() => setTime(time => time + 1), 1000);
}, [time, gameOver]);

useEffect(() => {
if (gameOver) {
    setSTime(time);
}
}, [gameOver]);
```

這邊是用兩個 useEffect 來避免一般 timer 在更新的時候 sTimer 也在更新，sTime 就我的理解而言是一個 stop Time ，在遊戲停止的時候需要顯示的。因此第二個 useEffect 會在 gameOver 時更新，並更新 sTime。而在重新開始遊戲的時候需要先歸零 time 在開始計時。

## reveal
這邊有實作一個 recursion 方式揭露相鄰 value === 0 的 cell，詳細可以看下面：
```jsx
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
```

## Victory
這邊用遍歷整個 board ，數 reveal 的 cell 共有幾個，如果 === boardSize ** 2 - mineNum  代表都挖完了，所以是勝利！
```jsx
let cnt = 0
for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
        if (newBoard[i][j].revealed) cnt++;
    }
}

if (cnt === boardSize ** 2 - mineNum) {
    setWin(true);
}
```