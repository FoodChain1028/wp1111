/****************************************************************************
  FileName      [ App.js ]
  PackageName   [ src ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import React, { useState } from 'react';
import './App.css';
import MineSweeper from './containers/MineSweeper';

const App = () => {
  const [a, setA] = useState();
  const handleButton = () => {
    setA(e => console.log(e.arg[0]))
  }
  return (
    <div className='App'>
      <button onClick={() => handleButton()}>AAAAAAAAAAAA</button>
      <MineSweeper />
    </div>
  );
}

export default App;
