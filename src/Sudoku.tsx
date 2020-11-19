import React, { useState } from "react";
import ReactDOM from "react-dom";
import Grid from "./grid";
import Solver from "./solver";
import Cell from "./cell";

import "./index.css";

type CellValueChangeListener = (row: number, col: number, value: number) => void;
type SquareProps = { row: number, col: number, value: string | number, onCellValueChange: CellValueChangeListener }; 

const Square = ({ row, col, value, onCellValueChange }: SquareProps) => (
    <input
    	type="text"
      	value={value === 0 ? "" : value}
      	maxLength={1}
      	onChange={(evt: any) => {
        	const value: number = evt.target.value;
        	onCellValueChange(row, col, value);
      	}}
    />
);

type SudokuBoardProps = { puzzleGrid: Grid, onCellValueChange: CellValueChangeListener };
const SudukoBoard = ({ puzzleGrid, onCellValueChange }: SudokuBoardProps) => (
    <table className="sudoku">
        <tbody>
        { puzzleGrid.rows.map((row: Array<Cell>, idx) => (
            <tr key={idx}>
                { row.map(cell => (
                    <td key={cell.col}>
                        <Square
                            value={cell.value}
                            row={cell.row}
                            col={cell.col}
                            onCellValueChange={onCellValueChange}
                        />
                    </td>
                )) }
            </tr>
        )) }
        </tbody>
    </table>
);

type SudokuGameProps = { board: string };

function SudokuGame({ board }: SudokuGameProps) {
    const [puzzle, setPuzzle] = useState(new Grid(board));

    function solve() {
        new Solver(puzzle).solve();
        setPuzzle(new Grid(puzzle.toFlatString()));
    }

    function onCellValueEdited(row: number, col: number, value: number) {
        const newGrid = new Grid(puzzle.toFlatString());
        newGrid.rows[row][col].value = value;
        setPuzzle(newGrid);
    }

    return (
        <div className="game">
            <h1>Sudoku Solver</h1>
            <SudukoBoard
                puzzleGrid={puzzle}
                onCellValueChange={onCellValueEdited}
            />

            <div className="buttons">
                <button onClick={solve}>Solve It!</button>
                <button onClick={() => setPuzzle(new Grid())}>Clear All</button>
            </div>
        </div>
    );
}


ReactDOM.render(
  <SudokuGame board="4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......" />,
  document.getElementById("app")
);
