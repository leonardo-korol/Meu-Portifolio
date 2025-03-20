// Configurações iniciais do jogo
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 20; // Tamanho de cada célula (pode ajustar para mudar a velocidade)
let snake = [{ x: 5, y: 5 }]; // Corpo inicial da minhoca
let food = { x: 10, y: 10 }; // Posição inicial da comida
let dx = gridSize; // Direção inicial: para a direita
let dy = 0; // Direção inicial: sem movimento vertical
let score = 0; // Pontuação inicial

canvas.width = 400; // Largura do canvas
canvas.height = 400; // Altura do canvas

// Função para desenhar a minhoca
function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

// Função para desenhar a comida
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// Função para mover a minhoca
function moveSnake() {
    const head = { x: snake[0].x + dx / gridSize, y: snake[0].y + dy / gridSize };
    snake.unshift(head);
    
    // Verificar se comeu a comida
    if (head.x === food.x && head.y === food.y) {
        score += 10; // Aumentar a pontuação
        food = generateFood(); // Gerar uma nova comida
    } else {
        snake.pop(); // Remover o último segmento se não comer
    }
}

// Função para gerar a comida em uma nova posição aleatória
function generateFood() {
    const foodX = Math.floor(Math.random() * (canvas.width / gridSize));
    const foodY = Math.floor(Math.random() * (canvas.height / gridSize));
    return { x: foodX, y: foodY };
}

// Função para verificar colisão
function checkCollisions() {
    const head = snake[0];
    
    // Colisão com as paredes
    if (head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize) {
        return true;
    }

    // Colisão com o próprio corpo
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }

    return false;
}

// Função para desenhar o jogo
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    document.getElementById('score').textContent = `Pontos: ${score}`;

    if (checkCollisions()) {
        endGame();
    }
}

// Função para finalizar o jogo
function endGame() {
    alert('Game Over!');
    document.getElementById('restart-button').style.display = 'inline-block';
}

// Função para iniciar o movimento
function gameLoop() {
    moveSnake();
    draw();
    setTimeout(gameLoop, 100); // Controle da velocidade do jogo
}

// Função para reiniciar o jogo
function restartGame() {
    snake = [{ x: 5, y: 5 }]; // Renasce sempre na posição (5, 5)
    dx = gridSize;
    dy = 0;
    score = 0;
    food = generateFood();
    document.getElementById('restart-button').style.display = 'none';
    gameLoop();
}

// Função para controlar as setas do teclado
document.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp' && dy === 0) {
        dx = 0;
        dy = -gridSize;
    } else if (event.key === 'ArrowDown' && dy === 0) {
        dx = 0;
        dy = gridSize;
    } else if (event.key === 'ArrowLeft' && dx === 0) {
        dx = -gridSize;
        dy = 0;
    } else if (event.key === 'ArrowRight' && dx === 0) {
        dx = gridSize;
        dy = 0;
    }
});

// Adiciona o evento de reiniciar
document.getElementById('restart-button').addEventListener('click', restartGame);

// Inicia o jogo
gameLoop();
