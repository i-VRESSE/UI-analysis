import { ClusterTable } from "./components/ClusterTable";
import { StructureTable } from "./components/StructureTable";
import {
  clusters,
  headers4structuretable,
  structures,
  clusterHeaders,
} from "./examples/HaddockTableData";

const App = () => {
  return (
    <>
      <h1>Clustered</h1>
      <ClusterTable headers={clusterHeaders} clusters={clusters} />
      <h1>Unclustered</h1>
      <StructureTable
        headers={headers4structuretable}
        structures={structures}
      />
    </>
  );
};

export default App;
