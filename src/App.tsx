import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

type TCell = {
  row: number;
  col: number;
};

function App() {
  const [grid, setGrid] = useState([
    [1, 3, 2, 6],
    [4, 4, 1, 5],
    [6, 2, 5, 3],
  ]);
  const [reviledGrid, setReviledGrid] = useState(
    new Array(grid.length)
      .fill("")
      .map(() => new Array(grid[0].length).fill(false))
  );

  const [previousClick, setPreviousClick] = useState<TCell | undefined>();

  function handleCardClick(rowIndex: number, numberIndex: number) {
    if (reviledGrid[rowIndex][numberIndex]) return;
    const clickedNumber = grid[rowIndex][numberIndex];
    const newReviledGrid = [...reviledGrid];
    newReviledGrid[rowIndex][numberIndex] = true;
    setReviledGrid(newReviledGrid);
    if (previousClick) {
      const previousClickNumber = grid[previousClick.row][previousClick?.col];
      if (previousClickNumber !== clickedNumber) {
        setTimeout(() => {
          newReviledGrid[rowIndex][numberIndex] = false;
          newReviledGrid[previousClick.row][previousClick.col] = false;
          setReviledGrid([...newReviledGrid]);
        }, 1000);
      } else {
        const hasWon = reviledGrid.flat().every((isReviled) => isReviled);
        setTimeout(() => {
          if (hasWon) {
            alert("Congratulations you have successfully reviled all cards");
          }
        }, 10);
      }
      setPreviousClick(undefined);
    } else {
      setPreviousClick({
        row: rowIndex,
        col: numberIndex,
      });
    }
  }

  return (
    <div className="App">
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((number, numberIndex) => (
              <div
                onClick={() => handleCardClick(rowIndex, numberIndex)}
                key={numberIndex}
                className={
                  "card " +
                  (reviledGrid[rowIndex][numberIndex] ? "reviled" : "")
                }
              >
                {reviledGrid[rowIndex][numberIndex] ? number : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
