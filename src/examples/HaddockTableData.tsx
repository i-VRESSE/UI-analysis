import { Cluster } from "../components/ClusterTable";
import { Header } from "../components/SortableTable";
import { Structure } from "../components/StructureTable";

export const clusters: Cluster[] = [
  {
    rank: 1,
    id: 1,
    size: 5,
    score: {
      mean: -5.86,
      std: 1.54,
    },
    irmsd: {
      mean: 1.81,
      std: 0.53,
    },
    fnat: {
      mean: 0.57,
      std: 0.24,
    },
    lrmsd: {
      mean: 5.07,
      std: 2.25,
    },
    dockq: {
      mean: 0.58,
      std: 0.18,
    },
    air: {
      mean: 847.55,
      std: 208.47,
    },
    desolv: {
      mean: 11.67,
      std: 3.46,
    },
    elec: {
      mean: -9.69,
      std: 3.32,
    },
    vdw: {
      mean: -2.98,
      std: 9.17,
    },
    ilrmsd: {
      mean: -2.98,
      std: 9.17,
    },
    bsa: {
      mean: -2.98,
      std: 9.17,
    },
    // cluster_1_model_1.pdb.gz is result of haddock3 docking-protein-glycan example
    best1: "/src/examples/cluster_1_model_1.pdb.gz",
    // cluster_1_model_2.pdb.gz is result of haddock3 docking-antibody-antigen example
    best2: "/src/examples/cluster_2_model_1.pdb.gz",
    best3: "/src/examples/target.pdb",
    best4: "/src/examples/target.pdb",
  },
  {
    rank: 2,
    id: 2,
    size: 10,
    score: {
      mean: -6.12,
      std: 1.23,
    },
    irmsd: {
      mean: 1.23,
      std: 0.57,
    },
    fnat: {
      mean: 0.46,
      std: 0.79,
    },
    lrmsd: {
      mean: 4.32,
      std: 2.35,
    },
    dockq: {
      mean: 0.99,
      std: 0.65,
    },
    air: {
      mean: 765.43,
      std: 321.1,
    },
    desolv: {
      mean: 9.88,
      std: 5.43,
    },
    elec: {
      mean: -8.77,
      std: 4.32,
    },
    vdw: {
      mean: -1.23,
      std: 8.77,
    },
    ilrmsd: {
      mean: -1.34,
      std: 0,
    },
    bsa: {
      mean: -2.978,
      std: 0,
    },
    best1: "/src/examples/target.pdb",
    best2: "/src/examples/target.pdb",
    best3: "/src/examples/target.pdb",
    best4: "",
  },
];

export const clusterHeaders: Header[] = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "rank",
    label: "Rank",
    sorted: "asc",
  },
  {
    key: "n",
    label: "Size",
  },
  { key: "score", label: "HADDOCK score [a.u.]", type: "stats" },
  { key: "vdw", label: "Van der Waals Energy", type: "stats" },
  { key: "elec", label: "Electrostatic Energy", type: "stats" },
  { key: "air", label: "Restraints Energy", type: "stats" },
  { key: "desolv", label: "Desolvation Energy", type: "stats" },
  { key: "irmsd", label: "interface RMSD [A]", type: "stats" },
  { key: "lrmsd", label: "ligand RMSD [A]", type: "stats" },
  { key: "ilrmsd", label: "interface-ligand RMSD [A]", type: "stats" },
  { key: "fnat", label: "Fraction of Common Contacts", type: "stats" },
  { key: "dockq", label: "DOCKQ", type: "stats" },
  { key: "bsa", label: "Buried Surface Area [A^2]", type: "stats" },
  {
    key: "best1",
    label: "Nr 01 best structure",
    type: "structure",
    sortable: false,
  },
  {
    key: "best2",
    label: "Nr 02 best structure",
    type: "structure",
    sortable: false,
  },
  {
    key: "best3",
    label: "Nr 03 best structure",
    type: "structure",
    sortable: false,
  },
  {
    key: "best4",
    label: "Nr 04 best structure",
    type: "structure",
    sortable: false,
  },
];

export const headers4structuretable: Header[] = [
  { key: "id", label: "Structure ID" },
  { key: "rank", label: "Structure Rank", sorted: "asc" },
  { key: "model", label: "Structure", sortable: false, type: "structure" },
  { key: "score", label: "HADDOCK score [a.u.]", type: "stats" },
  { key: "vdw", label: "Van der Waals Energy", type: "stats" },
  { key: "elec", label: "Electrostatic Energy", type: "stats" },
  { key: "air", label: "Restraints Energy", type: "stats" },
  { key: "desolv", label: "Desolvation Energy", type: "stats" },
  { key: "irmsd", label: "interface RMSD [A]", type: "stats" },
  { key: "lrmsd", label: "ligand RMSD [A]", type: "stats" },
  { key: "ilrmsd", label: "interface-ligand RMSD [A]", type: "stats" },
  { key: "fnat", label: "Fraction of Common Contacts", type: "stats" },
  { key: "DOCKQ", label: "DOCKQ", type: "stats" },
  { key: "bsa", label: "Buried Surface Area [A^2]", type: "stats" },
];

export const structures: Structure[] = [
  {
    id: 1,
    rank: 1,
    model: "/src/examples/target.pdb",
    score: -5.85,
    vdw: -2.97,
    elec: -9.63,
    air: 847.55,
    desolv: 11.65,
    irmsd: 1.8,
    lrmsd: 5.07,
    ilrmsd: 3.07,
    fnat: 0.56,
    DOCKQ: 0.51,
    bsa: 0.12,
  },
  {
    id: 2,
    rank: 2,
    model: "/src/examples/cluster_1_model_1.pdb.gz",
    score: -4.13,
    vdw: -1.23,
    elec: -8.75,
    air: 765.32,
    desolv: 9.86,
    irmsd: 1.24,
    lrmsd: 4.31,
    ilrmsd: 2.45,
    fnat: 0.45,
    DOCKQ: 0.97,
    bsa: 0.45,
  },
];
