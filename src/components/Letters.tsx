import { ISelectedHashMap } from "../hooks/useGameLogic";

type ILettersProps = {
  word: string;
  selected: ISelectedHashMap;
};

type ILetterProps = {
  letter: string;
  display: boolean;
};

export default function Letters({ word, selected: select }: ILettersProps) {
  return (
    <div className="flex gap-2">
      {word.split("").map((letter, i) => (
        <Letter
          key={letter + i}
          letter={letter}
          display={select.correct[letter]}
        />
      ))}
    </div>
  );
}

function Letter({ letter, display }: ILetterProps) {
  return (
    <div className="w-6 h-6 border-b-2 border-black ">
      {display && <p className="text-center">{letter}</p>}
    </div>
  );
}
