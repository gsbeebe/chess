import { Board } from "./chess";
import { translateLocationToIndex } from "./utility";
(function () {
    /* ... */
    console.log('dis worked');
})();
var board;
function main() {
    board = new Board(true);
    printBoard();
    // Setup listeners.
    document.getElementById('makeMove').addEventListener('click', makeMove);
    document.getElementById('input').addEventListener('keyup', function (event) {
        if (event.code === 'Enter') {
            event.preventDefault();
            document.getElementById('makeMove').click();
        }
    });
}
function makeMove() {
    var inputEl = document.getElementsByTagName('input')[0];
    var move = inputEl.value;
    console.log("input was ".concat(move));
    var location = move.slice(0, 2);
    var destination = move.slice(3, 5);
    var arrayLocation = translateLocationToIndex(location);
    var arrayDestination = translateLocationToIndex(destination);
    if (board.isValidMove(arrayLocation, arrayDestination)) {
        console.log('valid move');
        board.makeMove(arrayLocation, arrayDestination);
    }
    else {
        console.log('INVALID move sucka');
        var invalidEl_1 = document.getElementById('invalid');
        invalidEl_1.style.visibility = 'visible';
        setTimeout(function () {
            invalidEl_1.style.visibility = 'hidden';
        }, 2000);
    }
    inputEl.value = '';
    printBoard();
}
function printBoard() {
    var s = board.getSpaces();
    var html = "<section class=\"board\">";
    html += "<h3>It's ".concat(board.turn, "'s turn</h3>");
    html += "<p>a b c d e f g h</p>";
    var letterCount = 0;
    var rowCount = 8;
    var temp = "<p>".concat(rowCount, "&nbsp;");
    for (var g = 0; g < 64; g++) {
        temp += s[g] ? ' ' + s[g].text : ' .';
        if (++letterCount === 8) {
            html += "".concat(temp, " &nbsp;").concat(rowCount--, "</p>");
            temp = "<p>".concat(rowCount, "&nbsp;");
            letterCount = 0;
        }
    }
    html += "<p>a b c d e f g h</p>";
    html += "</section>";
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, 'text/html');
    var section = document.getElementsByClassName('board')[0];
    section.replaceWith(doc.body.getElementsByClassName('board')[0]);
}
main();
