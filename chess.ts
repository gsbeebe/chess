const board = [64];

//
// 0   0  1  2  3  4  5  6  7 
// 1   8  9  10 11 12 13 14 15
// 2   16 17 18 19 20 21 22 23
// 3   24 25 26 27 28 29 30 31
// 4   32 33 34 35 36 37 38 39
// 5   40 41 42 43 44 45 46 47
// 6   48 49 50 51 52 53 54 55
// 7   56 57 58 59 60 61 62 63

const numRows = 8; 
const numCols = 8;
//
function getCol(position) {
    return position % 8;
}
//
function getRow(position) {
    return Math.floor(position / 8);
}
//
function isVertical(p1, p2) {
    return getCol(p1) === getCol(p2);
}
//
function isHorizontal(p1, p2) {
    return getRow(p1) === getRow(p2);
}
// To determine if one point is diagonal from another.
function isDiagonal(pt1, pt2) {
    if(pt1 > pt2) {
        return pt1%pt2 === 7;
    }
    if(pt2 > pt1) {
        return pt2%pt1 === 7;
    }
    // They are the same, which also can't happen lololol.
    return false;
}
//
function isLShape(p1, p2) {
    return [6, 10, 15, 17].includes(Math.abs(p1-p2));
}

enum MoveType {
    VERTICAL,
    HORIZONTAL,
    DIAGONAL,
    LSHAPE,
    EN_PASSANT,
}

enum MoveDistance {
    ONE,
    THREE,
    UNLIMITED,
}

enum PieceType {
    KING,
    QUEEN,
    BISHOP,
    KNIGHT,
    ROOK,
    PAWN,
}

enum PieceColor {
    WHITE,
    BLACK,
}

class Piece {
    type: PieceType;
    allowedMoves: MoveType[];
    value: number;
    color: PieceColor;
    moveDistance: MoveDistance;
    constructor(color: PieceColor) {
        this.color = color;
    }
}

class King extends Piece {
    type = PieceType.KING;
    allowedMoves = [MoveType.VERTICAL, MoveType.HORIZONTAL, MoveType.DIAGONAL];
    moveDistance: MoveDistance.ONE;
    value = 6;
}

class Queen extends Piece {
    type = PieceType.QUEEN;
    allowedMoves = [MoveType.VERTICAL, MoveType.HORIZONTAL, MoveType.DIAGONAL];
    moveDistance: MoveDistance.UNLIMITED;
    value = 5;
}

class Bishop extends Piece {
    type = PieceType.BISHOP;
    allowedMoves = [MoveType.DIAGONAL];
    moveDistance: MoveDistance.UNLIMITED;
    value = 3;
}

class Knight extends Piece {
    type = PieceType.KNIGHT;
    allowedMoves = [MoveType.LSHAPE];
    moveDistance: MoveDistance.THREE;
    value = 3;
}

class Rook extends Piece {
    type = PieceType.ROOK;
    allowedMoves = [MoveType.VERTICAL, MoveType.HORIZONTAL];
    moveDistance: MoveDistance.UNLIMITED;
    value = 3;
}

class Pawn extends Piece {
    type = PieceType.PAWN;
    allowedMoves = [MoveType.VERTICAL, MoveType.HORIZONTAL, MoveType.DIAGONAL];
    moveDistance: MoveDistance.ONE;
    value = 1;
}

class Board {
    spaces: Piece[]; // or number[][];
    constructor() {
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
        // Basic check.
        if(location === destination) return false;
        // Are location and destination valid places on the board?
        if(location < 0 || location > 63 || destination < 0 || destination > 63) return false;
        // Does a piece exist at location?
        const piece: Piece = this.spaces[location] || null;
        if(piece === null) return false;
        // Does this piece belong to player?
        // Which direction?
        const direction = (isVertical(location, destination) ? MoveType.VERTICAL : 
                            isHorizontal(location, destination) ? MoveType.HORIZONTAL : 
                            isDiagonal(location, destination) ? MoveType.DIAGONAL : 
                            isLShape(location, destination) ? MoveType.LSHAPE : 
                            null);
        // Is direction null?
        if(direction === null) return false;
        // Is direction allowed by piece?
        if(!piece.allowedMoves.includes(direction)) return false;
        // Is the distance proper?
        // ONE
        if(piece.moveDistance === MoveDistance.ONE) {
            if(destination > location) {
                if(direction === MoveType.VERTICAL
                    && destination !== location + 8) return false;
                if(direction === MoveType.HORIZONTAL
                    && destination !== location + 1) return false;
                if(direction === MoveType.DIAGONAL
                    && destination % location !== 7) return false;
            }else if(location > destination) {
                if(direction === MoveType.VERTICAL
                    && destination !== location - 8) return false;
                if(direction === MoveType.HORIZONTAL
                    && destination !== location - 1) return false;
                if(direction === MoveType.DIAGONAL
                    && location % destination !== 7) return false;
            }
        }
        // UNLIMITED
        // THREE
        // Are there any pieces in the way?
        if(destination > location) {
            if(direction === MoveType.VERTICAL) {
                let toCheck = location + 8;
                while(destination !== toCheck && toCheck < 64) {
                    if(this.spaces[toCheck] !== null) {
                        return false;
                    }
                    toCheck += 8;
                }
            } else if(direction === MoveType.HORIZONTAL) {
                let toCheck = location + 1;
                while(destination !== toCheck && toCheck < 64) {
                    if(this.spaces[toCheck] !== null) {
                        return false;
                    }
                    // TODO: toCheck += 8;
                }
            }
        }
    }
}
