import Person from "./components/Person";
import useGameLogic from "./hooks/useGameLogic";

function App() {
  const { increaseStageToDeath, stageToDeath } = useGameLogic();
  return (
    <div className="p-10">
      <Person stage={stageToDeath} />
      <button onClick={increaseStageToDeath}> kill the person </button>
    </div>
  );
}

export default App;
