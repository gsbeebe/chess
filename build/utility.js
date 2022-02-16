"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Constants
exports.NUM_COLUMNS = 8;
exports.NUM_ROWS = 8;
exports.NUM_SPACES = 64;
exports.DISTANCES_DIAGONAL = [7, 9];
const DISTANCES_L = [6, 10, 15, 17];
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
    const diff = Math.abs(destination - location);
    console.log(`diff ${diff} diff mod 7 ${diff % 7} diff mod 9 ${diff % 9}`);
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
const columnLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const rowNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
const rowToArrRow = { 8: 0, 7: 1, 6: 2, 5: 3, 4: 4, 3: 5, 2: 6, 1: 7 };
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
    return (rowToArrRow[row] * exports.NUM_ROWS) + columnIndex;
}
exports.translateLocationToIndex = translateLocationToIndex;
// test: a8; row = 8; columnIndex = 0; (0*8)+0 = 0;
// test: b8; row = 8; columnIndex = 1; (0*8)+1 = 1;
// test: a1; row = 1; columnIndex = 0; (7*8)+0 = 56;
// test: h7; row = 7; columnIndex = 7; (1*8)+7 = 15;
// test: h8; row = 8; columnIndex = 7; (0*8)+7 = 7;
