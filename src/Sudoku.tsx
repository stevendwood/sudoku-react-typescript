import React, { Component } from "react";
import ReactDOM from "react-dom";
import Grid from "./grid";
import Solver from "./solver.js";

import "./index.css";

type CellValueChangeListener = (row: number, col: number, value: number) => void;

type SquareProps = { row: number, col: number, value: number, onCellValueChange: CellValueChangeListener }; 
function Square({ row, col, value, onCellValueChange }: SquareProps) {
  function fireOnChange(evt: any) {
    const value: number = evt.target.value;
    onCellValueChange(row, col, value);
  }

  return (
    <input
      type="text"
      value={value === 0 ? "" : value}
      maxLength={1}
      onChange={fireOnChange}
    />
  );
}

type SudokuBoardProps = { grid: Grid, onCellValueChange: CellValueChangeListener };
function SudukoBoard({ grid, onCellValueChange }: SudokuBoardProps) {

    return (
      <table className="sudoku">
        <tbody>
          {grid.rows.map((row, idx) => {
            return (
              <tr key={idx}>
                {row.map(cell => (
                  <td key={cell.col}>
                    <Square
                      value={cell.value}
                      row={cell.row}
                      col={cell.col}
                      onCellValueChange={onCellValueChange}
                    />
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

type SudokuGameProps = { puzzle: string };
type SudokuGameState = { grid: Grid };
class SudokuGame extends Component<SudokuGameProps, SudokuGameState> {
  constructor(props: SudokuGameProps) {
    super(props);
    const initialState = new Grid(props.puzzle);
    this.state = { grid: initialState };
  }

  solve() {
    new Solver(this.state.grid).solve();
    const solved = this.state.grid.toFlatString();
    this.setState({ grid: new Grid(solved) });
  }

  onCellValueEdited(row: number, col: number, value:number) : void {
    const {grid} = this.state;
    grid.rows[row][col].value = value;
    //this.setState({ grid: new Grid(grid.toFlatString() )});
    this.setState(this.state);
  }

  clearAll() {
    this.setState({ grid: new Grid() });
  }

  render() {
    return (
      <div className="game">
        <h1>Sudoku Solver</h1>
        <SudukoBoard
           grid={this.state.grid}
           onCellValueChange={this.onCellValueEdited.bind(this)}
        />
        <div className="buttons">
          <button onClick={() => this.solve()}>Solve It!</button>
          <button onClick={() => this.clearAll()}>Clear All</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <SudokuGame puzzle="4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......" />,
  document.getElementById("app")
);
