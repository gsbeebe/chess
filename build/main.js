var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Board } from './chess';
import { terminal } from 'terminal-kit';
import { translateLocationToIndex } from './utility';
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var rawInput, location, destination, arrayLocation, arrayDestination, board;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    board = new Board(true);
                    board.print();
                    _a.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 3];
                    terminal.green("It's ".concat(board.turn, "'s turn\n"));
                    terminal('Enter your move: ');
                    return [4 /*yield*/, terminal.inputField({}).promise];
                case 2:
                    rawInput = _a.sent();
                    terminal('\n');
                    if (rawInput.toLowerCase() === 'exit')
                        return [3 /*break*/, 3];
                    location = rawInput.slice(0, 2);
                    destination = rawInput.slice(3, 5);
                    arrayLocation = translateLocationToIndex(location);
                    arrayDestination = translateLocationToIndex(destination);
                    if (board.isValidMove(arrayLocation, arrayDestination)) {
                        board.makeMove(arrayLocation, arrayDestination);
                    }
                    else {
                        terminal.red('Move is not valid: ' + rawInput + '\n');
                    }
                    board.print();
                    return [3 /*break*/, 1];
                case 3:
                    terminal.red('gg no re\n');
                    process.exit();
                    return [2 /*return*/];
            }
        });
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
