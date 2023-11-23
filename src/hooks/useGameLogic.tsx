import { useEffect, useState } from "react";
import { useQuery } from "react-query";

type IGameStatus = "playing" | "halt";
export type ISelectedHashMap = {
  correct: {
    [key: string]: boolean;
  };
  incorrect: {
    [key: string]: boolean;
  };
};

export default function useGameLogic() {
  const [gameStatus, setGameStatus] = useState<IGameStatus>("halt");
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

  useEffect(() => {
    if (
      Object.values(selected.correct).every((item) => item) &&
      gameStatus == "playing"
    ) {
      gameWon();
    }
  }, [selected]);

  async function resetGame() {
    const res = await refetch();

    if (res.data) {
      setWord(res.data[0]);
      setSelected(initSelectObject(res.data[0]));
    }
    setStageToDeath(0);
    setGameStatus("playing");
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (gameStatus == "halt") return;

    if (e.key in selected.correct) {
      setSelected((s) => {
        s.correct[e.key] = true;
        return {
          ...s,
        };
      });
    } else {
      if (!selected.incorrect.hasOwnProperty(e.key)) {
        setStageToDeath((s) => (s += 1));
      }
      setSelected((s) => {
        s.incorrect[e.key] = true;
        return {
          ...s,
        };
      });
    }
  }

  function gameLost() {
    setStageToDeath((s) => (s += 1));
    setGameStatus("halt");
    setTimeout(() => {
      alert(`You lose: the word was ${word}`);
      resetGame();
    }, 500);
  }

  function gameWon() {
    setGameStatus("halt");

    setTimeout(() => {
      alert("You Win! Nice Job :)");
      resetGame();
    }, 500);
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
