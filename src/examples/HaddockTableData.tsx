import { Cluster, ClusterID, StatID } from "../components/ClusterTable";

export const headers: Record<StatID, string> = {
  rank: "Cluster Rank",
  id: "Cluster ID",
  size: "Cluster size",
  "HADDOCK score [a.u.]": "HADDOCK score [a.u.]",
  "interface RMSD [A]": "interface RMSD [A]",
  "Fraction of Common Contacts": "Fraction of Common Contacts",
  "ligand RMSD [A]": "ligand RMSD [A]",
  DOCKQ: "DOCKQ",
  "Restraints Energy": "Restraints Energy",
  "Desolvation Energy": "Desolvation Energy",
  "Electrostatic Energy": "Electrostatic Energy",
  "Van der Waals Energy": "Van der Waals Energy",
  "Nr 01 best structure": "Nr 01 best structure",
  "Nr 02 best structure": "Nr 02 best structure",
  "Nr 03 best structure": "Nr 03 best structure",
  "Nr 04 best structure": "Nr 04 best structure",
  "Nr 05 best structure": "Nr 05 best structure",
};

// TODO check when property names dont match
export const clusters: Record<ClusterID, Cluster> = {
  "0": {
    rank: "Unclustered",
    id: "-",
    size: 5,
    stats: {
      "HADDOCK score [a.u.]": {
        mean: -5.856,
        std: 1.544,
      },
      "interface RMSD [A]": {
        mean: 1.808,
        std: 0.534,
      },
      "Fraction of Common Contacts": {
        mean: 0.569,
        std: 0.242,
      },
      "ligand RMSD [A]": {
        mean: 5.072,
        std: 2.254,
      },
      DOCKQ: {
        mean: 0.581,
        std: 0.183,
      },
      "Restraints Energy": {
        mean: 847.545,
        std: 208.466,
      },
      "Desolvation Energy": {
        mean: 11.665,
        std: 3.461,
      },
      "Electrostatic Energy": {
        mean: -9.693,
        std: 3.323,
      },
      "Van der Waals Energy": {
        mean: -2.978,
        std: 9.166,
      },
    },
    best: {
      "Nr 01 best structure": "/src/examples/target.pdb",
      "Nr 02 best structure": "/src/examples/target.pdb",
      "Nr 03 best structure": "/src/examples/target.pdb",
      "Nr 04 best structure": "/src/examples/target.pdb",
      "Nr 05 best structure": "/src/examples/target.pdb",
    },
  },
};
