import React, { useEffect, useState } from 'react';
import RoundThreeCardLayout from './roundThreeComponents/RoundThreeCardLayout';
import RoundThreeImages from './roundThreeComponents/RoundThreeImages';
import GlobalUIAndStats from './GlobalUIAndStats';
import NextRoundButton from './NextRoundButton';
import {Link} from 'react-router-dom';
import './roundThreeComponents/RoundThree.css';

//Parent Component for the Third Round.
function RoundThree() {
  const [cards, setCards] = useState([]) //For storing the state of the cards.
  const [turns, setTurns] = useState(0) //Tracks the Number of turnsd the user makes.
  const [win, setWin] = useState(0) //Sets the Win conditions for each round.
  const [firstCard, setFirstCard] = useState(null) //Records the first card chosen by the user.
  const [seconedCard, setSeconedCard] = useState(null) //Records the seconed card chosen by the user.
  const [cardDelay, setCardDelay] = useState(false) //Causes a slight Delay of time after a user choses 2 cards, this ensure's that the user does not overload the state.
  let score = sessionStorage.getItem('sessionScore'); // Tracks and Gets the score from the previous rounds.
  let hideGame; //For hiding the game when the user wins.
  let showWinBox = 'hideWinBox'; //Shows when the user Wins.
  let showLoseBox = 'hideLoseBox'; //Shows when the user loses.

  useEffect(() => {
    resetRound() //Starts the game after the user boots up the app.
  }, [])

  const resetRound = () => { //Resets the Round.
    const resetRound = [...RoundThreeImages, ...RoundThreeImages].sort(() => Math.random() - 0.5).map((card) => ({ ...card, id: Math.random() })) //Uses the same array twice, to make sure there is a pair of each card in the Cards game. Takes the cards and shuffles them around with the .sort while Math.random gives them a unique id/key each time it restarts.
    setFirstCard(null) //Resets the first card chosen by the user.
    setSeconedCard(null) //Resets the seconed card chosen by the user.
    setCards(resetRound) //Sets the cards again after the Reshuffling.
    setTurns(0) //Sets the turns to zero.
    setWin(0) // Resets the Win conditions.
  }

  const handleChosenCard = (card) => { //This function is activated from the RoundCardLayout component, that Child component can change the state of this Parent component Via props. When a card is chosen from the RoundCardlayout component it sets the firstCard state to that card. And after that it then sets the seconed card chosen by the user.
    firstCard ? setSeconedCard(card) : setFirstCard(card)
  }

  useEffect(() => {
    if(firstCard && seconedCard){ //If the user choses 2 cards.
      setCardDelay(true) //Disables the cards for a bit after the user has chosen 2 cards.
      if(firstCard.src === seconedCard.src){ //If the cards chosen by the user match.
        setCards(originalCards => {
          return originalCards.map(card => {
            if(card.src === firstCard.src){
              winMatched() //Activates the winMatched function.
              return {...card, matched: true} //Changes the matched property of each item in the Cards array from false to true.
            }else{
              return card
            }
          })
        })
        reTurn()
      }else{ //If the cards don't match, flips them both around.
        setTimeout(() => reTurn(), 1000)
      }
    }
  }, [firstCard, seconedCard])

  const reTurn = () => { //Function for setting the chosen cards by the user to null, adds one turn and turns off the card delay mechanism.
    setFirstCard(null)
    setSeconedCard(null)
    setTurns(turnsNum => turnsNum + 1)
    setCardDelay(false)
  }

  const winMatched = () => { //Increases every time you make a proper match of cards. This is needed for the win conditions to activate when you reach a certain number.
    setWin(winNum => winNum + 1)
  }

  const turnsMax = 24; //Maximum number of turns before you lose.
  let turnsLeft = turnsMax - turns;
  
  if(turnsLeft === 0 && win === 16){ //If the amount of turns you have is less then one but you completed the win conditions, then you win.
    showWinBox = 'showWinBox';
    score = 1*score + 1*turnsLeft;
    sessionStorage.setItem('sessionScore', score)
    hideGame = 'hideGameDiv';
  }else if(turnsLeft === 0){ //If the amount of turns you have is less then one, you lose and the game restarts.
    showLoseBox = 'showLoseBox';
    setTimeout(() => resetRound(), 3000)
  }else if(win === 16){ //The number of cards that need to be flipped around correctly before you win, basically the win conditions.
    showWinBox = 'showWinBox';
    score = 1*score + 1*turnsLeft;
    sessionStorage.setItem('sessionScore', score)
    hideGame = 'hideGameDiv';
  }else{
    showLoseBox = 'hideLoseBox';
  }
  

  return (
    <div className='RoundThreePage'>
      <div className='d-flex'>
        
      <div className='uiDiv'>
          <div className='helpButton'>
            <Link to={'/HelpPage'} className='btn btn-success btn-outline-light m-1' style={{ whiteSpace: 'nowrap'}}>Help</Link>
          </div>
          <GlobalUIAndStats 
          hideGame={hideGame} 
          resetRound={resetRound} 
          roundName={'Round 3'} 
          win={win} 
          turnsLeft={turnsLeft} 
          score={score} 
          winAmount={16} 
          goTo={'/YouWinPage'} 
          goText={'Next Page'}
          />
      </div>


        <div className='RoundThreeTable'>
          <div className={showWinBox}>
            <h1>Congratulations You Win Round 3!</h1>
            <div className='nextRoundButton'>
              <NextRoundButton win={win} winAmount={12} goTo={'/YouWinPage'} goText={'Next Page'}/>
            </div>
          </div>

          <div className={showLoseBox}>
            <h1 style={{ whiteSpace: 'nowrap'}}>You Lost! || Resetting This Round...</h1>
          </div>
          
          <div className='card-display'>
            {cards.map(card => (
              <div className={hideGame}>
                <RoundThreeCardLayout 
                key={card.id} 
                card={card} 
                handleChosenCard={handleChosenCard} 
                turnover={card === firstCard || card === seconedCard || card.matched} 
                cardDelay={cardDelay}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    )
  }

export default RoundThree