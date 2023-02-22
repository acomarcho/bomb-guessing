import { useState, useEffect } from "react";

const App = () => {
  /*
    States:
      0 = not yet revealed
      1 = revealed, not a bomb
      2 = revealed, a bomb
  */

  const [N, setN] = useState("");
  const [gameN, setGameN] = useState(0);
  const [bombCount, setBombCount] = useState(0);
  const [cleanCount, setCleanCount] = useState(0);
  const [pastScores, setPastScores] = useState([]);
  const [lastTileSelected, setLastTileSelected] = useState([-1000, -1000]);
  const [grid, setGrid] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [bombStart, setBombStart] = useState([-1, -1]);

  const startGame = () => {
    setGrid([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    setLastTileSelected([-1000, -1000]);
    setBombCount(0);
    setCleanCount(0);

    let _N = parseInt(N);
    setGameN(parseInt(N));
    setBombStart([
      Math.floor(Math.random() * (10 - _N - 0 + 1) + 0),
      Math.floor(Math.random() * (10 - _N - 0 + 1) + 0),
    ]);
  };

  useEffect(() => {
    let newGrid = [];
    grid.forEach((row, i) => {
      let newRow = [];
      row.forEach((tile, j) => {
        if (lastTileSelected[0] == i && lastTileSelected[1] == j) {
          if (
            lastTileSelected[0] - bombStart[0] < gameN &&
            lastTileSelected[0] - bombStart[0] >= 0 &&
            lastTileSelected[1] - bombStart[1] < gameN &&
            lastTileSelected[1] - bombStart[1] >= 0
          ) {
            newRow.push(2);
            setBombCount((oldCount) => oldCount + 1);
          } else {
            newRow.push(1);
            setCleanCount((cleanCount) => cleanCount + 1);
          }
        } else {
          newRow.push(tile);
        }
      });
      newGrid.push(newRow);
    });
    setGrid(newGrid);
  }, [lastTileSelected]);

  useEffect(() => {
    if (lastTileSelected[0] != -1000 && bombCount == gameN * gameN) {
      window.alert(`Game finished with ${cleanCount} green tiles revealed.`);
      setPastScores((oldScores) => [...oldScores, cleanCount]);
      setGrid([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ]);
      setLastTileSelected([-1000, -1000]);
      setBombCount(0);
      setCleanCount(0);
      setBombStart([
        Math.floor(Math.random() * (gameN - 0 + 1) + 0),
        Math.floor(Math.random() * (gameN - 0 + 1) + 0),
      ]);
    }
  }, [bombCount]);

  return (
    <div className="centerWrapper">
      <div className="heading">
        <h1>Bomb Guessing Game</h1>
        <p>Within the 10x10 grid, there is placed a NxN bomb inside.</p>
        <p>Your task is to decide where is the bomb located!</p>
        <p>Try to do it with the least number of green squares revealed.</p>
      </div>
      <div className="nInput">
        <div className="formGroup">
          <label>N:</label>
          <input
            type="number"
            placeholder="N"
            value={N}
            onChange={(e) => {
              setN(e.currentTarget.value);
            }}
          />
        </div>
        <button
          onClick={() => {
            if (parseInt(N) > 0 && parseInt(N) <= 10) {
              startGame();
            }
          }}
        >
          Start!
        </button>
      </div>
      <div className="instructions">
        <p>Click on any tile to reveal what's on a grid.</p>
        <p>
          Tiles marked in <span className="spanRed">red</span> contains a bomb.
        </p>
        <p>The game ends once you've successfully marked all the bombs.</p>
      </div>
      {pastScores.length > 0 && (
        <div className="scores">
          <p>Your past scores are:</p>
          <p>{pastScores.join(", ")}</p>
        </div>
      )}
      {gameN > 0 && (
        <div className="game">
          {grid.map((row, i) => {
            return (
              <div className="row">
                {row.map((state, j) => {
                  if (state == 0) {
                    return (
                      <div
                        className="grid"
                        onClick={() => {
                          setLastTileSelected([i, j]);
                        }}
                      ></div>
                    );
                  } else if (state == 1) {
                    return <div className="grid green"></div>;
                  } else if (state == 2) {
                    return <div className="grid red"></div>;
                  }
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default App;
