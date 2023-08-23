import { ClusterTable } from "./components/ClusterTable";
import { headers, clusters } from "./examples/HaddockTableData";

const App = () => {
  return (
    <>
      <ClusterTable headers={headers} clusters={clusters} maxbest={4} />
    </>
  );
};

export default App;
