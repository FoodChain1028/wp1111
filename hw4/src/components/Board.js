/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/Board.css'
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import { revealed } from '../util/reveal';
import createBoard from '../util/createBoard';
import React, { useEffect, useState } from 'react';

const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(0);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(0);      // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.

    useEffect(() => {
        if (board.length === 0)
            freshBoard();
    }, [board, win, gameOver, nonMineCount]);

    // Creating a board
    const freshBoard = () => {
        const newBoard = createBoard(boardSize, mineNum);
        const newFlagNum = mineNum;
        const newNonMinesCount = boardSize ** 2 - mineNum;
        setBoard(newBoard.board);
        setRemainFlagNum(newFlagNum);
        setNonMineCount(newNonMinesCount);
        setMineLocations(newBoard.mineLocations);
    }

    const restartGame = () => {
        freshBoard();
        setGameOver(false);
        setWin(false);
    }

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // To not have a dropdown on right click
        e.preventDefault();
        
        // Deep copy of a state
        let newBoard = JSON.parse(JSON.stringify(board));
        let newFlagNum = remainFlagNum;
        let newNonMinesCount = nonMineCount;
        if (!newBoard[x][y].revealed) {
            if (newFlagNum > 0){
                if(!newBoard[x][y].flagged) {
                    newBoard[x][y].flagged = true;
                    newFlagNum -= 1;
                }
                else {
                    newBoard[x][y].flagged = false;
                    newFlagNum += 1;
                }    
            }
            else {
                if(newBoard[x][y].flagged){
                    newBoard[x][y].flagged = false;
                    newFlagNum += 1;
                }
            }
        }
        setBoard(newBoard);
        setRemainFlagNum(newFlagNum);
    };

    const revealCell = (x, y) => {

        if (board[x][y].revealed || gameOver || board[x][y].flagged) return;

        let newBoard = JSON.parse(JSON.stringify(board));
        let newNonMinesCount = nonMineCount;

        if (newBoard[x][y].value === '💣'){
            revealBomb(newBoard);
        }
        else {
            revealed(newBoard, x, y, newNonMinesCount);
        }

        setBoard(newBoard) 
        isWin(newBoard);
    };

    const revealBomb = (newBoard) => {
        let newNonMinesCount = 0
        const newMineLocations = mineLocations;
        for (let i = 0; i < mineNum; i++) {
            revealed(newBoard, newMineLocations[i][0], newMineLocations[i][1], newNonMinesCount);
        }
        setBoard(newBoard);
        setGameOver(true);
    }

    const isWin = (newBoard) => {
        let cnt = 0
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (newBoard[i][j].revealed) cnt++;
            }
        }

        if (cnt === boardSize ** 2 - mineNum) {
            setWin(true);
        }
    }

    return (
        <div className='boardPage' >
            <div className='boardWrapper' >
                {
                    ( gameOver || win )&&
                    < Modal  
                        restartGame={restartGame}
                        backToHome={backToHome} 
                        win={win}
                    />
                }
                <div className="boardContainer">
                    <Dashboard remainFlagNum={remainFlagNum} gameOver={gameOver} />
                    {
                        board.map((e, key) => {
                            return (
                                <div key={key} id={'row'+key} style={{display: 'flex'}}>
                                {e.map((t, index) => {
                                    return (
                                        <Cell 
                                            key={index}
                                            rowIdx={t.x} colIdx={t.y}
                                            detail={t} 
                                            updateFlag={updateFlag}
                                            revealCell={revealCell}
                                        />
                                    )
                                })}
                                </div>
                            )
                        })   
                    }
                </div>
            </div>
        </div>
    );



}

export default Board