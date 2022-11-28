import React from 'react';
import './GlobalUIAndStats.css';
import {Link} from 'react-router-dom';
import NextRoundButton from './NextRoundButton';

//Component for dispalying the UI and the user Stats.
function GlobalUIAndStats(props) { //Gets all the neccessary values from other components to display them here. 
  const {hideGame, resetRound, roundName, win, turnsLeft, score, winAmount, goTo, goText,} = props;
  let getScore = score;
  let hideResetRound = hideGame;
  let winAmountUi = winAmount;

  const newGame = () => { //Resets all stats and moves the user to Round One.
    resetRound()
    sessionStorage.removeItem("sessionScore");
  }

  if(getScore === null){ //If there is no score yet, set it to zero.
    getScore = 0;
  }

  return (
    <div className='RoundUIBox'>
        <div className='newResetButtons'>
            <div onClick={newGame}>
                <Link to={'/'} className='btn btn-success btn-outline-light m-1'>New Game</Link>
            </div>
            <div className={hideResetRound}>
                <div onClick={resetRound} className='resetRound btn btn-success btn-outline-light m-1'>Reset Round</div>
            </div>
            <div>
                <NextRoundButton win={win} winAmount={winAmountUi} goTo={goTo} goText={goText}/>
            </div>
        </div>

        <div className='RoundStats'>
            <h4>UI Stats</h4>
            <h4>{roundName}</h4>
            <h5 className='mt-4'>Until Win: {win}/{winAmountUi}</h5>
            <h5 className='mt-4'>Turns Left: {turnsLeft}</h5>
            <h5 className='mt-4' >Score: {getScore}</h5>
        </div>
    </div>
  )
}

export default GlobalUIAndStats