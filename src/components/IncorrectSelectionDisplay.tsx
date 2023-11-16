import { ISelectedHashMap } from "../hooks/useGameLogic";

type IIncorrectSelectionDisplayProps = {
  incorrect: {
    [key: string]: boolean;
  };
};

export default function IncorrectSelectionDisplay({
  incorrect,
}: IIncorrectSelectionDisplayProps) {
  return (
    <div>
      {Object.keys(incorrect).map((letter) => (
        <p>{letter}</p>
      ))}
    </div>
  );
}
