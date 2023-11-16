import IncorrectSelectionDisplay from "./components/IncorrectSelectionDisplay";
import Layout from "./components/Layout";
import Letters from "./components/Letters";
import Person from "./components/Person";
import useGameLogic from "./hooks/useGameLogic";
import { QueryClientProvider, QueryClient } from "react-query";

const qc = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={qc}>
      <Layout>
        <Game />
      </Layout>
    </QueryClientProvider>
  );
}

export default App;

function Game() {
  const {
    increaseStageToDeath,
    stageToDeath,
    isLoading,
    isError,
    gameStatus,
    word,
    selected,
  } = useGameLogic();

  if (isLoading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <h1>Error...</h1>
      </>
    );
  }

  return (
    <>
      <Person stage={stageToDeath} />
      <Letters selected={selected} word={word} />
      <IncorrectSelectionDisplay selected={selected.incorrect} />
    </>
  );
}
