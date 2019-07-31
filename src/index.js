import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Game from './game';
import FiveInARow from './fiveInARow'
import './state.css';
import './index.css';

ReactDOM.render(
    <div className="wrap">
        <Game/>
        <App/>
        <FiveInARow/>
    </div>,
    document.getElementById('root')
);
