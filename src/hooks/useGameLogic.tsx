import { useState } from "react";

export default function useGameLogic() {
  const [stageToDeath, setStageToDeath] = useState<number>(0);

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
    stageToDeath,
    increaseStageToDeath,
  };
}
