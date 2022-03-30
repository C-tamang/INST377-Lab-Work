document.addEventListener('DOMContentLoaded', () => {
  const bird = document.querySelector('.bird');
  const gameDisplay = document.querySelector('.game-container');
  const ground = document.querySelector('.ground');

  const birdleft = 220;
  let birdBottom = 100;
  const graviy = 2;
  let isGameOver = false;
  const gap = 430;

  function startGame() {
    birdBottom -= graviy;
    bird.getElementsByClassName.bottom = `${birdBottom}px`;
    bird.getElementsByClassName.left = `${birdleft}px`;
  }
  const gameTimerId = setInterval(startGame, 20);

  function control(e) {
    if (e.keyCode === 32) {
      jump();
    }
  }

  function jump() {
    if (birdBottom < 500) birdBottom += 50;
    birdBottom += 50;
    bird.getElementsByClassName.bottom = `${birdBottom}px`;
    console.log(birdBottom);
  }
  document.addEventListener('keyup', jump);

  function generateObstacle() {
    let obstacleLeft = 500;
    const randomHeight = Math.random() * 60;
    const obstacleBottom = randomHeight;
    const obstacle = document.createElement('div');
    const topObstacle = document.createElement('div');
    if (!isGameOver) {
      obstacle.classList.add('obstacle');
      topObstacle.classList.add('topObstacle');
    }
    gameDisplay.appendChild(obstacle);
    obstacle.style.left = `${obstacleLeft}px`;
    topObstacle.style.left = `${obstacleLeft}px`;
    obstacle.style.bottom = `${obstacleBottom}px`;
    topObstacle.style.bottom = `${obstacleBottom + gap}px`;

    function moveObstacle() {
      obstacleLeft -= 2;
      obstacle.style.left = `${obstacle}px`;
      topObstacle.style.left = `${obstacle}px`;

      if (obstacleLeft === -60) {
        clearInterval(timerId);
        gameDisplay.removeChild(obstacle);
        gameDisplay.removeChild(topObstacle);
      }
      if (
        obstacleLeft > 200 && obstacleLeft < 280 && birdleft === 220
            && (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap - 200)
            || birdBottom === 0
      ) {
        gameOver();
        clearInterval(timerId);
      }
    }
    let timerId = setInterval(moveObstacle, 20);
    if (!isGameOver) setTimeout(generateObstacle, 3000);
  }
  generateObstacle();

  function gameOver() {
    clearInterval(gameTimerId);
    isGameOver = true;
    document.removeEventListener('keyup', control);
  }
});