import { useState } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import Footer from "./components/Footer/Footer";
import TitleNeon from "./components/TitleNeon/TitleNeon";
import { useBoard } from "./hooks/useBoard";
import { Level } from "./types/types";
import { levels } from "./utils/levels";
import LevelSelector from "./components/LevelSelector";

function App() {
  const [level, setLevel] = useState<Level>(levels.beginner);

  const {
    board,
    gameStatus,
    handleRevealCell,
    handleUpdateFlag,
    handleRestartGame,
  } = useBoard(level.rows, level.columns, level.mines);
  return (
    <div className="App">
      <div className="minesweeper">
        <TitleNeon
          title="Minesweeper"
          tag="h1"
          color={
            gameStatus === "lose"
              ? "red"
              : gameStatus === "win"
              ? "green"
              : "white"
          }
        />

        <LevelSelector setLevel={setLevel} restartGame={handleRestartGame} />

        <main className="main">
          <Board
            addFlag={handleUpdateFlag}
            revealCell={handleRevealCell}
            table={board}
          />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
