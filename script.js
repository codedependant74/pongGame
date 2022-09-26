const gameBoard = document.querySelector("#pongGame");
gameBoard.width = 850;
gameBoard.height = 500;
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const popup = document.getElementById("popup");
const startBtn = document.querySelector("#startBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = new Image();
boardBackground.src = "./simone-viani-2XPHSXVT_Ls-unsplash.jpg";
boardBackground.addEventListener("load", () => {
  ctx.drawImage(boardBackground, 0, 0, gameWidth, gameHeight);
});
const paddle1Color = "#fff";
const paddle2Color = "#a0d6b4";
const paddleBorder = "black";
const ballColor = "#ccff00";
const ballBorderColor = "#fff";
const ballRadius = 12.5;
const paddleSpeed = 50;
let intervalID;
let ballSpeed;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let player1Score = 0;
let player2Score = 0;
let paddle1 = {
  width: 25,
  height: 100,
  x: 0,
  y: 0,
};
let paddle2 = {
  width: 25,
  height: 100,
  x: gameWidth - 25,
  y: gameHeight - 100,
};

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

function gameStart() {
  createBall();
  nextTick();
}
function nextTick() {
  intervalID = setTimeout(() => {
    clearBoard();
    drawPaddles();
    moveBall();
    drawBall(ballX, ballY);
    checkCollision();
    nextTick();
  }, 10);
}
function clearBoard() {
  // game board characteristics
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}
function drawPaddles() {
  // paddles characteristics
  ctx.strokeStyle = paddleBorder;

  ctx.fillStyle = paddle1Color;
  ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
  ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

  ctx.fillStyle = paddle2Color;
  ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
  ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
}
function createBall() {
  // initial ball movement starts at a slow speed then increases as it is hit
  ballSpeed = 1;
  if (Math.round(Math.random()) == 1) {
    ballXDirection = 1;
  } else {
    ballXDirection = -1;
  }
  if (Math.round(Math.random()) == 1) {
    ballYDirection = Math.random() * 1; //more random directions
  } else {
    ballYDirection = Math.random() * -1; //more random directions
  }
  ballX = gameWidth / 2; //places the ball in center
  ballY = gameHeight / 2;
  drawBall(ballX, ballY);
}
function moveBall() {
  ballX += ballSpeed * ballXDirection;
  ballY += ballSpeed * ballYDirection;
}
function drawBall(ballX, ballY) {
  // creates the ball characteristics
  ctx.fillStyle = ballColor;
  ctx.strokeStyle = ballBorderColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI); // Makes the ball round
  ctx.stroke();
  ctx.fill();
}
function checkCollision() {
  // if ball hits wall, update score. If ball hit the paddle then the ball changes direction for the opponent to hit the ball
  if (ballY <= 0 + ballRadius) {
    ballYDirection *= -1;
  }
  if (ballY >= gameHeight - ballRadius) {
    ballYDirection *= -1;
  }
  if (ballX <= 0) {
    player2Score += 1;
    updateScore();
    createBall();
    return;
  }
  if (ballX >= gameWidth) {
    player1Score += 1;
    updateScore();
    createBall();
    return;
  }
  if (ballX <= paddle1.x + paddle1.width + ballRadius) {
    if (ballY > paddle1.y && ballY < paddle1.y + paddle1.height) {
      ballX = paddle1.x + paddle1.width + ballRadius; // if ball gets stuck
      ballXDirection *= -1;
      ballSpeed += 1;
    }
  }
  if (ballX >= paddle2.x - ballRadius) {
    if (ballY > paddle2.y && ballY < paddle2.y + paddle2.height) {
      ballX = paddle2.x - ballRadius; // if ball gets stuck
      ballXDirection *= -1;
      ballSpeed += 1;
    }
  }
}
function changeDirection(event) {
  //assign keyboard keys to paddle motion and start game
  const keyPressed = event.keyCode;
  const start = 32;
  const paddle1Up = 87;
  const paddle1Down = 83;
  const paddle2Up = 38;
  const paddle2Down = 40;

  switch (keyPressed) {
    case start:
      if (start == keyPressed) {
        gameStart();
      }
    case paddle1Up:
      if (paddle1.y > 0) {
        paddle1.y -= paddleSpeed;
      }
      break;
    case paddle1Down:
      if (paddle1.y < gameHeight - paddle1.height) {
        paddle1.y += paddleSpeed;
      }
      break;
    case paddle2Up:
      if (paddle2.y > 0) {
        paddle2.y -= paddleSpeed;
      }
      break;
    case paddle2Down:
      if (paddle2.y < gameHeight - paddle2.height) {
        paddle2.y += paddleSpeed;
      }
      break;
  }
}
// function stopGame() {
//   clearInterval(gamestart);
// }
function updateScore() {
  scoreText.textContent = `${player1Score} : ${player2Score}`;
  if (player1Score === 5 || player2Score === 5) {
    resetGame();
  }
}
function resetGame() {
  player1Score = 0;
  player2Score = 0;
  paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0,
  };
  paddle2 = {
    width: 25,
    height: 100,
    x: gameWidth - 25,
    y: gameHeight - 100,
  };
  ballSpeed = 1;
  ballX = 0;
  ballY = 0;
  ballXDirection = 0;
  ballYDirection = 0;
  updateScore();
  clearInterval(intervalID);
  clearBoard();
}
