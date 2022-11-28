import React from 'react';
import {Link} from 'react-router-dom';
import './YouWinPage.css';

function YouWinPage(props) {
    let score = sessionStorage.getItem('sessionScore'); // Tracks and Gets the score from the previous rounds.

    const newGame = () => { //Resets all stats and moves the user to Round One.
        sessionStorage.removeItem("sessionScore");
    }
  
    return (
    <div className='YouWinPage'>
        <div className='textDiv'>
            <h1>Congratulations!!!</h1>
            <h1>YOU WIN!</h1>
            <h1>YOUR FINAL SCORE: {score}</h1>
            <div onClick={newGame} className='youWinPageNewGame'>
                <Link to={'/'} className='btn btn-success btn-outline-light m-1'>New Game</Link>
            </div>
        </div>
    </div>
  )
}

export default YouWinPage