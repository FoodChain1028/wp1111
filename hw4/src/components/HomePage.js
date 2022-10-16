/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/HomePage.css';
import React, { useState, useEffect } from 'react';

const HomePage = ({ startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize /* -- something more... -- */ }) => {
  const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.
  const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.

  useEffect(() => {
    if (!error) {
      if (boardSize ** 2 <= mineNum)
        setError(true);  
    }
    else {
      if (boardSize ** 2 > mineNum) 
        setError(false);
    }
  }, [mineNum, boardSize])
  const handlePanel = () => {
    if (showPanel) {
      setShowPanel(false);
    }
    else {
      setShowPanel(true);
    }
  }


  return (
    <div className='HomeWrapper'>
      <p className='title'>MineSweeper</p>
        { 
          <button className='btn' onClick={() => startGameOnClick()}> Start Game </button> }
        {
          <div className="controlContainer">
            <button className="btn" onClick={() => handlePanel()}>Diffculty Adjustment</button>
            { 
              showPanel && 
                <div className="controlWrapper">
                { error && <div className="error" >ERROR: Mines number and board size are invalid!</div> }
                  <div className="controlPane">
                    <div className="controlCol">
                      <p className="controlTitle">Mine Number</p>
                      <input type="range" min='1' max='100' defaultValue='10' onChange={ (e) => mineNumOnChange(e.target.value) }/>
                      <p className="controlNum">{ mineNum }</p>
                    </div>
                    <div className="controlCol">
                      <p className="controlTitle">Board Size (nxn)</p>
                      <input type="range" min='1' max='50' defaultValue='8' onChange={(e) => boardSizeOnChange(e.target.value)} />
                      <p className="controlNum">{ boardSize }</p>
                    </div>
                  </div>
              </div>
            }
            
          </div>          
        }

    </div>
  );

}
export default HomePage;   