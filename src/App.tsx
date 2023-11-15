import Layout from "./components/Layout";
import Person from "./components/Person";
import useGameLogic from "./hooks/useGameLogic";

function App() {
  const { increaseStageToDeath, stageToDeath } = useGameLogic();
  return (
    <Layout>
      <Person stage={stageToDeath} />
      <button onClick={increaseStageToDeath}> kill the person </button>
    </Layout>
  );
}

export default App;
