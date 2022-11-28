import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import RoundOne from './components/RoundOne';
import RoundTwo from './components/RoundTwo';
import RoundThree from './components/RoundThree';
import YouWinPage from './components/YouWinPage';
import HelpPage from './components/HelpPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; //For bootstrap.css


//React-Router-Dom is used to navigate to the diffrent pages rather then props. 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/RoundOne' element={<RoundOne/>}/>
      <Route path='/RoundTwo' element={<RoundTwo/>}/>
      <Route path='/RoundThree' element={<RoundThree/>}/>
      <Route path='/YouWinPage' element={<YouWinPage/>}/>
      <Route path='/HelpPage' element={<HelpPage/>}/>
    </Routes>
  </Router>
);
