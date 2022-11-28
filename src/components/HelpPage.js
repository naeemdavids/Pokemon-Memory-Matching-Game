import React from 'react';
import './HelpPage.css';
import {Link} from 'react-router-dom';

//Component for the Help Page.
function HelpPage(props) {
  const toRound1 = () => {
    sessionStorage.removeItem("sessionScore");
  }

  return (
    <div className='HelpPage'>
        <Link onClick={toRound1} to={'/'} className='helpPageButton btn btn-success btn-outline-light m-1' style={{ whiteSpace: 'nowrap'}}>Return To Round 1</Link>
    </div>
  )
}

export default HelpPage