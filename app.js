const ball = document.querySelector('.ball')
const Box = document.querySelector('.game-container')
const playerPaddle = document.querySelector('.user-paddle')
const pcPaddle = document.querySelector('.pc-paddle')
const playerOneScore = document.querySelector('.player-one-score')
const playerTwoScore = document.querySelector('.player-two-score')
playerOneScore.textContent = 0
playerTwoScore.textContent = 0

// Functions for creating Objects on screen

function makeBallConfig(){
    this.width= 30,
    this.height = 30,
    this.left= 500,
    this.top= 500,
    this.right = this.left + this.width
    this.bottom = this.top + this.height
}

function makePaddleConfig() {
    this.width = 40,
    this.height = 100,
    this.left= 300,
    this.top= 400,
    this.right = this.left + this.width,
    this.bottom = this.top + this.height,
    this.center = (this.top + this.bottom) /2,
    this.disableUp = false
    this.disableDown = false

}
function changeBallSize(ballObject, ballData){
    ballObject.style.width = ballData.width + 'px'
    ballObject.style.height = ballData.height + 'px'
}
function changePaddleSize(paddleObject, paddleData){
    paddleObject.style.width = paddleData.width + 'px'
    paddleObject.style.height = paddleData.height + 'px'
}

const gameConfig = {
    width: 1000,
    height: 800,
    left: 200,
    top: 50
}

function configureBox(boxObject, boxData){
    boxObject.style.position = 'absolute'
    boxObject.style.width = boxData.width + 'px'
    boxObject.style.height = boxData.height + 'px'
    boxObject.style.left = boxData.left + 'px'
    boxObject.style.top = boxData.top + 'px'
}
let ballConfig = new makeBallConfig()
let paddleConfig = new makePaddleConfig()
let pcPaddleConfig = new makePaddleConfig()
pcPaddleConfig.left += 750
pcPaddleConfig.right = pcPaddleConfig.left + pcPaddleConfig.width



configureBox(Box, gameConfig)
changePaddleSize(playerPaddle, paddleConfig)
changeBallSize(ball, ballConfig)


// Ball Movement functions
// First 2 functions change the coordinates in the ball object, the last function changes the position on screen to new coordinates
function changeBallXCoordinates(direction, ballData){
    
    if (direction === 'left') {
        ballData.left+=10
        }
    else if (direction === 'right') {
        ballData.left-=10
        }
    // right does no auto-update when left changes, must change it with hardcode
    ballData.right = ballData.left + ballData.width
}
function changeBallYCoordinates(direction, ballData){
    
    if (direction === 'down') {
        ballData.top += 1
        }
    else if (direction === 'up') {
        ballData.top-= 1
        }
    ballData.bottom = ballData.top + ballData.height
}
function positionBall(ballObject, ballData){
    ball.style.position = 'absolute'
    ballObject.style.left = ballData.left + 'px'
    ballObject.style.top = ballData.top + 'px'
}


function positionPaddle(paddle, paddleData){
    paddle.style.position = 'absolute'
    paddle.style.left = paddleData.left + 'px'
    paddle.style.top = paddleData.top + 'px'
}


positionPaddle(playerPaddle, paddleConfig)
positionPaddle(pcPaddle, pcPaddleConfig)

positionBall(ball, ballConfig)





function switchXDirection(newDirection) {
    xMove = newDirection
}
function switchYDirection(newDirection) {
    yMove = newDirection
}



// let xMove = 'none'
// let yMove = 'none'
let xMove = 'left'
let yMove = 'up'
function step(timestamp){

    changeBallXCoordinates(xMove, ballConfig)
    changeBallYCoordinates(yMove, ballConfig)
    positionBall(ball, ballConfig)
    detectXCollision(ballConfig, gameConfig)
    detectYCollision(ballConfig, gameConfig)
    
    // PC Paddle
    lookForBall(pcPaddleConfig, ballConfig)
    positionPaddle(pcPaddle, pcPaddleConfig)
    detectPaddleAndWallCollision(pcPaddleConfig, gameConfig)
    detectPaddleAndBallCollision(pcPaddleConfig, ballConfig, 'right')

    // Player Paddle
    changePaddleCoordinates(paddleConfig)
    positionPaddle(playerPaddle, paddleConfig)
    detectPaddleAndWallCollision(paddleConfig, gameConfig)
    detectPaddleAndBallCollision(paddleConfig, ballConfig, 'left')



    requestAnimationFrame(step)
    
}
window.requestAnimationFrame(step)


