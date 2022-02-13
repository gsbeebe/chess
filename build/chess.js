"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = exports.Piece = void 0;
const utility_1 = require("./utility");
const terminal_kit_1 = require("terminal-kit");
var MoveType;
(function (MoveType) {
    MoveType[MoveType["VERTICAL"] = 0] = "VERTICAL";
    MoveType[MoveType["HORIZONTAL"] = 1] = "HORIZONTAL";
    MoveType[MoveType["DIAGONAL"] = 2] = "DIAGONAL";
    MoveType[MoveType["LSHAPE"] = 3] = "LSHAPE";
    MoveType[MoveType["EN_PASSANT"] = 4] = "EN_PASSANT";
})(MoveType || (MoveType = {}));
var MoveDistance;
(function (MoveDistance) {
    MoveDistance[MoveDistance["ONE"] = 0] = "ONE";
    MoveDistance[MoveDistance["ONE_OR_TWO"] = 1] = "ONE_OR_TWO";
    MoveDistance[MoveDistance["THREE"] = 2] = "THREE";
    MoveDistance[MoveDistance["UNLIMITED"] = 3] = "UNLIMITED";
})(MoveDistance || (MoveDistance = {}));
var PieceType;
(function (PieceType) {
    PieceType[PieceType["KING"] = 0] = "KING";
    PieceType[PieceType["QUEEN"] = 1] = "QUEEN";
    PieceType[PieceType["BISHOP"] = 2] = "BISHOP";
    PieceType[PieceType["KNIGHT"] = 3] = "KNIGHT";
    PieceType[PieceType["ROOK"] = 4] = "ROOK";
    PieceType[PieceType["PAWN"] = 5] = "PAWN";
})(PieceType || (PieceType = {}));
var PieceColor;
(function (PieceColor) {
    PieceColor[PieceColor["WHITE"] = 0] = "WHITE";
    PieceColor[PieceColor["BLACK"] = 1] = "BLACK";
})(PieceColor || (PieceColor = {}));
class Piece {
    constructor(color) {
        this.color = color;
    }
}
exports.Piece = Piece;
class King extends Piece {
    constructor(color) {
        super(color);
        this.type = PieceType.KING;
        this.allowedMoves = [MoveType.VERTICAL, MoveType.HORIZONTAL, MoveType.DIAGONAL];
        this.value = 6;
        this.text = color === PieceColor.BLACK ? '♚' : '♔';
    }
}
class Queen extends Piece {
    constructor(color) {
        super(color);
        this.type = PieceType.QUEEN;
        this.allowedMoves = [MoveType.VERTICAL, MoveType.HORIZONTAL, MoveType.DIAGONAL];
        this.value = 5;
        this.text = color === PieceColor.BLACK ? '♛' : '♕';
    }
}
class Bishop extends Piece {
    constructor(color) {
        super(color);
        this.type = PieceType.BISHOP;
        this.allowedMoves = [MoveType.DIAGONAL];
        this.value = 3;
        this.text = color === PieceColor.BLACK ? '♝' : '♗';
    }
}
class Knight extends Piece {
    constructor(color) {
        super(color);
        this.type = PieceType.KNIGHT;
        this.allowedMoves = [MoveType.LSHAPE];
        this.value = 3;
        this.text = color === PieceColor.BLACK ? '♞' : '♘';
    }
}
class Rook extends Piece {
    constructor(color) {
        super(color);
        this.type = PieceType.ROOK;
        this.allowedMoves = [MoveType.VERTICAL, MoveType.HORIZONTAL];
        this.value = 3;
        this.text = color === PieceColor.BLACK ? '♜' : '♖';
    }
}
class Pawn extends Piece {
    constructor(color) {
        super(color);
        this.type = PieceType.PAWN;
        this.allowedMoves = [MoveType.VERTICAL, MoveType.HORIZONTAL, MoveType.DIAGONAL];
        this.value = 1;
        this.text = color === PieceColor.BLACK ? '♟︎' : '♙';
    }
}
class Board {
    constructor() {
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
        terminal_kit_1.terminal.red('got this far');
        terminal_kit_1.terminal.red(`loc ${location}, dest ${destination} \n`);
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
        // Does this piece belong to player?
        if (piece.color !== this.turn)
            return false;
        // Which direction?
        const direction = ((0, utility_1.isVertical)(location, destination) ? MoveType.VERTICAL :
            (0, utility_1.isHorizontal)(location, destination) ? MoveType.HORIZONTAL :
                (0, utility_1.isDiagonal)(location, destination) ? MoveType.DIAGONAL :
                    (0, utility_1.isLShape)(location, destination) ? MoveType.LSHAPE :
                        null);
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
                terminal_kit_1.terminal.red('got this far');
                terminal_kit_1.terminal.red(`loc ${location}, dest ${destination} \n`);
                if (direction === MoveType.VERTICAL
                    && (destination !== location - 8
                        && destination !== location - 16))
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
        if (destination > location) {
            if (direction === MoveType.VERTICAL) {
                let toCheck = location + 8;
                while (destination !== toCheck && toCheck < 64) {
                    if (this.spaces[toCheck] !== null) {
                        return false;
                    }
                    toCheck += 8;
                }
            }
            else if (direction === MoveType.HORIZONTAL) {
                let toCheck = location + 1;
                while (destination !== toCheck && toCheck < 64) {
                    if (this.spaces[toCheck] !== null) {
                        return false;
                    }
                    toCheck += 1;
                }
            }
        }
        else {
            if (direction === MoveType.VERTICAL) {
                let toCheck = location - 8;
                while (destination !== toCheck && toCheck > -1) {
                    if (this.spaces[toCheck] !== null) {
                        return false;
                    }
                    toCheck -= 8;
                }
            }
            else if (direction === MoveType.HORIZONTAL) {
                let toCheck = location - 1;
                while (destination !== toCheck && toCheck > -1) {
                    if (this.spaces[toCheck] !== null) {
                        return false;
                    }
                    toCheck -= 1;
                }
            }
        }
        // TODO: Does this move leave the player's King in check?
        // Move is valid.
        return true;
    }
    makeMove(location, destination) {
        // Does piece exist at destination?
        if (this.spaces[destination] !== null) {
            // TODO: Capture piece.
        }
        this.spaces[destination] = this.spaces[location];
        if (this.spaces[destination].type === PieceType.PAWN) {
            // Just blindly reset Pawn's moveDistance to ONE every time.
            this.spaces[destination].moveDistance = MoveDistance.ONE;
        }
        this.spaces[location] = null;
    }
    /** Prints the current state of the spaces. */
    print() {
        const sp = this.spaces;
        let str = '';
        let letterCount = 0;
        let rowCount = 8;
        // · _
        (0, terminal_kit_1.terminal)('   a b c d e f g h  \n');
        for (let g = 0; g < 64; g++) {
            str += sp[g] ? ' ' + sp[g].text : ' ·';
            if (++letterCount === 8) {
                (0, terminal_kit_1.terminal)(`${rowCount} ${str}  ${rowCount--} \n`);
                str = '';
                letterCount = 0;
            }
        }
        (0, terminal_kit_1.terminal)('   a b c d e f g h  \n');
    }
}
exports.Board = Board;
