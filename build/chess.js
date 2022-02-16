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
import { isVertical, isHorizontal, isDiagonal, isLShape, DISTANCES_DIAGONAL } from './utility';
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
export var PieceType;
(function (PieceType) {
    PieceType["KING"] = "King";
    PieceType["QUEEN"] = "Queen";
    PieceType["BISHOP"] = "Bishop";
    PieceType["KNIGHT"] = "Knight";
    PieceType["ROOK"] = "Rook";
    PieceType["PAWN"] = "Pawn";
})(PieceType || (PieceType = {}));
export var PieceColor;
(function (PieceColor) {
    PieceColor["WHITE"] = "White";
    PieceColor["BLACK"] = "Black";
})(PieceColor || (PieceColor = {}));
var Piece = /** @class */ (function () {
    function Piece(color) {
        this.color = color;
    }
    return Piece;
}());
export { Piece };
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
        var direction = (isVertical(location, destination) ? MoveType.VERTICAL :
            isHorizontal(location, destination) ? MoveType.HORIZONTAL :
                isDiagonal(location, destination) ? MoveType.DIAGONAL :
                    isLShape(location, destination) ? MoveType.LSHAPE :
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
                    && DISTANCES_DIAGONAL.includes(destination - location))
                    return false;
            }
            else if (location > destination) {
                if (direction === MoveType.VERTICAL
                    && destination !== location - 8
                    && destination !== location - 16)
                    return false;
                // Must only be distance of 'ONE' for diagonal (attacking).
                if (direction === MoveType.DIAGONAL
                    && DISTANCES_DIAGONAL.includes(location - destination))
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
                    && DISTANCES_DIAGONAL.includes(destination - location))
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
                    && DISTANCES_DIAGONAL.includes(location - destination))
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
export { Board };
