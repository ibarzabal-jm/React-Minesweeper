import "./App.css";
import Board from "./components/Board/Board";
import Footer from "./components/Footer/Footer";
import TitleNeon from "./components/TitleNeon/TitleNeon";

function App() {
  return (
    <div className="App">
      <div className="minesweeper">
        <TitleNeon title="Minesweeper" tag="h1" />

        <Board columns={8} mines={5} rows={8} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