function detectXCollision(object1, object2) {
    
    if (object1.right >= object2.width + object2.left){
        updateScore(1)
        restartField()
        // switchXDirection('right')
    }
    else if (object1.left <= object2.left){
        updateScore(2)
        restartField()
        // switchXDirection('left')
    }
}

function detectYCollision(object1, object2) {
    if (object1.bottom >= object2.height + object2.top){        
        switchYDirection('up')
        
    }
    else if(object1.top <= object2.top){
        switchYDirection('down')
      
    }
}

let direction = 'none'
function addArrowKeyFunctionality(){
    window.addEventListener('keydown', (e)=> {
        if (e.key === 'ArrowUp'){
            direction = 'up'
            paddleConfig.disableDown= false
        }
        if (e.key === 'ArrowDown'){
            direction = 'down'
            paddleConfig.disableUp= false
        }
    })
    window.addEventListener('keyup', (e)=> {
        direction = 'none'
    })
}
addArrowKeyFunctionality()


function changePaddleCoordinates(paddleObject){
    if (direction === 'up' && !paddleObject.disableUp){
        paddleObject.top-= 5
    }
    else if (direction === 'down' && !paddleObject.disableDown){
        paddleObject.top+= 5
    }
    paddleObject.bottom = paddleObject.top + paddleObject.height
    paddleObject.center = (paddleObject.top + paddleObject.bottom) /2
}


function detectPaddleAndWallCollision(paddle, wall){
    if (paddle.top <= wall.top){
        paddle.disableUp = true
    }
    if (paddle.bottom >= wall.height + wall.top){
        paddle.disableDown = true
    }
}

function detectPaddleAndBallCollision(paddle, ball, side){
    
    if (side==='left'){
        if (
            (paddle.right >= ball.left) && 
            (paddle.top <= ball.bottom) &&
            (paddle.bottom >= ball.top) && 
            (paddle.left < ball.right)
            )
            {
            switchXDirection('left')
            }
    }
    if (side==='right'){
        console.log(paddle.left, paddle.right, ball.left, ball.right)
        if (
            (paddle.left <= ball.right) && 
            (paddle.top <= ball.bottom) &&
            (paddle.bottom >= ball.top) &&
            (paddle.right > ball.left)
            )
            {
            switchXDirection('right')
            }
    }


}

function lookForBall(paddle, ball){
    if (paddle.center > ball.bottom && !paddle.disableUp){
        paddle.top-= 2
        paddle.disableDown= false
    }
    else if (paddle.center < ball.bottom && !paddle.disableDown){
        paddle.top+= 2
        paddle.disableUp= false
    }
    paddle.bottom = paddle.top + paddle.height
    paddle.center = (paddle.top + paddle.bottom) /2
}

let playerOne = 0
let playerTwo = 0
let justUpdated = false

function updateScore(player) {
    if (!justUpdated){
        justUpdated = true
        if (player === 1){playerOne++ }
        if (player === 2){playerTwo++ }
        playerOneScore.textContent = playerOne
        playerTwoScore.textContent = playerTwo
}}

let justRestarted = false

function restartField(){
    xMove = 'none'
    yMove = 'none'
    if (!justRestarted){
        justRestarted = true
    setTimeout(() => {
        console.log('we here')
        xMove = 'right'
        yMove = 'up'
        ballConfig.left= 500
        ballConfig.top= 500
        justRestarted= false
        justUpdated = false
        

    }, 2000)
}
}





