"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLShape = exports.isDiagonal = exports.isHorizontal = exports.isVertical = exports.getRow = exports.getColumn = exports.NUM_SPACES = exports.NUM_ROWS = exports.NUM_COLUMNS = void 0;
// Constants
exports.NUM_COLUMNS = 8;
exports.NUM_ROWS = 8;
exports.NUM_SPACES = 64;
const DISTANCE_DIAGONAL = 7;
const DISTANCES_L = [];
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
/** Determine if the destination is diagonal from the start. */
function isVertical(start, destination) {
    return getColumn(start) === getColumn(destination);
}
exports.isVertical = isVertical;
/** Determine if the destination in in the same row as the start. */
function isHorizontal(start, destination) {
    return getRow(start) === getRow(destination);
}
exports.isHorizontal = isHorizontal;
/** Determine if the destination is diagonal from the start. */
function isDiagonal(start, destination) {
    if (start > destination) {
        return start % destination === DISTANCE_DIAGONAL;
    }
    if (destination > start) {
        return destination % start === DISTANCE_DIAGONAL;
    }
    // They are the same, which also can't happen lololol.
    return false;
}
exports.isDiagonal = isDiagonal;
/** Determine if the destination is an L shape from the start, for Knights. */
function isLShape(start, destination) {
    return DISTANCES_L.includes(Math.abs(start - destination));
}
exports.isLShape = isLShape;
/** Determines which character to print for a given piece. */
