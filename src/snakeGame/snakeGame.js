import React, { Component } from 'react';
import { GAME_BOARD_DIMENSIONS,
        DEFAULT_SNAKE_POSITION,
        DEFAULT_FOOD_POSITION,
        FOOD_DIMENSIONS,
        SNAKE_DIMENSIONS,
        DEFAULT_SNAKE_MOVE_LENGTH }
        from './config.js'
import './snakeGame.css';

export default class SnakeGame extends Component {
    constructor(props) {
        super(props)
        this.state = {
            paused: false,
            gameOver: false,
            position : {...DEFAULT_SNAKE_POSITION},
            foodPosition: {...DEFAULT_FOOD_POSITION}
        }
    }

    componentDidMount() {
        document.getElementById("snake-container").onkeydown = (event) => this.onKeyPress(event)
    }

    buildSnake = () => {

    }

    createFood = () => {
        const randomNumber = Math.random();
        let foodPosition = {...this.state.foodPosition}
        foodPosition.top = Math.floor(randomNumber*(GAME_BOARD_DIMENSIONS.height - FOOD_DIMENSIONS.height)/20)*20;
        foodPosition.left = Math.floor(randomNumber*(GAME_BOARD_DIMENSIONS.width - FOOD_DIMENSIONS.width)/20)*20;
        this.setState({ foodPosition });
    }

    ateFood = (snakePostion) => {
        const foodPosition = this.state.foodPosition;
        if(snakePostion.left === foodPosition.left && snakePostion.top === foodPosition.top) {
            this.createFood();        
        }
    }

    onKeyPress = (event) => {
        let position = {...this.state.position};
        switch(event.key) {
            case "ArrowRight": {
                if(position.left !== (GAME_BOARD_DIMENSIONS.width - FOOD_DIMENSIONS.width))
                    position.left += DEFAULT_SNAKE_MOVE_LENGTH;
                break;
            } case "ArrowLeft": {
                if(position.left !== 0)
                    position.left -= DEFAULT_SNAKE_MOVE_LENGTH;
                break;
            } case "ArrowDown": {
                if(position.top !== (GAME_BOARD_DIMENSIONS.height - FOOD_DIMENSIONS.height))
                    position.top += DEFAULT_SNAKE_MOVE_LENGTH;
                break;
            } case "ArrowUp": {
                if(position.top !== 0)
                    position.top -= DEFAULT_SNAKE_MOVE_LENGTH;
                break;
            } default: {

            }
        }
        this.ateFood(position);
        this.setState({ position })
    }

    render() {
        return(
            <div style={{
                width: GAME_BOARD_DIMENSIONS.width,
                height: GAME_BOARD_DIMENSIONS.height
            }} id="game-container">
                <div style={{...this.state.position, ...SNAKE_DIMENSIONS}} id="snake-container" tabIndex="1"></div>
                <div style={{...this.state.foodPosition, ...FOOD_DIMENSIONS}} id="food-container"></div>
            </div>
        )
    }
}