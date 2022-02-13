// Constants
export const NUM_COLUMNS = 8;
export const NUM_ROWS = 8;
export const NUM_SPACES = 64;
const DISTANCE_DIAGONAL = 7;
const DISTANCES_L = [];

// Functions
/** Get the column of any given point. */
export function getColumn(position: number): number {
    return position % NUM_COLUMNS;
}
/** Get the row of any given point. */
export function getRow(position: number): number {
    return Math.floor(position / NUM_ROWS);
}
/** Determine if the destination is diagonal from the start. */
export function isVertical(start: number, destination: number): boolean {
    return getColumn(start) === getColumn(destination);
}
/** Determine if the destination in in the same row as the start. */
export function isHorizontal(start: number, destination: number): boolean {
    return getRow(start) === getRow(destination);
}
/** Determine if the destination is diagonal from the start. */
export function isDiagonal(start: number, destination: number): boolean {
    if(start > destination) {
        return start%destination === DISTANCE_DIAGONAL;
    }
    if(destination > start) {
        return destination%start === DISTANCE_DIAGONAL;
    }
    // They are the same, which also can't happen lololol.
    return false;
}
/** Determine if the destination is an L shape from the start, for Knights. */
export function isLShape(start, destination): boolean {
    return DISTANCES_L.includes(Math.abs(start-destination));
}

/** Determines which character to print for a given piece. */
