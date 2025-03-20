let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const feedback = document.getElementById('feedback');
const attemptsDisplay = document.getElementById('attempts');
const restartButton = document.getElementById('restart-button');

// Função para processar a tentativa do usuário
function checkGuess() {
    const userGuess = Number(guessInput.value);
    attempts++;

    if (userGuess === secretNumber) {
        feedback.textContent = `Parabéns! Você adivinhou o número em ${attempts} tentativas!`;
        feedback.style.color = '#28a745';
        attemptsDisplay.textContent = `Tentativas: ${attempts}`;
        guessButton.disabled = true;
        restartButton.style.display = 'inline-block';
    } else if (userGuess > secretNumber) {
        feedback.textContent = 'O número é menor!';
        feedback.style.color = '#dc3545';
    } else {
        feedback.textContent = 'O número é maior!';
        feedback.style.color = '#dc3545';
    }

    attemptsDisplay.textContent = `Tentativas: ${attempts}`;
    guessInput.value = '';
    guessInput.focus();
}

// Função para reiniciar o jogo
function restartGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    feedback.textContent = '';
    attemptsDisplay.textContent = `Tentativas: 0`;
    guessButton.disabled = false;
    restartButton.style.display = 'none';
    guessInput.value = '';
    guessInput.focus();
}

// Adiciona o evento de clique no botão de adivinhar
guessButton.addEventListener('click', checkGuess);

// Adiciona o evento de clique no botão de reiniciar
restartButton.addEventListener('click', restartGame);
