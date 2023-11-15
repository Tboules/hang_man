import Layout from "./components/Layout";
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
  const { increaseStageToDeath, stageToDeath, isLoading, isError, gameStatus } =
    useGameLogic();

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
      <button disabled={gameStatus == "lost"} onClick={increaseStageToDeath}>
        {" "}
        kill the person{" "}
      </button>
    </>
  );
}
