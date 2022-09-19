const canvas = document.getElementById("pongGame");
const context = canvas.getContext("2d");
canvas.width = 850;
canvas.height = 600;

let scoreOne = 0;
let scoreTwo = 0;

// key movement
window.addEventListener("keypress", doKeyDown, false);
function doKeyDown(e) {
  const key = e.key;
  if (key == "w" && playerOne.y - playerOne.gravity > 0) {
    playerOne.y -= playerOne.gravity * 4;
  } else if (
    key == "s" &&
    playerOne.y + playerOne.height + playerOne.gravity < canvas.height
  ) {
    playerOne.y += playerOne.gravity * 4;
  }
  if (key == "i" && playerTwo.y - playerTwo.gravity > 0) {
    playerTwo.y -= playerTwo.gravity * 4;
  } else if (
    key == "k" &&
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
  color: "#fff",
  gravity: 2,
});

//ball
const ball = new Element({
  // use constructor to name element and give its properties
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
  context.font = "18 Arial";
  context.fillStyle = "#fff";
  context.fillText(scoreOne, canvas.width / 2 - 60, 30);
}
// Player 2 score text
function displayScoreTwo() {
  context.font = "18 Arial";
  context.fillStyle = "#fff";
  context.fillText(scoreOne, canvas.width / 2 + 60, 30);
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
  ballWallCollision();
}
// detect collision
function ballWallCollision() {
  if (
    (ball.y + ball.gravity <= playerTwo.y + playerTwo.height &&
      ball.x + ball.width + ball.speed >= playerTwo.x &&
      ball.y + ball.gravity > playerTwo.y) ||
    (ball.y + ball.gravity <= playerOne.y + playerOne.height &&
      ball.x + ball.width + ball.speed >= playerOne.x &&
      ball.y + ball.gravity > playerOne.y)
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
  }
  drawElements();
}
// draw elements
function drawElements() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawElement(playerOne);
  drawElement(playerTwo);
  drawElement(ball);
  displayScoreOne();
  displayScoreTwo();
}
function loop() {
  drawElements();
  window.requestAnimationFrame(loop);
}
loop();