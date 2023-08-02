import { ClusterTable } from "./components/ClusterTable";
import { headers, clusters } from "./examples/HaddockTableData";

const App = () => {
  return (
    <div>
      <ClusterTable headers={headers} clusters={clusters} maxbest={4} />
    </div>
  );
};

export default App;
