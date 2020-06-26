export default class Cell {

    row: number;

    col: number;

    value: string | number;

    possibleValues: Array<number>;

    subgrid: Array<Array<Cell>> | undefined;

    peers: Array<Cell> | undefined;

    constructor(row: number, col: number, value: string | number = 0) {
        this.value = value || 0;
        this.row = row;
        this.col = col;
        if (value === ".") {
            this.value = 0;
        } else if (typeof value === 'string') {
            this.value = parseInt(value, 10);
        }

        this.possibleValues = [];
    }

    toString() {
        return this.value || ".";
    }
}
