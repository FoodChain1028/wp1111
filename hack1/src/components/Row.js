/****************************************************************************
  FileName      [ Row.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Row. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const Row = ({ guess, rowIdx }) => {
    let color = [];
    if (typeof guess !== 'undefined') {
        color = [' grey', ' grey', ' grey', ' grey', ' grey']
    }
    else {
        color = ['', '', '', '', '']
    }        
    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- Row */}
            
            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper'>
                <div id={ rowIdx + '-0'} key={rowIdx + '-0'} className={'Row-wordbox' + color[0]}>{ (typeof guess !== 'undefined') && guess[0] }</div>
                <div id={ rowIdx + '-1'} key={rowIdx + '-1'} className={'Row-wordbox' + color[1]}>{ (typeof guess !== 'undefined') && guess[1]  }</div>
                <div id={ rowIdx + '-2'} key={rowIdx + '-2'} className={'Row-wordbox' + color[2]}>{ (typeof guess !== 'undefined') && guess[2]  }</div>
                <div id={ rowIdx + '-3'} key={rowIdx + '-3'} className={'Row-wordbox' + color[3]}>{ (typeof guess !== 'undefined') && guess[3]  }</div>
                <div id={ rowIdx + '-4'} key={rowIdx + '-4'} className={'Row-wordbox' + color[4]}>{ (typeof guess !== 'undefined') && guess[4]  }</div>
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default Row;