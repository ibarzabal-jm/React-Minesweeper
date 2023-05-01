import { useState } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import Footer from "./components/Footer/Footer";
import TitleNeon from "./components/TitleNeon/TitleNeon";
import { useBoard } from "./hooks/useBoard";
import { Level } from "./types/types";
import { levels } from "./utils/levels";
import LevelSelector from "./components/LevelSelector/LevelSelector";
import GameStatus from "./components/GameStatus/GameStatus";

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
      <main className="container">
        <TitleNeon
          title="Juanma Minesweeper"
          tag="h1"
          color={
            gameStatus === "lose"
              ? "red"
              : gameStatus === "win"
              ? "green"
              : "white"
          }
        />

        <GameStatus status={gameStatus} />
        <Board
          addFlag={handleUpdateFlag}
          revealCell={handleRevealCell}
          table={board}
        />
        <LevelSelector setLevel={setLevel} restartGame={handleRestartGame} />

        <button onClick={handleRestartGame}>
          <TitleNeon tag="span" size="1.5rem" title="Restart" align="center" />
        </button>
      </main>

      <Footer />
    </div>
  );
}

export default App;
