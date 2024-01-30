import { ClusterTable } from "./components/ClusterTable";
import { StructureTable } from "./components/StructureTable";
import {
  headers,
  clusters,
  headers4structuretable,
  structures,
} from "./examples/HaddockTableData";

const App = () => {
  return (
    <>
      <h1>Clustered</h1>
      <ClusterTable headers={headers} clusters={clusters} maxbest={4} />
      <h1>Unclustered</h1>
      <StructureTable
        headers={headers4structuretable}
        structures={structures}
      />
    </>
  );
};

export default App;
