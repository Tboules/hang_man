import { useEffect, useState } from "react";
import { useQuery } from "react-query";

type IGameStatus = "playing" | "halt";
type ISelectedHashMap = {
  correct: {
    [key: string]: boolean;
  };
  incorrect: {
    [key: string]: boolean;
  };
};

export default function useGameLogic() {
  const [gameStatus, setGameStatus] = useState<IGameStatus>("playing");
  const [stageToDeath, setStageToDeath] = useState<number>(0);
  const [word, setWord] = useState<string>("");
  const [selected, setSelected] = useState<ISelectedHashMap>({
    correct: {},
    incorrect: {},
  });
  const { refetch, isLoading, isError } = useRandomWord();

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [word]);

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    if (stageToDeath == 6) {
      gameLost();
    }
  }, [stageToDeath]);

  async function resetGame() {
    const res = await refetch();

    if (res.data) {
      setWord(res.data[0]);
      setSelected(initSelectObject(res.data[0]));
    }
    setGameStatus("playing");
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key in selected.correct) {
      console.log(e.key, "letter found");
      setSelected((s) => {
        s.correct[e.key] = true;
        return s;
      });
    } else {
      if (!selected.incorrect.hasOwnProperty(e.key)) {
        setStageToDeath((s) => (s += 1));
      }
      setSelected((s) => {
        s.incorrect[e.key] = true;
        return s;
      });
    }

    if (Object.values(selected.correct).every((item) => item)) {
      gameWon();
    }
  }

  function gameLost() {
    setStageToDeath((s) => (s += 1));
    setGameStatus("halt");
    setTimeout(() => {
      alert("You Lose");
      setStageToDeath(0);
      resetGame();
    }, 500);
  }

  function gameWon() {
    setGameStatus("halt");
    alert("You Win! Nice Job :)");

    resetGame();
  }

  return {
    word,
    stageToDeath,
    isLoading,
    isError,
    resetGame,
    gameStatus,
    selected,
  };
}

function useRandomWord() {
  return useQuery({
    queryKey: ["word"],
    queryFn: getRandomWord,
    refetchOnWindowFocus: false,
    enabled: false,
  });
}

async function getRandomWord(): Promise<string[]> {
  const length = Math.ceil(Math.random() * 6 + 3);

  const response = await fetch(
    `https://random-word-api.vercel.app/api?words=1&length=${length}`,
  );

  if (!response.ok) {
    throw new Error("Problem getting word");
  }

  return response.json();
}

function initSelectObject(word: string): ISelectedHashMap {
  const map: ISelectedHashMap = {
    correct: {},
    incorrect: {},
  };

  for (let i = 0; i < word.length; i++) {
    map.correct[word[i]] = false;
  }

  return map;
}
