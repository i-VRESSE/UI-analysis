import { ClusterTable } from "./components/ClusterTable";
import { stat_labels, clusters } from "./examples/HaddockTableData";

const App = () => {
  return (
    <div>
      <ClusterTable stat_labels={stat_labels} clusters={clusters} maxbest={4} />
    </div>
  );
};

export default App;
