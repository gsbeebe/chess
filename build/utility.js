// Constants
export const NUM_COLUMNS = 8;
export const NUM_ROWS = 8;
export const NUM_SPACES = 64;
export const DISTANCES_DIAGONAL = [7, 9];
const DISTANCES_L = [6, 10, 15, 17];
// Functions
/** Get the column of any given point. */
export function getColumn(position) {
    return position % NUM_COLUMNS;
}
/** Get the row of any given point. */
export function getRow(position) {
    return Math.floor(position / NUM_ROWS);
}
/** Determine if the destination is diagonal from the location. */
export function isVertical(location, destination) {
    return getColumn(location) === getColumn(destination);
}
/** Determine if the destination in in the same row as the location. */
export function isHorizontal(location, destination) {
    return getRow(location) === getRow(destination);
}
/** Determine if the destination is diagonal from the location. */
export function isDiagonal(location, destination) {
    const diff = Math.abs(destination - location);
    console.log(`diff ${diff} diff mod 7 ${diff % 7} diff mod 9 ${diff % 9}`);
    return diff % 7 === 0 || diff % 9 === 0;
    // return DISTANCES_DIAGONAL.includes(modulo);
}
/** Determine if the destination is an L shape from the location, for Knights. */
export function isLShape(location, destination) {
    return DISTANCES_L.includes(Math.abs(location - destination));
}
/** Constants for translating location to array index. */
const columnLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const rowNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
const rowToArrRow = { 8: 0, 7: 1, 6: 2, 5: 3, 4: 4, 3: 5, 2: 6, 1: 7 };
/** Translate board location to array location. */
export function translateLocationToIndex(location) {
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
// test: a8; row = 8; columnIndex = 0; (0*8)+0 = 0;
// test: b8; row = 8; columnIndex = 1; (0*8)+1 = 1;
// test: a1; row = 1; columnIndex = 0; (7*8)+0 = 56;
// test: h7; row = 7; columnIndex = 7; (1*8)+7 = 15;
// test: h8; row = 8; columnIndex = 7; (0*8)+7 = 7;
