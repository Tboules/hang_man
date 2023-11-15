import { useEffect, useState } from "react";
import { useQuery } from "react-query";

type IGameStatus = "playing" | "lost";

export default function useGameLogic() {
  const [gameStatus, setGameStatus] = useState<IGameStatus>("playing");
  const [stageToDeath, setStageToDeath] = useState<number>(0);
  const [word, setWord] = useState<string>("");
  const { refetch, isLoading, isError } = useRandomWord();

  async function resetGame() {
    const res = await refetch();

    if (res.data) {
      setWord(res.data[0]);
    }
    setGameStatus("playing");
  }

  useEffect(() => {
    resetGame();
  }, []);

  function gameLost() {
    setStageToDeath((s) => (s += 1));
    setGameStatus("lost");
    setTimeout(() => {
      alert("You Lose");
      setStageToDeath(0);
      resetGame();
    }, 500);
  }

  function increaseStageToDeath() {
    if (stageToDeath < 5) {
      setStageToDeath((s) => (s += 1));
    } else {
      gameLost();
    }
  }

  return {
    word,
    stageToDeath,
    increaseStageToDeath,
    isLoading,
    isError,
    resetGame,
    gameStatus,
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
    `https://random-word-api.vercel.app/api?words=1&length=${length}`
  );

  if (!response.ok) {
    throw new Error("Problem getting word");
  }

  return response.json();
}
