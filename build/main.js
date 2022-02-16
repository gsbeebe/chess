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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let rawInput;
        let location;
        let destination;
        let arrayLocation;
        let arrayDestination;
        const board = new chess_1.Board(true);
        board.print();
        // Main game loop.
        // TODO: Catch signals for: exit, interrupt
        while (true) {
            terminal_kit_1.terminal.green(`It's ${board.turn}'s turn\n`);
            terminal_kit_1.terminal('Enter your move: ');
            rawInput = yield terminal_kit_1.terminal.inputField({}).promise;
            terminal_kit_1.terminal('\n');
            if (rawInput.toLowerCase() === 'exit')
                break;
            location = rawInput.slice(0, 2);
            destination = rawInput.slice(3, 5);
            arrayLocation = utility_1.translateLocationToIndex(location);
            arrayDestination = utility_1.translateLocationToIndex(destination);
            if (board.isValidMove(arrayLocation, arrayDestination)) {
                board.makeMove(arrayLocation, arrayDestination);
            }
            else {
                terminal_kit_1.terminal.red('Move is not valid: ' + rawInput + '\n');
            }
            board.print();
        }
        terminal_kit_1.terminal.red('gg no re\n');
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
