import { Cluster, ClusterID } from "../components/ClusterTable";
import { Structure } from "../components/StructureTable";
import { StatID } from "../components/table";

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
  "1": {
    rank: 1,
    id: 1,
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
      // cluster_1_model_1.pdb.gz is result of haddock3 docking-protein-glycan example
      "Nr 01 best structure": "/src/examples/cluster_1_model_1.pdb.gz",
      // cluster_1_model_2.pdb.gz is result of haddock3 docking-antibody-antigen example
      "Nr 02 best structure": "/src/examples/cluster_2_model_1.pdb.gz",
      "Nr 03 best structure": "/src/examples/target.pdb",
      "Nr 04 best structure": "/src/examples/target.pdb",
      "Nr 05 best structure": "/src/examples/target.pdb",
    },
  },
  "2": {
    rank: 2,
    id: 2,
    size: 10,
    stats: {
      "HADDOCK score [a.u.]": {
        mean: -6.123,
        std: 1.234,
      },
      "interface RMSD [A]": {
        mean: 1.234,
        std: 0.567,
      },
      "Fraction of Common Contacts": {
        mean: 0.456,
        std: 0.789,
      },
      "ligand RMSD [A]": {
        mean: 4.321,
        std: 2.345,
      },
      DOCKQ: {
        mean: 0.987,
        std: 0.654,
      },
      "Restraints Energy": {
        mean: 765.432,
        std: 321.098,
      },
      "Desolvation Energy": {
        mean: 9.876,
        std: 5.432,
      },
      "Electrostatic Energy": {
        mean: -8.765,
        std: 4.321,
      },
      "Van der Waals Energy": {
        mean: -1.234,
        std: 8.765,
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

export const headers4structuretable: Record<StatID, string> = {
  rank: "Structure Rank",
  path: "Structure Name",
  score: "HADDOCK score [a.u.]",
  vdw: "Van der Waals Energy",
  elec: "Electrostatic Energy",
  air: "Restraints Energy",
  desolv: "Desolvation Energy",
  irmsd: "interface RMSD [A]",
  lrmsd: "ligand RMSD [A]",
  ilrmsd: "interface-ligand RMSD [A]",
  fnat: "Fraction of Common Contacts",
  DOCKQ: "DOCKQ",
  bsa: "Buried Surface Area [A^2]",
};

export const structures: Structure[] = [
  {
    rank: 1,
    model: "/src/examples/target.pdb",
    stats: {
      score: -5.856,
      vdw: -2.978,
      elec: -9.693,
      air: 847.545,
      desolv: 11.665,
      irmsd: 1.808,
      lrmsd: 5.072,
      ilrmsd: 3.057,
      fnat: 0.569,
      DOCKQ: 0.581,
      bsa: 0.123,
    },
  },
  {
    rank: 2,
    model: "/src/examples/cluster_1_model_1.pdb.gz",
    stats: {
      score: -4.123,
      vdw: -1.234,
      elec: -8.765,
      air: 765.432,
      desolv: 9.876,
      irmsd: 1.234,
      lrmsd: 4.321,
      ilrmsd: 2.345,
      fnat: 0.456,
      DOCKQ: 0.987,
      bsa: 0.456,
    },
  },
];
