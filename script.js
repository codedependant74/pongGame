const canvas = document.getElementById("pongGame");
const context = canvas.getContext("2d");
canvas.width = 850;
canvas.height = 600;

let scoreOne = 0;
let scoreTwo = 0;

// key movement
window.addEventListener("keydown", doKeyDown);
function doKeyDown(e) {
  const key = e.key;
  if (key == "SpaceBar") {
  }
  if (key == "w" && playerOne.y - playerOne.gravity > 0) {
    playerOne.y -= playerOne.gravity * 4;
  } else if (
    key == "s" &&
    playerOne.y + playerOne.height + playerOne.gravity < canvas.height
  ) {
    playerOne.y += playerOne.gravity * 4;
  }
  if (key == "ArrowUp" && playerTwo.y - playerTwo.gravity > 0) {
    playerTwo.y -= playerTwo.gravity * 4;
  } else if (
    key == "ArrowDown" &&
    playerTwo.y + playerTwo.height + playerTwo.gravity < canvas.height
  ) {
    playerTwo.y += playerTwo.gravity * 4;
  }
}

class Element {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.color = options.color;
    this.speed = options.speed || 2;
    this.gravity = options.gravity;
  }
}

// first paddle
const playerOne = new Element({
  // use constructor to name element and give its properties
  x: 10,
  y: 200,
  width: 15,
  height: 80,
  color: "#fff",
  gravity: 2,
});

//second paddle
const playerTwo = new Element({
  // use constructor to name element and give its properties
  x: 825,
  y: 200,
  width: 15,
  height: 80,
  color: "#a0d6b4",
  gravity: 2,
});

//ball
const ball = new Element({
  // use constructor to name element and give its properties
  // creates the ball's look
  x: 850 / 2,
  y: 600 / 2,
  width: 15,
  height: 15,
  color: "#ccff00",
  speed: 1,
  gravity: 1,
});

// draw elements
function drawElement(element) {
  // this is code draws the element visually
  context.fillStyle = element.color;
  context.fillRect(element.x, element.y, element.width, element.height);
}

// Player one score text
function displayScoreOne() {
  context.font = "40px Arial";
  context.fillStyle = "#fff";
  context.fillText(scoreOne, canvas.width / 2 - 60, 30);
}
// Player 2 score text
function displayScoreTwo() {
  context.font = "40px Arial";
  context.fillStyle = "#fff";
  context.fillText(scoreTwo, canvas.width / 2 + 60, 30);
}

// detect collision
function ballWallCollision() {
  if (
    (ball.y + ball.gravity <= playerTwo.y + playerTwo.height &&
      ball.x + ball.width + ball.speed >= playerTwo.x &&
      ball.y + ball.gravity > playerTwo.y) ||
    (ball.y + ball.gravity > playerOne.y &&
      ball.x + ball.speed <= playerOne.x + playerOne.width)
  ) {
    ball.speed = ball.speed * -1;
  } else if (ball.x + ball.speed < playerOne.x) {
    scoreTwo += 1;
    ball.speed = ball.speed * -1;
    ball.x = 100 + ball.speed;
    ball.y += ball.gravity;
  } else if (ball.x + ball.speed > playerTwo.x + playerTwo.width) {
    scoreOne += 1;
    ball.speed = ball.speed * -1;
    ball.x = 100 + ball.speed;
    ball.y += ball.gravity;
  } // LEFT OFF HERE, HAVE TO GET THE BALL TO MOVE
  return drawElements();
}
// make ball bounce
function ballBounce() {
  if (ball.y + ball.gravity <= 0 || ball.y + ball.gravity >= canvas.height) {
    ball.gravity = ball.gravity * -1;
    ball.y += ball.gravity;
    ball.x += ball.speed;
  } else {
    ball.y += ball.gravity;
    ball.x += ball.speed;
  }
  return ballWallCollision();
}
// draw all elements
function drawElements() {
  //use lineTo to draw lines on canvas to mimic tennis court
  context.beginPath();
  context.moveTo(101, 200);
  context.lineTo(290, 199);
  context.moveTo(503, 202);
  context.lineTo(290, 200);
  context.moveTo(500, 43);
  context.lineTo(501, 361);
  context.moveTo(87, 44);
  context.lineTo(87, 359);
  context.moveTo(1, 45);
  context.lineTo(601, 45);
  context.moveTo(1, 357);
  context.lineTo(600, 357);
  context.moveTo(599, 45);
  context.lineTo(600, 358);
  context.moveTo(-1, 47);
  context.lineTo(-1, 358);
  context.moveTo(297, 1);
  context.lineTo(296, 399);
  context.strokeStyle = "white";
  context.stroke();
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawElement(playerOne);
  drawElement(playerTwo);
  drawElement(ball);
  displayScoreOne();
  displayScoreTwo();
}
function loop() {
  ballBounce();
  window.requestAnimationFrame(loop);
}
loop();
