var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
System.register("utility", [], function (exports_1, context_1) {
    "use strict";
    var NUM_COLUMNS, NUM_ROWS, NUM_SPACES, DISTANCES_DIAGONAL, DISTANCES_L, columnLetters, rowNumbers, rowToArrRow;
    var __moduleName = context_1 && context_1.id;
    // Functions
    /** Get the column of any given point. */
    function getColumn(position) {
        return position % NUM_COLUMNS;
    }
    exports_1("getColumn", getColumn);
    /** Get the row of any given point. */
    function getRow(position) {
        return Math.floor(position / NUM_ROWS);
    }
    exports_1("getRow", getRow);
    /** Determine if the destination is diagonal from the location. */
    function isVertical(location, destination) {
        return getColumn(location) === getColumn(destination);
    }
    exports_1("isVertical", isVertical);
    /** Determine if the destination in in the same row as the location. */
    function isHorizontal(location, destination) {
        return getRow(location) === getRow(destination);
    }
    exports_1("isHorizontal", isHorizontal);
    /** Determine if the destination is diagonal from the location. */
    function isDiagonal(location, destination) {
        const diff = Math.abs(destination - location);
        console.log(`diff ${diff} diff mod 7 ${diff % 7} diff mod 9 ${diff % 9}`);
        return diff % 7 === 0 || diff % 9 === 0;
        // return DISTANCES_DIAGONAL.includes(modulo);
    }
    exports_1("isDiagonal", isDiagonal);
    /** Determine if the destination is an L shape from the location, for Knights. */
    function isLShape(location, destination) {
        return DISTANCES_L.includes(Math.abs(location - destination));
    }
    exports_1("isLShape", isLShape);
    /** Translate board location to array location. */
    function translateLocationToIndex(location) {
        // Ensure length is exactly 2.
        if (location.length !== 2)
            return -1;
        const column = location[0].toLowerCase();
        const row = Number(location[1]);
        // Ensure column is a value within allowed letters.
        if (!columnLetters.includes(column))
            return -1;
        // Ensure row is a value within allowed numbers.
        if (!rowNumbers.includes(row))
            return -1;
        const columnIndex = columnLetters.indexOf(column);
        // Quick mafs to figure out array index.
        return (rowToArrRow[row] * NUM_ROWS) + columnIndex;
    }
    exports_1("translateLocationToIndex", translateLocationToIndex);
    return {
        setters: [],
        execute: function () {
            // Constants
            exports_1("NUM_COLUMNS", NUM_COLUMNS = 8);
            exports_1("NUM_ROWS", NUM_ROWS = 8);
            exports_1("NUM_SPACES", NUM_SPACES = 64);
            exports_1("DISTANCES_DIAGONAL", DISTANCES_DIAGONAL = [7, 9]);
            DISTANCES_L = [6, 10, 15, 17];
            /** Constants for translating location to array index. */
            columnLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
            rowNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
            rowToArrRow = { 8: 0, 7: 1, 6: 2, 5: 3, 4: 4, 3: 5, 2: 6, 1: 7 };
            // test: a8; row = 8; columnIndex = 0; (0*8)+0 = 0;
            // test: b8; row = 8; columnIndex = 1; (0*8)+1 = 1;
            // test: a1; row = 1; columnIndex = 0; (7*8)+0 = 56;
            // test: h7; row = 7; columnIndex = 7; (1*8)+7 = 15;
            // test: h8; row = 8; columnIndex = 7; (0*8)+7 = 7;
        }
    };
});
System.register("chess", ["utility", "terminal-kit"], function (exports_2, context_2) {
    "use strict";
    var utility_1, terminal_kit_1, MoveType, MoveDistance, PieceType, PieceColor, Piece, King, Queen, Bishop, Knight, Rook, Pawn, Board;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (utility_1_1) {
                utility_1 = utility_1_1;
            },
            function (terminal_kit_1_1) {
                terminal_kit_1 = terminal_kit_1_1;
            }
        ],
        execute: function () {
            (function (MoveType) {
                MoveType["VERTICAL"] = "Vertical";
                MoveType["HORIZONTAL"] = "Horizontal";
                MoveType["DIAGONAL"] = "Diagonal";
                MoveType["LSHAPE"] = "LShape";
                MoveType["EN_PASSANT"] = "EnPassant";
            })(MoveType || (MoveType = {}));
            (function (MoveDistance) {
                MoveDistance["ONE"] = "One";
                MoveDistance["ONE_OR_TWO"] = "OneOrTwo";
                MoveDistance["THREE"] = "Three";
                MoveDistance["UNLIMITED"] = "Unlimited";
            })(MoveDistance || (MoveDistance = {}));
            (function (PieceType) {
                PieceType["KING"] = "King";
                PieceType["QUEEN"] = "Queen";
                PieceType["BISHOP"] = "Bishop";
                PieceType["KNIGHT"] = "Knight";
                PieceType["ROOK"] = "Rook";
                PieceType["PAWN"] = "Pawn";
            })(PieceType || (PieceType = {}));
            exports_2("PieceType", PieceType);
            (function (PieceColor) {
                PieceColor["WHITE"] = "White";
                PieceColor["BLACK"] = "Black";
            })(PieceColor || (PieceColor = {}));
            exports_2("PieceColor", PieceColor);
            Piece = class Piece {
                constructor(color) {
                    this.color = color;
                }
            };
            exports_2("Piece", Piece);
            King = class King extends Piece {
                constructor(color) {
                    super(color);
                    this.type = PieceType.KING;
                    this.allowedMoves = [MoveType.VERTICAL, MoveType.HORIZONTAL, MoveType.DIAGONAL];
                    this.moveDistance = MoveDistance.ONE;
                    this.value = 6;
                    this.text = color === PieceColor.BLACK ? '♚' : '♔';
                    this.captureMoves = this.allowedMoves;
                }
            };
            Queen = class Queen extends Piece {
                constructor(color) {
                    super(color);
                    this.type = PieceType.QUEEN;
                    this.allowedMoves = [MoveType.VERTICAL, MoveType.HORIZONTAL, MoveType.DIAGONAL];
                    this.moveDistance = MoveDistance.UNLIMITED;
                    this.value = 5;
                    this.text = color === PieceColor.BLACK ? '♛' : '♕';
                    this.captureMoves = this.allowedMoves;
                }
            };
            Bishop = class Bishop extends Piece {
                constructor(color) {
                    super(color);
                    this.type = PieceType.BISHOP;
                    this.allowedMoves = [MoveType.DIAGONAL];
                    this.moveDistance = MoveDistance.UNLIMITED;
                    this.value = 3;
                    this.text = color === PieceColor.BLACK ? '♝' : '♗';
                    this.captureMoves = this.allowedMoves;
                }
            };
            Knight = class Knight extends Piece {
                constructor(color) {
                    super(color);
                    this.type = PieceType.KNIGHT;
                    this.allowedMoves = [MoveType.LSHAPE];
                    this.moveDistance = MoveDistance.THREE;
                    this.value = 3;
                    this.text = color === PieceColor.BLACK ? '♞' : '♘';
                    this.captureMoves = this.allowedMoves;
                }
            };
            Rook = class Rook extends Piece {
                constructor(color) {
                    super(color);
                    this.type = PieceType.ROOK;
                    this.allowedMoves = [MoveType.VERTICAL, MoveType.HORIZONTAL];
                    this.moveDistance = MoveDistance.UNLIMITED;
                    this.value = 3;
                    this.text = color === PieceColor.BLACK ? '♜' : '♖';
                    this.captureMoves = this.allowedMoves;
                }
            };
            Pawn = class Pawn extends Piece {
                constructor(color) {
                    super(color);
                    this.type = PieceType.PAWN;
                    this.allowedMoves = [MoveType.VERTICAL, MoveType.HORIZONTAL, MoveType.DIAGONAL];
                    /** ONE_OR_TWO to start, then ONE after initial move. */
                    this.moveDistance = MoveDistance.ONE_OR_TWO;
                    this.value = 1;
                    this.text = color === PieceColor.BLACK ? '♟︎' : '♙';
                    this.captureMoves = [MoveType.DIAGONAL];
                }
            };
            Board = class Board {
                constructor(debug = false) {
                    this.debug = debug;
                    this.turn = PieceColor.WHITE;
                    const spaces = new Array(64);
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
                isValidMove(location, destination) {
                    this.log(`location: ${location}, destination: ${destination}`);
                    // Basic check.
                    if (location === destination)
                        return false;
                    // Are location and destination valid places on the board?
                    if (location < 0 || location > 63 || destination < 0 || destination > 63)
                        return false;
                    // Does a piece exist at location?
                    const piece = this.spaces[location] || null;
                    if (piece === null)
                        return false;
                    this.log(JSON.stringify(piece));
                    // Does this piece belong to player?
                    if (piece.color !== this.turn)
                        return false;
                    this.log(`turn: ${this.turn}, piece: ${this.turn}`);
                    // Which direction?
                    const direction = (utility_1.isVertical(location, destination) ? MoveType.VERTICAL :
                        utility_1.isHorizontal(location, destination) ? MoveType.HORIZONTAL :
                            utility_1.isDiagonal(location, destination) ? MoveType.DIAGONAL :
                                utility_1.isLShape(location, destination) ? MoveType.LSHAPE :
                                    null);
                    this.log(`direction: ${direction}`);
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
                            let toCheck = location + 8;
                            while (destination !== toCheck && toCheck < 64) {
                                if (this.spaces[toCheck] !== undefined) {
                                    return false;
                                }
                                toCheck += 8;
                            }
                        }
                        else if (direction === MoveType.HORIZONTAL) {
                            let toCheck = location + 1;
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
                            let toCheck = location - 8;
                            while (destination !== toCheck && toCheck > -1) {
                                if (this.spaces[toCheck] !== undefined) {
                                    return false;
                                }
                                toCheck -= 8;
                            }
                        }
                        else if (direction === MoveType.HORIZONTAL) {
                            let toCheck = location - 1;
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
                }
                makeMove(location, destination) {
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
                }
                /** Prints the current state of the spaces. */
                print() {
                    const sp = this.spaces;
                    let str = '';
                    let letterCount = 0;
                    let rowCount = 8;
                    // · _
                    terminal_kit_1.terminal('   a b c d e f g h  \n');
                    for (let g = 0; g < 64; g++) {
                        str += sp[g] ? ' ' + sp[g].text : ' ·';
                        if (++letterCount === 8) {
                            terminal_kit_1.terminal(`${rowCount} ${str}  ${rowCount--} \n`);
                            str = '';
                            letterCount = 0;
                        }
                    }
                    terminal_kit_1.terminal('   a b c d e f g h  \n');
                }
                formatBoard() {
                    const sp = this.spaces;
                    let str = ``;
                    let letterCount = 0;
                    let rowCount = 8;
                    // · _
                    str += `   a b c d e f g h  \n`;
                    let temp = ``;
                    for (let g = 0; g < 64; g++) {
                        temp += sp[g] ? ' ' + sp[g].text : ' ·';
                        if (++letterCount === 8) {
                            str += `${rowCount} ${temp}  ${rowCount--} \n`;
                            temp = '';
                            letterCount = 0;
                        }
                    }
                    str += `   a b c d e f g h  \n`;
                    return str;
                }
                log(str) {
                    if (this.debug) {
                        terminal_kit_1.terminal.yellow(str + '\n');
                    }
                }
                error(str) {
                    if (this.debug) {
                        terminal_kit_1.terminal.red(str + '\n');
                    }
                }
            };
            exports_2("Board", Board);
        }
    };
});
System.register("main", ["chess", "terminal-kit", "utility"], function (exports_3, context_3) {
    "use strict";
    var chess_1, terminal_kit_2, utility_2;
    var __moduleName = context_3 && context_3.id;
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
                terminal_kit_2.terminal.green(`It's ${board.turn}'s turn\n`);
                terminal_kit_2.terminal('Enter your move: ');
                rawInput = yield terminal_kit_2.terminal.inputField({}).promise;
                terminal_kit_2.terminal('\n');
                if (rawInput.toLowerCase() === 'exit')
                    break;
                location = rawInput.slice(0, 2);
                destination = rawInput.slice(3, 5);
                arrayLocation = utility_2.translateLocationToIndex(location);
                arrayDestination = utility_2.translateLocationToIndex(destination);
                if (board.isValidMove(arrayLocation, arrayDestination)) {
                    board.makeMove(arrayLocation, arrayDestination);
                }
                else {
                    terminal_kit_2.terminal.red('Move is not valid: ' + rawInput + '\n');
                }
                board.print();
            }
            terminal_kit_2.terminal.red('gg no re\n');
            process.exit();
        });
    }
    return {
        setters: [
            function (chess_1_1) {
                chess_1 = chess_1_1;
            },
            function (terminal_kit_2_1) {
                terminal_kit_2 = terminal_kit_2_1;
            },
            function (utility_2_1) {
                utility_2 = utility_2_1;
            }
        ],
        execute: function () {
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
        }
    };
});
System.register("web", ["chess"], function (exports_4, context_4) {
    "use strict";
    var chess_2;
    var __moduleName = context_4 && context_4.id;
    function main() {
        const board = new chess_2.Board(true);
        const section = document.getElementsByTagName('section')[0];
        section.innerHTML = board.formatBoard();
    }
    function printBoard() { }
    return {
        setters: [
            function (chess_2_1) {
                chess_2 = chess_2_1;
            }
        ],
        execute: function () {
            (() => {
                /* ... */
                console.log('dis worked');
            })();
            main();
        }
    };
});
