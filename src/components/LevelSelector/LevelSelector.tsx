import { Dispatch } from "react";
import { levels } from "../../utils/levels";
import TitleNeon from "../TitleNeon/TitleNeon";
import { Level } from "../../types/types";

interface LevelSelectorProps {
  setLevel: Dispatch<React.SetStateAction<Level>>;
  restartGame: () => void;
}

const LevelSelector = ({ setLevel }: LevelSelectorProps) => {
  return (
    <aside>
      <div className="menu">
        {Object.values(levels).map((level) => (
          <button
            key={level.name}
            onClick={() => setLevel(level)}
            className="button"
          >
            <TitleNeon
              size="1.2rem"
              title={level.name}
              tag="span"
              color="#00fbff"
            />
          </button>
        ))}
      </div>
    </aside>
  );
};

export default LevelSelector;
