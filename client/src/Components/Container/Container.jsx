import React, { Component } from 'react';
import Board from '../Board/Board';
import './styles.css';


class Container extends Component {

    render() {
        return (
            <div className = "container"> 
            <div className = "color-picker-container">
                <input type = "color" />
            </div>
            <div className = "board-container">
                <Board />
                 
            </div>
                
            </div>
        );
    }
}

export default Container;