import React, { Component } from 'react';
import './App.css';
import SnakeGame from './snakeGame/snakeGame'

class App extends Component {
  render() {
    return (
      <div className="App">
        <SnakeGame />
      </div>
    );
  }
}

export default App;
