declare module "utility" {
    export const NUM_COLUMNS = 8;
    export const NUM_ROWS = 8;
    export const NUM_SPACES = 64;
    export const DISTANCES_DIAGONAL: number[];
    /** Get the column of any given point. */
    export function getColumn(position: number): number;
    /** Get the row of any given point. */
    export function getRow(position: number): number;
    /** Determine if the destination is diagonal from the location. */
    export function isVertical(location: number, destination: number): boolean;
    /** Determine if the destination in in the same row as the location. */
    export function isHorizontal(location: number, destination: number): boolean;
    /** Determine if the destination is diagonal from the location. */
    export function isDiagonal(location: number, destination: number): boolean;
    /** Determine if the destination is an L shape from the location, for Knights. */
    export function isLShape(location: any, destination: any): boolean;
    /** Translate board location to array location. */
    export function translateLocationToIndex(location: string): number;
}
declare module "chess" {
    enum MoveType {
        VERTICAL = "Vertical",
        HORIZONTAL = "Horizontal",
        DIAGONAL = "Diagonal",
        LSHAPE = "LShape",
        EN_PASSANT = "EnPassant"
    }
    enum MoveDistance {
        ONE = "One",
        ONE_OR_TWO = "OneOrTwo",
        THREE = "Three",
        UNLIMITED = "Unlimited"
    }
    export enum PieceType {
        KING = "King",
        QUEEN = "Queen",
        BISHOP = "Bishop",
        KNIGHT = "Knight",
        ROOK = "Rook",
        PAWN = "Pawn"
    }
    export enum PieceColor {
        WHITE = "White",
        BLACK = "Black"
    }
    export class Piece {
        type: PieceType;
        allowedMoves: MoveType[];
        captureMoves: MoveType[];
        value: number;
        color: PieceColor;
        moveDistance: MoveDistance;
        text: string;
        constructor(color: PieceColor);
    }
    export class Board {
        turn: PieceColor;
        private spaces;
        debug: boolean;
        constructor(debug?: boolean);
        getSpaces(): Piece[];
        isValidMove(location: number, destination: number): boolean;
        makeMove(location: number, destination: number): void;
        /** Prints the current state of the spaces. */
        print(): void;
        formatBoard(): string;
        private log;
        private error;
    }
}
declare module "main" { }
declare module "web" { }
//# sourceMappingURL=build.d.ts.map