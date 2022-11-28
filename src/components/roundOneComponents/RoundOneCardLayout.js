import React from 'react';
import PokeBack from '../images/Pokeball-Wallpaper-HD-1080p.jpg';

//This component displays the actual cards that the user clicks and interacts with.
function RoundOneCardLayout(props) {//The state of this component is synced with RoundOne.js, as each time a card is chosen it updates/modify the state of RoundOne.js.
    const {handleChosenCard , card, turnover, cardDelay} = props;
    
    const handleClick = () => {
        if(!cardDelay){
            handleChosenCard(card)
        }
    }
    
    return (
    <div className='cardBox'>
        <div className={`${turnover ? 'turnover' : ''}`}>
            <img className='cardFront' src={card.src} alt='cardFront' width='250px'/>
            <img className='cardBack' src={PokeBack} alt='cardBack' onClick={handleClick} width='250px'/>
        </div>
    </div>
  )
}

export default RoundOneCardLayout