document.addEventListener('DOMContentLoaded', () => {
  const bird = document.querySelector('.bird');
  const gameDisplay = document.querySelector('.game-container');
  const ground = document.querySelector('.ground');

  let birdleft = 220;
  let birdBottom = 100;
  let graviy = 2

  function startGame() {
      birdBottom -= graviy
      bird.getElementsByClassName.bottom = birdBottom + 'px'
      bird.getElementsByClassName.left = birdleft + 'px'
  }
  let timerId = setInterval(startGame, 20)

  function jump() {
      if (birdBottom < 500) birdBottom += 50
      birdBottom += 50
      bird.getElementsByClassName.bottom = birdBottom + 'px'
      console.log(birdBottom)
  }
  document.addEventListener('keyup', jump)
});