"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chess_1 = require("./chess");
const terminal_kit_1 = require("terminal-kit");
const utility_1 = require("./utility");
const indexToColor = { 0: 'White', 1: 'Black' };
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const board = new chess_1.Board();
        board.print();
        (0, terminal_kit_1.terminal)(`It's ${indexToColor[board.turn]}'s turn\n`);
        (0, terminal_kit_1.terminal)('Enter your move: ');
        let location;
        let destination;
        let rawInput = yield terminal_kit_1.terminal.inputField({}).promise;
        (0, terminal_kit_1.terminal)('\n');
        location = rawInput.slice(0, 2);
        destination = rawInput.slice(3, 5);
        (0, terminal_kit_1.terminal)('loc: ' + location + '\n');
        (0, terminal_kit_1.terminal)('dest: ' + destination + '\n');
        const arrayLocation = (0, utility_1.translateLocationToIndex)(location);
        const arrayDestination = (0, utility_1.translateLocationToIndex)(destination);
        (0, terminal_kit_1.terminal)('arrLoc: ' + arrayLocation + '\n');
        (0, terminal_kit_1.terminal)('arrDest: ' + arrayDestination + '\n');
        if (board.isValidMove(arrayLocation, arrayDestination)) {
            (0, terminal_kit_1.terminal)('Move is valid\n');
            board.makeMove(arrayLocation, arrayDestination);
            board.print();
        }
        else {
            (0, terminal_kit_1.terminal)('Move is not valid: ' + rawInput + '\n');
        }
        process.exit();
    });
}
// a1 b2
main();
//       0a 1b 2c 3d 4e 5f 6g 7h
// 0:8   0  1  2  3  4  5  6  7
// 1:7   8  9  10 11 12 13 14 15  7
// 2:6   16 17 18 19 20 21 22 23  6
// 3:5   24 25 26 27 28 29 30 31  5
// 4:4   32 33 34 35 36 37 38 39  4
// 5:3   40 41 42 43 44 45 46 47  3
// 6:2   48 49 50 51 52 53 54 55  2
// 7:1   56 57 58 59 60 61 62 63  1
//       a  b  c  d  e  f  g  h
