import React, { Component } from 'react';
import { GAME_BOARD_DIMENSIONS,
        DEFAULT_SNAKE_POSITION,
        DEFAULT_FOOD_POSITION,
        FOOD_DIMENSIONS,
        SNAKE_DIMENSIONS,
        DEFAULT_SNAKE_MOVE_LENGTH }
        from './config.js';
import snakeFace from '../images/snake-face.png';
import iceCream from '../images/ice-cream.png';
import tomato from '../images/tomato.png';
import pumkin from '../images/pumkin.png';
import './snakeGame.css';

export default class SnakeGame extends Component {
    constructor(props) {
        super(props)
        this.state = {
            paused: false,
            gameOver: false,
            position : {...DEFAULT_SNAKE_POSITION},
            foodPosition: {...DEFAULT_FOOD_POSITION},
            score: 0,
            foodImage: this.selectRandomFoodImage()
        }
    }

    selectRandomFoodImage = () => {
        const foodImages = [iceCream, tomato, pumkin];
        return foodImages[Math.floor(Math.random()*3)]
    }

    componentDidMount = () => {
        document.getElementById("snake-container").onkeydown = (event) => this.onKeyPress(event)
    }

    buildSnake = () => {

    }

    createFood = () => {
        const randomNumber = Math.random();
        let {foodPosition, score, foodImage }= this.state;
        score += 1;
        foodImage = this.selectRandomFoodImage();
        foodPosition.top = Math.floor(randomNumber*(GAME_BOARD_DIMENSIONS.height - FOOD_DIMENSIONS.height)/20)*20;
        foodPosition.left = Math.floor(randomNumber*(GAME_BOARD_DIMENSIONS.width - FOOD_DIMENSIONS.width)/20)*20;
        this.setState({ foodPosition, score, foodImage});
    }

    ateFood = (snakePostion) => {
        const { foodPosition } = this.state;
        if(snakePostion.left === foodPosition.left && snakePostion.top === foodPosition.top) {
            this.createFood();        
        }
    }

    onKeyPress = (event) => {
        let position = {...this.state.position};
        switch(event.keyCode) {
            case 37: {
                // Arrow Left
                if(position.left !== 0)
                    position.left -= DEFAULT_SNAKE_MOVE_LENGTH;
                break;
            } case 38: {
                // Arrow Up
                if(position.top !== 0)
                    position.top -= DEFAULT_SNAKE_MOVE_LENGTH;
                break;
            } case 39: {
                // Arrow Right
                if(position.left !== (GAME_BOARD_DIMENSIONS.width - FOOD_DIMENSIONS.width))
                    position.left += DEFAULT_SNAKE_MOVE_LENGTH;
                break;
            } case 40: {
                // Arrow Down
                if(position.top !== (GAME_BOARD_DIMENSIONS.height - FOOD_DIMENSIONS.height))
                    position.top += DEFAULT_SNAKE_MOVE_LENGTH;
                break;
            } default: {

            }
        }
        this.ateFood(position);
        this.setState({ position })
    }

    render() {
        return(
            <div>
                <p>Present match score: {this.state.score}</p>
                <div style={{
                    width: GAME_BOARD_DIMENSIONS.width,
                    height: GAME_BOARD_DIMENSIONS.height
                }} id="game-container">
                    <div style={{...this.state.position, ...SNAKE_DIMENSIONS}} id="snake-container" tabIndex="1">
                        <img style={{...SNAKE_DIMENSIONS}} src={snakeFace}></img>
                    </div>
                    <div style={{...this.state.foodPosition, ...FOOD_DIMENSIONS}} id="food-container">
                        <img style={{...FOOD_DIMENSIONS}} src={this.state.foodImage}></img>
                    </div>
                </div>
            </div>
        )
    }
}