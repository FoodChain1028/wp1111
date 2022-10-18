/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import Row from "./Row";
import './css/Board.css';
import React from "react";
import CurRow from "./CurRow";

const Board = ({ turn, guesses, curGuess }) => {
    return (
        <div className="Board-container">
            {/* TODO 2-2: show 6 rows (map function is recommended) and defined row's key.
                Hint: Use `CurRow` instead of `Row` when you are passing `curGuess` into it. */
                guesses.map((guess, id) => {
                    // console.log(guess);
                    return (
                        (id === turn) ?
                        <CurRow id={'row' + id} key={'row' + id} curGuess={curGuess} rowIdx={id} /> :
                        <Row id={'row' + id} key={'row' + id} guess={guess} rowIdx={id}/>
                    );
                })
            }
            
        </div>
    )
};
export default Board;
