import { Cluster, ClusterTable } from "./components/ClusterTable";
import SortableTable from "./components/SortableTable/SortableTable";
import { data, columns } from "./examples/TableData";

const stat_labels = {
  score: "HADDOCK score [a.u.]",
  vdw: "Van der Waals Energy",
  elec: "Electrostatic Energy",
  air: "Restraints Energy",
  desolv: "Desolvation Energy",
  irmsd: "interface RMSD [A]",
  lrmsd: "ligand RMSD [A]",
  ilrmsd: "interface-ligand RMSD [A]",
  fnat: "Fraction of Common Contacts",
  dockq: "DOCKQ",
};

const clusters: Cluster[] = [
  {
    rank: 1,
    id: 1,
    size: 10,
    best: [],
    stats: {},
  },
  { rank: "Unclustered", id: "-", size: 10, best: [], stats: {} },
];
const App = () => {
  return (
    <div>
      <SortableTable data={data} columns={columns} />;
      <ClusterTable stat_labels={stat_labels} clusters={clusters} />;
    </div>
  );
};

export default App;
