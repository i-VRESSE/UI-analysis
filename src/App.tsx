import { ClusterTable } from "./components/ClusterTable";
import { stat_labels, clusters } from "./examples/TableData";

const App = () => {
  return (
    <div>
      <ClusterTable stat_labels={stat_labels} clusters={clusters} />;
    </div>
  );
};

export default App;
