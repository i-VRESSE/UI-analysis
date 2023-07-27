import { ClusterTable } from "./components/ClusterTable";
import { stat_labels, clusters } from "./examples/HaddockTableData";
import SortableTable from "./components/SortableTable/SortableTable";
import { data, verticalHeaders, horizontalHeaders } from "./examples/TableData";

const App = () => {
  return (
    <div>
      <ClusterTable stat_labels={stat_labels} clusters={clusters} maxbest={4} />
      <p>"next table with two headers"</p>
      <SortableTable
        data={data}
        verticalHeaders={verticalHeaders}
        horizontalHeaders={horizontalHeaders}
      />
    </div>
  );
};

export default App;
