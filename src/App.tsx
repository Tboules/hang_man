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
  const { stageToDeath, isLoading, isError, word, selected } = useGameLogic();

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
      <h1 className="text-xl font-bold">Hang Man :)</h1>
      <Person stage={stageToDeath} />
      <Letters selected={selected} word={word} />
      <IncorrectSelectionDisplay incorrect={selected.incorrect} />
    </>
  );
}
