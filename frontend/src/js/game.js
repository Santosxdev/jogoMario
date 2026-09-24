const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

let isJumping = false;
let isGameOver = false;

const jump = () => {

    // Não deixa pular durante outro pulo
    if (isJumping || isGameOver) {
        return;
    }

    isJumping = true;

    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
        isJumping = false;
    }, 500);
};


const checkCollision = () => {

    if (isGameOver) {
        return;
    }

    const marioRect = mario.getBoundingClientRect();
    const pipeRect = pipe.getBoundingClientRect();

    /*
     * Criamos uma área menor de colisão
     * dentro da imagem do Mario.
     *
     * Isso evita que partes transparentes
     * da imagem sejam consideradas como Mario.
     */

    const marioLeft = marioRect.left + 35;
    const marioRight = marioRect.right - 35;
    const marioTop = marioRect.top + 10;
    const marioBottom = marioRect.bottom - 5;

    /*
     * Área de colisão do cano.
     */

    const pipeLeft = pipeRect.left + 5;
    const pipeRight = pipeRect.right - 5;
    const pipeTop = pipeRect.top;

    /*
     * Verifica se existe sobreposição horizontal.
     */

    const horizontalCollision =
        marioRight > pipeLeft &&
        marioLeft < pipeRight;

    /*
     * Verifica se o Mario está descendo
     * e chegou à altura do topo do cano.
     *
     * O Mario precisa estar praticamente
     * no topo do cano para ocorrer colisão.
     */

    const verticalCollision =
        marioBottom >= pipeTop &&
        marioTop < pipeRect.bottom;

    /*
     * Só ocorre colisão quando as duas
     * condições são verdadeiras.
     */

    if (horizontalCollision && verticalCollision) {
        gameOver();
    }
};


const gameOver = () => {

    isGameOver = true;

    /*
     * Para a animação do cano.
     */
    pipe.style.animation = 'none';

    /*
     * Mantém o cano exatamente onde estava.
     */
    pipe.style.left = `${pipe.getBoundingClientRect().left}px`;

    /*
     * Para o pulo do Mario.
     */
    mario.classList.remove('jump');

    /*
     * Troca a imagem.
     */
    mario.src = './src/assets/game-over.png';

    /*
     * Ajusta o tamanho da imagem de Game Over.
     */
    mario.style.width = '75px';

    /*
     * Mantém a posição do Mario.
     */
    mario.style.left = '50px';
};


/*
 * Verifica a colisão continuamente.
 */
setInterval(() => {
    checkCollision();
}, 10);


/*
 * Permite pular pressionando qualquer tecla.
 */
document.addEventListener('keydown', jump);