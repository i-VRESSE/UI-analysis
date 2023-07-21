export const stat_labels = {
  rank: "Rank ID",
  id: "Cluster ID",
  size: "Cluster Size",
  no1: "Nr 01 best structure",
  no2: "Nr 02 best structure",
  no3: "Nr 03 best structure",
  no4: "Nr 04 best structure",
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

export const clusters = {
  "0": {
    rank: 1,
    id: 2,
    size: 10,
    best: {
      no1: ["abc", "def"],
      no2: ["ghi", "jkl"],
      no3: ["mno", "pqr"],
      no4: ["stu", "wxy"],
    },
    stats: { score: { mean: 15, std: 2 }, vdw: { mean: 25, std: 3 } },
  },
  "1": {
    rank: 2,
    id: 1,
    size: 9,
    best: {
      no1: [
        '<a href="https://github.com/i-VRESSE">Visit i-VRESSE</a>',
        '<a href="https://github.com/i-VRESSE">Visit i-VRESSE</a>',
      ],
      no2: [
        '<a href="https://github.com/i-VRESSE">Visit i-VRESSE</a>',
        '<a href="https://github.com/i-VRESSE">Visit i-VRESSE</a>',
      ],
      no3: [
        '<a href="https://github.com/i-VRESSE">Visit i-VRESSE</a>',
        '<a href="https://github.com/i-VRESSE">Visit i-VRESSE</a>',
      ],
      no4: [
        '<a href="https://github.com/i-VRESSE">Visit i-VRESSE</a>',
        '<a href="https://github.com/i-VRESSE">Visit i-VRESSE</a>',
      ],
    },
    stats: { score: { mean: 25, std: 3 }, vdw: { mean: 10, std: 2 } },
  },
};
