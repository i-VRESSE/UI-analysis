import { ClusterTable } from "./components/ClusterTable";
import { id_labels, stat_labels, clusters } from "./examples/TableData";

const App = () => {
  return (
    <div>
      <ClusterTable
        id_labels={id_labels}
        stat_labels={stat_labels}
        clusters={clusters}
      />
      ;
    </div>
  );
};

export default App;
