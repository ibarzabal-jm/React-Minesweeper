import { Dispatch } from "react";
import { levels } from "../utils/levels";
import TitleNeon from "./TitleNeon/TitleNeon";
import { Level } from "../types/types";

interface LevelSelectorProps {
  setLevel: Dispatch<React.SetStateAction<Level>>;
  restartGame: () => void;
}

const LevelSelector = ({ setLevel, restartGame }: LevelSelectorProps) => {
  return (
    <aside>
      <div className="menu">
        <TitleNeon color="#0f9" tag="h2" title="Select level" align="center" />

        <div className="buttonContainer">
          {Object.values(levels).map((level) => (
            <button
              key={level.name}
              onClick={() => setLevel(level)}
              className="button"
            >
              <TitleNeon
                size="20px"
                title={level.name}
                tag="span"
                color="#00fbff"
              />
            </button>
          ))}
        </div>

        <button onClick={restartGame}>
          <TitleNeon size="24px" title="Reset" tag="span" color="#0f9" />
        </button>
      </div>
    </aside>
  );
};

export default LevelSelector;
