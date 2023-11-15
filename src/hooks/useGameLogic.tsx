import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function useGameLogic() {
  const [stageToDeath, setStageToDeath] = useState<number>(0);
  const [word, setWord] = useState<string>("");
  const { refetch, isLoading, isError } = useRandomWord();

  async function resetGame() {
    const res = await refetch();

    if (res.data) {
      setWord(res.data[0]);
    }
  }

  useEffect(() => {
    resetGame();
  }, []);

  function increaseStageToDeath() {
    if (stageToDeath < 6) {
      setStageToDeath((s) => (s += 1));
    } else {
      alert("You Lose");
      //reset game logic

      setStageToDeath(0);
    }
  }

  return {
    word,
    stageToDeath,
    increaseStageToDeath,
    isLoading,
    isError,
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
