var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
define("utility", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.translateLocationToIndex = exports.isLShape = exports.isDiagonal = exports.isHorizontal = exports.isVertical = exports.getRow = exports.getColumn = exports.DISTANCES_DIAGONAL = exports.NUM_SPACES = exports.NUM_ROWS = exports.NUM_COLUMNS = void 0;
    // Constants
    exports.NUM_COLUMNS = 8;
    exports.NUM_ROWS = 8;
    exports.NUM_SPACES = 64;
    exports.DISTANCES_DIAGONAL = [7, 9];
    var DISTANCES_L = [6, 10, 15, 17];
    // Functions
    /** Get the column of any given point. */
    function getColumn(position) {
        return position % exports.NUM_COLUMNS;
    }
    exports.getColumn = getColumn;
    /** Get the row of any given point. */
    function getRow(position) {
        return Math.floor(position / exports.NUM_ROWS);
    }
    exports.getRow = getRow;
    /** Determine if the destination is diagonal from the location. */
    function isVertical(location, destination) {
        return getColumn(location) === getColumn(destination);
    }
    exports.isVertical = isVertical;
    /** Determine if the destination in in the same row as the location. */
    function isHorizontal(location, destination) {
        return getRow(location) === getRow(destination);
    }
    exports.isHorizontal = isHorizontal;
    /** Determine if the destination is diagonal from the location. */
    function isDiagonal(location, destination) {
        var diff = Math.abs(destination - location);
        console.log("diff ".concat(diff, " diff mod 7 ").concat(diff % 7, " diff mod 9 ").concat(diff % 9));
        return diff % 7 === 0 || diff % 9 === 0;
        // return DISTANCES_DIAGONAL.includes(modulo);
    }
    exports.isDiagonal = isDiagonal;
    /** Determine if the destination is an L shape from the location, for Knights. */
    function isLShape(location, destination) {
        return DISTANCES_L.includes(Math.abs(location - destination));
    }
    exports.isLShape = isLShape;
    /** Constants for translating location to array index. */
    var columnLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    var rowNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
    var rowToArrRow = { 8: 0, 7: 1, 6: 2, 5: 3, 4: 4, 3: 5, 2: 6, 1: 7 };
    /** Translate board location to array location. */
    function translateLocationToIndex(location) {
        // Ensure length is exactly 2.
        if (location.length !== 2)
            return -1;
        var column = location[0].toLowerCase();
        var row = Number(location[1]);
        // Ensure column is a value within allowed letters.
        if (!columnLetters.includes(column))
            return -1;
        // Ensure row is a value within allowed numbers.
        if (!rowNumbers.includes(row))
            return -1;
        var columnIndex = columnLetters.indexOf(column);
        // Quick mafs to figure out array index.
        return (rowToArrRow[row] * exports.NUM_ROWS) + columnIndex;
    }
    exports.translateLocationToIndex = translateLocationToIndex;
});
// test: a8; row = 8; columnIndex = 0; (0*8)+0 = 0;
// test: b8; row = 8; columnIndex = 1; (0*8)+1 = 1;
// test: a1; row = 1; columnIndex = 0; (7*8)+0 = 56;
// test: h7; row = 7; columnIndex = 7; (1*8)+7 = 15;
// test: h8; row = 8; columnIndex = 7; (0*8)+7 = 7;
define("chess", ["require", "exports", "utility"], function (require, exports, utility_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Board = exports.Piece = exports.PieceColor = exports.PieceType = void 0;
    // import { terminal } from 'terminal-kit';
    var MoveType;
    (function (MoveType) {
        MoveType["VERTICAL"] = "Vertical";
        MoveType["HORIZONTAL"] = "Horizontal";
        MoveType["DIAGONAL"] = "Diagonal";
        MoveType["LSHAPE"] = "LShape";
        MoveType["EN_PASSANT"] = "EnPassant";
    })(MoveType || (MoveType = {}));
    var MoveDistance;
    (function (MoveDistance) {
        MoveDistance["ONE"] = "One";
        MoveDistance["ONE_OR_TWO"] = "OneOrTwo";
        MoveDistance["THREE"] = "Three";
        MoveDistance["UNLIMITED"] = "Unlimited";
    })(MoveDistance || (MoveDistance = {}));
    var PieceType;
    (function (PieceType) {
        PieceType["KING"] = "King";
        PieceType["QUEEN"] = "Queen";
        PieceType["BISHOP"] = "Bishop";
        PieceType["KNIGHT"] = "Knight";
        PieceType["ROOK"] = "Rook";
        PieceType["PAWN"] = "Pawn";
    })(PieceType = exports.PieceType || (exports.PieceType = {}));
    var PieceColor;
    (function (PieceColor) {
        PieceColor["WHITE"] = "White";
        PieceColor["BLACK"] = "Black";
    })(PieceColor = exports.PieceColor || (exports.PieceColor = {}));
    var Piece = /** @class */ (function () {
        function Piece(color) {
            this.color = color;
        }
        return Piece;
    }());
    exports.Piece = Piece;
    var King = /** @class */ (function (_super) {
        __extends(King, _super);
        function King(color) {
            var _this = _super.call(this, color) || this;
            _this.type = PieceType.KING;
            _this.allowedMoves = [MoveType.VERTICAL, MoveType.HORIZONTAL, MoveType.DIAGONAL];
            _this.moveDistance = MoveDistance.ONE;
            _this.value = 6;
            _this.text = color === PieceColor.BLACK ? '♚' : '♔';
            _this.captureMoves = _this.allowedMoves;
            return _this;
        }
        return King;
    }(Piece));
    var Queen = /** @class */ (function (_super) {
        __extends(Queen, _super);
        function Queen(color) {
            var _this = _super.call(this, color) || this;
            _this.type = PieceType.QUEEN;
            _this.allowedMoves = [MoveType.VERTICAL, MoveType.HORIZONTAL, MoveType.DIAGONAL];
            _this.moveDistance = MoveDistance.UNLIMITED;
            _this.value = 5;
            _this.text = color === PieceColor.BLACK ? '♛' : '♕';
            _this.captureMoves = _this.allowedMoves;
            return _this;
        }
        return Queen;
    }(Piece));
    var Bishop = /** @class */ (function (_super) {
        __extends(Bishop, _super);
        function Bishop(color) {
            var _this = _super.call(this, color) || this;
            _this.type = PieceType.BISHOP;
            _this.allowedMoves = [MoveType.DIAGONAL];
            _this.moveDistance = MoveDistance.UNLIMITED;
            _this.value = 3;
            _this.text = color === PieceColor.BLACK ? '♝' : '♗';
            _this.captureMoves = _this.allowedMoves;
            return _this;
        }
        return Bishop;
    }(Piece));
    var Knight = /** @class */ (function (_super) {
        __extends(Knight, _super);
        function Knight(color) {
            var _this = _super.call(this, color) || this;
            _this.type = PieceType.KNIGHT;
            _this.allowedMoves = [MoveType.LSHAPE];
            _this.moveDistance = MoveDistance.THREE;
            _this.value = 3;
            _this.text = color === PieceColor.BLACK ? '♞' : '♘';
            _this.captureMoves = _this.allowedMoves;
            return _this;
        }
        return Knight;
    }(Piece));
    var Rook = /** @class */ (function (_super) {
        __extends(Rook, _super);
        function Rook(color) {
            var _this = _super.call(this, color) || this;
            _this.type = PieceType.ROOK;
            _this.allowedMoves = [MoveType.VERTICAL, MoveType.HORIZONTAL];
            _this.moveDistance = MoveDistance.UNLIMITED;
            _this.value = 3;
            _this.text = color === PieceColor.BLACK ? '♜' : '♖';
            _this.captureMoves = _this.allowedMoves;
            return _this;
        }
        return Rook;
    }(Piece));
    var Pawn = /** @class */ (function (_super) {
        __extends(Pawn, _super);
        function Pawn(color) {
            var _this = _super.call(this, color) || this;
            _this.type = PieceType.PAWN;
            _this.allowedMoves = [MoveType.VERTICAL, MoveType.HORIZONTAL, MoveType.DIAGONAL];
            /** ONE_OR_TWO to start, then ONE after initial move. */
            _this.moveDistance = MoveDistance.ONE_OR_TWO;
            _this.value = 1;
            _this.text = color === PieceColor.BLACK ? '♟︎' : '♙';
            _this.captureMoves = [MoveType.DIAGONAL];
            return _this;
        }
        return Pawn;
    }(Piece));
    var Board = /** @class */ (function () {
        function Board(debug) {
            if (debug === void 0) { debug = false; }
            this.debug = debug;
            this.turn = PieceColor.WHITE;
            var spaces = new Array(64);
            // Row 0
            spaces[0] = new Rook(PieceColor.BLACK);
            spaces[1] = new Knight(PieceColor.BLACK);
            spaces[2] = new Bishop(PieceColor.BLACK);
            spaces[3] = new Queen(PieceColor.BLACK);
            spaces[4] = new King(PieceColor.BLACK);
            spaces[5] = new Bishop(PieceColor.BLACK);
            spaces[6] = new Knight(PieceColor.BLACK);
            spaces[7] = new Rook(PieceColor.BLACK);
            // Row 1
            spaces[8] = new Pawn(PieceColor.BLACK);
            spaces[9] = new Pawn(PieceColor.BLACK);
            spaces[10] = new Pawn(PieceColor.BLACK);
            spaces[11] = new Pawn(PieceColor.BLACK);
            spaces[12] = new Pawn(PieceColor.BLACK);
            spaces[13] = new Pawn(PieceColor.BLACK);
            spaces[14] = new Pawn(PieceColor.BLACK);
            spaces[15] = new Pawn(PieceColor.BLACK);
            // Row 6
            spaces[48] = new Pawn(PieceColor.WHITE);
            spaces[49] = new Pawn(PieceColor.WHITE);
            spaces[50] = new Pawn(PieceColor.WHITE);
            spaces[51] = new Pawn(PieceColor.WHITE);
            spaces[52] = new Pawn(PieceColor.WHITE);
            spaces[53] = new Pawn(PieceColor.WHITE);
            spaces[54] = new Pawn(PieceColor.WHITE);
            spaces[55] = new Pawn(PieceColor.WHITE);
            // Row 7
            spaces[56] = new Rook(PieceColor.WHITE);
            spaces[57] = new Knight(PieceColor.WHITE);
            spaces[58] = new Bishop(PieceColor.WHITE);
            spaces[59] = new Queen(PieceColor.WHITE);
            spaces[60] = new King(PieceColor.WHITE);
            spaces[61] = new Bishop(PieceColor.WHITE);
            spaces[62] = new Knight(PieceColor.WHITE);
            spaces[63] = new Rook(PieceColor.WHITE);
            this.spaces = spaces;
        }
        Board.prototype.getSpaces = function () { return this.spaces; };
        Board.prototype.isValidMove = function (location, destination) {
            this.log("location: ".concat(location, ", destination: ").concat(destination));
            // Basic check.
            if (location === destination)
                return false;
            // Are location and destination valid places on the board?
            if (location < 0 || location > 63 || destination < 0 || destination > 63)
                return false;
            // Does a piece exist at location?
            var piece = this.spaces[location] || null;
            if (piece === null)
                return false;
            this.log(JSON.stringify(piece));
            // Does this piece belong to player?
            if (piece.color !== this.turn)
                return false;
            this.log("turn: ".concat(this.turn, ", piece: ").concat(this.turn));
            // Which direction?
            var direction = ((0, utility_1.isVertical)(location, destination) ? MoveType.VERTICAL :
                (0, utility_1.isHorizontal)(location, destination) ? MoveType.HORIZONTAL :
                    (0, utility_1.isDiagonal)(location, destination) ? MoveType.DIAGONAL :
                        (0, utility_1.isLShape)(location, destination) ? MoveType.LSHAPE :
                            null);
            this.log("direction: ".concat(direction));
            // Is direction null?
            if (direction === null)
                return false;
            // Is direction allowed by piece?
            if (!piece.allowedMoves.includes(direction))
                return false;
            // Is the distance proper?
            // ONE_OR_TWO (PAWN)
            if (piece.moveDistance === MoveDistance.ONE_OR_TWO) {
                if (destination > location) {
                    if (direction === MoveType.VERTICAL
                        && (destination !== location + 8
                            && destination !== location + 16))
                        return false;
                    // Must only be distance of 'ONE' for diagonal (attacking).
                    if (direction === MoveType.DIAGONAL
                        && utility_1.DISTANCES_DIAGONAL.includes(destination - location))
                        return false;
                }
                else if (location > destination) {
                    if (direction === MoveType.VERTICAL
                        && destination !== location - 8
                        && destination !== location - 16)
                        return false;
                    // Must only be distance of 'ONE' for diagonal (attacking).
                    if (direction === MoveType.DIAGONAL
                        && utility_1.DISTANCES_DIAGONAL.includes(location - destination))
                        return false;
                }
            }
            // ONE (PAWN, KING)
            if (piece.moveDistance === MoveDistance.ONE) {
                if (destination > location) {
                    if (direction === MoveType.VERTICAL
                        && destination !== location + 8)
                        return false;
                    if (direction === MoveType.HORIZONTAL
                        && destination !== location + 1)
                        return false;
                    if (direction === MoveType.DIAGONAL
                        && utility_1.DISTANCES_DIAGONAL.includes(destination - location))
                        return false;
                }
                else if (location > destination) {
                    if (direction === MoveType.VERTICAL
                        && destination !== location - 8)
                        return false;
                    if (direction === MoveType.HORIZONTAL
                        && destination !== location - 1)
                        return false;
                    if (direction === MoveType.DIAGONAL
                        && utility_1.DISTANCES_DIAGONAL.includes(location - destination))
                        return false;
                }
            }
            // UNLIMITED
            // THREE
            // Are there any pieces in the way?
            // TODO: Check diagonal distances.
            if (destination > location) {
                if (direction === MoveType.VERTICAL) {
                    var toCheck = location + 8;
                    while (destination !== toCheck && toCheck < 64) {
                        if (this.spaces[toCheck] !== undefined) {
                            return false;
                        }
                        toCheck += 8;
                    }
                }
                else if (direction === MoveType.HORIZONTAL) {
                    var toCheck = location + 1;
                    while (destination !== toCheck && toCheck < 64) {
                        if (this.spaces[toCheck] !== undefined) {
                            return false;
                        }
                        toCheck += 1;
                    }
                }
                else if (direction === MoveType.DIAGONAL) {
                    // TODO - two 'directions'
                }
            }
            else {
                if (direction === MoveType.VERTICAL) {
                    var toCheck = location - 8;
                    while (destination !== toCheck && toCheck > -1) {
                        if (this.spaces[toCheck] !== undefined) {
                            return false;
                        }
                        toCheck -= 8;
                    }
                }
                else if (direction === MoveType.HORIZONTAL) {
                    var toCheck = location - 1;
                    while (destination !== toCheck && toCheck > -1) {
                        if (this.spaces[toCheck] !== undefined) {
                            return false;
                        }
                        toCheck -= 1;
                    }
                }
                else if (direction === MoveType.DIAGONAL) {
                    // TODO - two 'directions'
                }
            }
            // Is piece capturing another piece, and is this allowed?
            // Really just for sneaky Pawns who are trying to capture Vertically.
            if (this.spaces[destination] !== undefined
                && !piece.captureMoves.includes(direction)) {
                this.error('Piece cannot capture that direction');
                return false;
            }
            this.log('Valid move');
            // TODO: Does this move leave the player's King in check?
            // Move is valid.
            return true;
        };
        Board.prototype.makeMove = function (location, destination) {
            // Does piece exist at destination?
            if (this.spaces[destination] !== undefined) {
                // TODO: Capture piece.
            }
            this.spaces[destination] = this.spaces[location];
            if (this.spaces[destination].type === PieceType.PAWN) {
                // Just blindly reset Pawn's moveDistance to ONE every time.
                this.spaces[destination].moveDistance = MoveDistance.ONE;
            }
            this.spaces[location] = undefined;
            this.turn =
                this.turn === PieceColor.WHITE
                    ? PieceColor.BLACK : PieceColor.WHITE;
        };
        /** Prints the current state of the spaces. */
        Board.prototype.print = function () {
            var sp = this.spaces;
            var str = '';
            var letterCount = 0;
            var rowCount = 8;
            // · _
            // terminal('   a b c d e f g h  \n');
            for (var g = 0; g < 64; g++) {
                str += sp[g] ? ' ' + sp[g].text : ' ·';
                if (++letterCount === 8) {
                    // terminal(`${rowCount} ${str}  ${rowCount--} \n`);
                    str = '';
                    letterCount = 0;
                }
            }
            // terminal('   a b c d e f g h  \n');
        };
        Board.prototype.formatBoard = function () {
            var sp = this.spaces;
            var str = "";
            var letterCount = 0;
            var rowCount = 8;
            // · _
            str += "   a b c d e f g h  \n";
            var temp = "";
            for (var g = 0; g < 64; g++) {
                temp += sp[g] ? ' ' + sp[g].text : ' ·';
                if (++letterCount === 8) {
                    str += "".concat(rowCount, " ").concat(temp, "  ").concat(rowCount--, " \n");
                    temp = '';
                    letterCount = 0;
                }
            }
            str += "   a b c d e f g h  \n";
            return str;
        };
        Board.prototype.log = function (str) {
            if (this.debug) {
                // terminal.yellow(str + '\n');
            }
        };
        Board.prototype.error = function (str) {
            if (this.debug) {
                // terminal.red(str + '\n');
            }
        };
        return Board;
    }());
    exports.Board = Board;
});
define("main", ["require", "exports", "chess", "terminal-kit", "utility"], function (require, exports, chess_1, terminal_kit_1, utility_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function main() {
        return __awaiter(this, void 0, void 0, function () {
            var rawInput, location, destination, arrayLocation, arrayDestination, board;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        board = new chess_1.Board(true);
                        board.print();
                        _a.label = 1;
                    case 1:
                        if (!true) return [3 /*break*/, 3];
                        terminal_kit_1.terminal.green("It's ".concat(board.turn, "'s turn\n"));
                        (0, terminal_kit_1.terminal)('Enter your move: ');
                        return [4 /*yield*/, terminal_kit_1.terminal.inputField({}).promise];
                    case 2:
                        rawInput = _a.sent();
                        (0, terminal_kit_1.terminal)('\n');
                        if (rawInput.toLowerCase() === 'exit')
                            return [3 /*break*/, 3];
                        location = rawInput.slice(0, 2);
                        destination = rawInput.slice(3, 5);
                        arrayLocation = (0, utility_2.translateLocationToIndex)(location);
                        arrayDestination = (0, utility_2.translateLocationToIndex)(destination);
                        if (board.isValidMove(arrayLocation, arrayDestination)) {
                            board.makeMove(arrayLocation, arrayDestination);
                        }
                        else {
                            terminal_kit_1.terminal.red('Move is not valid: ' + rawInput + '\n');
                        }
                        board.print();
                        return [3 /*break*/, 1];
                    case 3:
                        terminal_kit_1.terminal.red('gg no re\n');
                        process.exit();
                        return [2 /*return*/];
                }
            });
        });
    }
    // a1 b2
    main();
});
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
define("web", ["require", "exports", "./build/chess", "./build/utility"], function (require, exports, chess_2, utility_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    (function () {
        /* ... */
        console.log('dis worked');
    })();
    var board;
    function main() {
        board = new chess_2.Board(true);
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
        var arrayLocation = (0, utility_3.translateLocationToIndex)(location);
        var arrayDestination = (0, utility_3.translateLocationToIndex)(destination);
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
});
//# sourceMappingURL=build.js.map