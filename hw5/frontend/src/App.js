import { useState } from 'react';
import { startGame, guess, restart } from './axios';
import './App.css'

function App() {
  const [hasStarted, setHasStarted] = useState(false) 
  const [hasWon, setHasWon] = useState(false)
  const [serverIsNotWorking, setServerIsNotWorking] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')
  
  const handleGuess = async () => {
    const response = await guess(number)

    if (response === 'Equal') setHasWon(true)
    else {
      setStatus(response)
      setNumber('')
    }
  }
  const notWokingPage =
  <div>
    <h2> The Server is not running! Please start your server & refresh! </h2>
  </div>
  
  const startMode = 
    <div className="start-menu">
        <button onClick={async() => {
            let isServerOn = await startGame();
            if (isServerOn !== false) setHasStarted(true);
            else setServerIsNotWorking(true);   
        }}> start game </button>
    </div>

  const gameMode = 
    <>
      <h2>Guess a number between 1 to 100</h2>
      <input type='text' onChange={(e) => {setNumber(e.target.value)}}></input>
      <button  // Send number to backend
        onClick={ () => handleGuess()}
        disabled={!number} > guess! </button> 
      <p>{ status }</p>
    </>

  const winningMode = 
    <>
      <h2>You won! the number was {number}.</h2>
      <button  onClick={() => {
        restart();
        setHasWon(false);
        setStatus('');
      }}
      >restart</button>
    </>

  const game = 
    <div>
      { hasWon ? winningMode : gameMode }
    </div>

  return (
    <div className="App">
      { serverIsNotWorking && notWokingPage }
      { !serverIsNotWorking && (hasStarted ? game : startMode) }
    </div>
  );
}

export default App;
