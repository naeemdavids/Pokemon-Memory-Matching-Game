import React from 'react';
import {Link} from 'react-router-dom';

//Button that shows up when the user winss the round. Gets info from the component using it to determine when it should show itself.
function NextRoundButton(props) {
    const {win, winAmount, goTo, goText} = props;
    let nextClass;
    let winAmountNum = winAmount;

    if(win < winAmountNum){
        nextClass = "hideNextButton";
    }else{
        nextClass = "showNextButton";
    }
  
    return (
    <div>
        <div className={nextClass}>
            <Link to={goTo} className='btn btn-success btn-outline-light m-1' style={{ whiteSpace: 'nowrap'}}>{goText}</Link>
        </div>
    </div>
  )
}

export default NextRoundButton

//