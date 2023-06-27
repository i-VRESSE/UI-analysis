export const data = [
  { id: 1, name: "John", age: 25, location: "New York" },
  { id: 2, name: "Alice", age: 32, location: "London" },
  { id: 3, name: "Bob", age: 40, location: "Paris" },
];

export const columns = [
  { key: "name", header: "Name" },
  { key: "age", header: "Age" },
  { key: "location", header: "Location" },
];

export const rows = [
  { key: "id", header: "Rank" },
  { key: "id", header: "ID" },
];

export const id_labels = {
  rank: "Rank ID",
  id: "Cluster ID",
  size: "Cluster Size",
  best: "Best Structure",
};
export const stat_labels = {
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

export const clusters = [
  {
    rank: 1,
    id: 2,
    size: 10,
    best: [],
    stats: { score: { mean: 15, std: 2 }, vdw: { mean: 25, std: 3 } },
  },
  {
    rank: 2,
    id: 1,
    size: 9,
    best: [],
    stats: { score: { mean: 25, std: 3 }, vdw: { mean: 10, std: 2 } },
  },
];
