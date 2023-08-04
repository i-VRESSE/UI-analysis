import { ClusterTable } from "./components/ClusterTable";
import StructureViewer from "./components/NglViewer/NglViewer";
import { headers, clusters } from "./examples/HaddockTableData";

const App = () => {
  // https://github.com/i-VRESSE/haddock3/blob/main/examples/analysis/data/target.pdb
  const fileName = "/src/examples/target.pdb";
  const downloadName = "11.pdb";
  return (
    <div>
      <ClusterTable headers={headers} clusters={clusters} maxbest={4} />
      <p> Here is the example Viewer</p>
      <StructureViewer fileName={fileName} downloadName={downloadName} />
    </div>
  );
};

export default App;
