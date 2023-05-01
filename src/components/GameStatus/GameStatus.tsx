import { GameStatus as IGameStatus } from "../../types/types";
import TitleNeon from "../TitleNeon/TitleNeon";

interface IGameStatusProps {
  status: IGameStatus;
}

const GameStatus = ({ status }: IGameStatusProps) => {
  if (status === "win")
    return <TitleNeon title="You Win!" tag="h2" color="green" />;
  if (status === "lose")
    return <TitleNeon title="You Lose!" tag="h2" color="red" />;

  return (
    <TitleNeon
      title="Reveal a cell"
      tag="h2"
      textTransform="none"
      color="#66faff"
    />
  );
};

export default GameStatus;
