import { ClusterTable } from "./components/ClusterTable";
import { headers, clusters } from "./examples/HaddockTableData";
import NglViewer from "./components/NglViewer/NglViewer";

const App = () => {
  return (
    <>
      <ClusterTable headers={headers} clusters={clusters} maxbest={4} />
      <NglViewer />
    </>
  );
};

export default App;
