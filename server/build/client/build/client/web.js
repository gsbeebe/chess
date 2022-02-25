// const { Board, Piece } = require('build/chess');
// const { translateLocationToIndex } = require('./build/utility');
import { Board } from '../src/chess';
import { translateLocationToIndex } from '../src/utility';
(() => {
    /* ... */
    console.log('dis worked');
})();
let board;
function main() {
    board = new Board(true);
    printBoard();
    // Setup listeners.
    document.getElementById('makeMove').addEventListener('click', makeMove);
    document.getElementById('input').addEventListener('keyup', (event) => {
        if (event.code === 'Enter') {
            event.preventDefault();
            document.getElementById('makeMove').click();
        }
    });
}
function makeMove() {
    const inputEl = document.getElementsByTagName('input')[0];
    const move = inputEl.value;
    console.log(`input was ${move}`);
    const location = move.slice(0, 2);
    const destination = move.slice(3, 5);
    const arrayLocation = translateLocationToIndex(location);
    const arrayDestination = translateLocationToIndex(destination);
    if (board.isValidMove(arrayLocation, arrayDestination)) {
        console.log('valid move');
        board.makeMove(arrayLocation, arrayDestination);
    }
    else {
        console.log('INVALID move sucka');
        const invalidEl = document.getElementById('invalid');
        invalidEl.style.visibility = 'visible';
        setTimeout(() => {
            invalidEl.style.visibility = 'hidden';
        }, 2000);
    }
    inputEl.value = '';
    printBoard();
}
function printBoard() {
    const s = board.getSpaces();
    let html = `<section class="board">`;
    html += `<h3>It's ${board.turn}'s turn</h3>`;
    html += `<p>a b c d e f g h</p>`;
    let letterCount = 0;
    let rowCount = 8;
    let temp = `<p>${rowCount}&nbsp;`;
    for (let g = 0; g < 64; g++) {
        temp += s[g] ? ' ' + s[g].text : ' .';
        if (++letterCount === 8) {
            html += `${temp} &nbsp;${rowCount--}</p>`;
            temp = `<p>${rowCount}&nbsp;`;
            letterCount = 0;
        }
    }
    html += `<p>a b c d e f g h</p>`;
    html += `</section>`;
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const section = document.getElementsByClassName('board')[0];
    section.replaceWith(doc.body.getElementsByClassName('board')[0]);
}
main();
//# sourceMappingURL=web.js.map