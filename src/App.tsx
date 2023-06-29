import { ClusterTable } from "./components/ClusterTable";
import { id_labels, stat_labels, clusters } from "./examples/TableData";
import { data, headers, rows } from "./examples/TableData";
import SortableTable from "./components/SortableTable/SortableTable";


const App = () => {
  return (
    <div>
      <ClusterTable
        id_labels={id_labels}
        stat_labels={stat_labels}
        clusters={clusters}
      />
      ;
      {/* <SortableTable data={data} headers={headers} rows={rows}/> */}
    </div>
  );
};

export default App;
