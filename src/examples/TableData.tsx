export const data = [
  { id: 1, name: "John", age: 25, location: "New York" },
  { id: 2, name: "Alice", age: 32, location: "London" },
  { id: 3, name: "Bob", age: 40, location: "Paris" },
];

export const rows = [
  { key: "name", value: "Name" },
  { key: "age", value: "Age" },
  { key: "location", value: "Location" },
];

export const headers = [
  { key: "id", value: "Rank" },
  { key: "id", value: "ID" },
];

export const stat_labels = {
  rank: "Rank ID",
  id: "Cluster ID",
  size: "Cluster Size",
  best: "Best Structure",
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
    best: [<a href="https://github.com/i-VRESSE">Visit i-VRESSE</a>],
    stats: { score: { mean: 15, std: 2 }, vdw: { mean: 25, std: 3 } },
  },
  {
    rank: 2,
    id: 1,
    size: 9,
    best: [<a href="https://github.com/i-VRESSE">Visit i-VRESSE</a>],
    stats: { score: { mean: 25, std: 3 }, vdw: { mean: 10, std: 2 } },
  },
];
