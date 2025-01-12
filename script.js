// script.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Configuración del juego
const gridSize = 20; // Tamaño de cada celda
const rows = canvas.height / gridSize;
const cols = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = getRandomFoodPosition();
let direction = { x: 1, y: 0 }; // Dirección inicial (derecha)
let nextDirection = { x: 1, y: 0 }; // Para evitar cambios rápidos de dirección
let score = 0;

// Dibuja la serpiente
function drawSnake() {
  ctx.fillStyle = 'lime';
  snake.forEach(segment => {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  });
}

// Dibuja la comida
function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// Mueve la serpiente
function moveSnake() {
  // Actualiza la dirección con el siguiente movimiento permitido
  direction = nextDirection;

  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y
  };

  // Colisión con las paredes
  if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
    resetGame();
    return;
  }

  // Colisión con la propia serpiente
  if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    resetGame();
    return;
  }

  snake.unshift(head);

  // Comer comida
  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById('score').textContent = `Score: ${score}`;
    food = getRandomFoodPosition();
  } else {
    snake.pop();
  }
}

// Genera una posición aleatoria para la comida
function getRandomFoodPosition() {
  let position;
  do {
    position = {
      x: Math.floor(Math.random() * cols),
      y: Math.floor(Math.random() * rows)
    };
  } while (snake.some(segment => segment.x === position.x && segment.y === position.y));
  return position;
}

// Reinicia el juego
function resetGame() {
  alert('Game Over! Your score: ' + score);
  snake = [{ x: 10, y: 10 }];
  direction = { x: 1, y: 0 }; // Dirección inicial al reiniciar
  nextDirection = { x: 1, y: 0 };
  score = 0;
  document.getElementById('score').textContent = `Score: ${score}`;
  food = getRandomFoodPosition();
}

// Actualiza el juego
function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFood();
  drawSnake();
  moveSnake();
}

// Control de dirección
document.addEventListener('keydown', event => {
  switch (event.key) {
    case 'ArrowUp':
      if (direction.y === 0) nextDirection = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      if (direction.y === 0) nextDirection = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      if (direction.x === 0) nextDirection = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      if (direction.x === 0) nextDirection = { x: 1, y: 0 };
      break;
  }
});

// Bucle del juego
setInterval(updateGame, 100);
