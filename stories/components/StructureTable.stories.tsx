import React from "react";

import type { Story } from "@ladle/react";

import { StructureTable } from "../../src/components/StructureTable";

export const Minimal: Story = () => (
  <StructureTable
    headers={[
      { key: "rank", label: "Rank", type: "number" },
      { key: "model", label: "Model", type: "string" },
    ]}
    structures={[
      { rank: 1, model: "modelA" },
      { rank: 2, model: "modelB" },
      { rank: 3, model: "modelC" },
    ]}
  />
);

export const WithScore: Story = () => (
  <StructureTable
    headers={[
      { key: "rank", label: "Rank", type: "number" },
      { key: "model", label: "Model", type: "string" },
      { key: "score", label: "Score" },
    ]}
    structures={[
      { rank: 1, model: "modelA", score: 1.23 },
      { rank: 2, model: "modelB", score: 2.34 },
      { rank: 3, model: "modelC", score: 3.45 },
    ]}
  />
);

export const ScoreAndWeight: Story = () => (
  <StructureTable
    headers={[
      { key: "rank", label: "Rank", type: "number" },
      { key: "model", label: "Model", type: "string", sortable: false },
      {
        key: "score",
        label: "Score",
        type: "stats",
        sortable: true,
        sorted: "asc",
      },
      { key: "weight", label: "Score", type: "stats" },
    ]}
    structures={[
      { rank: 1, model: "modelA", score: 1.23, weight: 100 },
      { rank: 2, model: "modelB", score: 2.34, weight: 50 },
      { rank: 3, model: "modelC", score: 3.45, weight: 10 },
    ]}
  />
);

// Python renders null in JSON, need to handle
export const WithNulls: Story = () => (
  <StructureTable
    headers={[
      { key: "rank", label: "Rank", type: "number" },
      { key: "model", label: "Model", type: "string", sortable: false },
      {
        key: "score",
        label: "Score",
        type: "stats",
        sortable: true,
        sorted: "asc",
      },
      { key: "weight", label: "Score", type: "stats" },
    ]}
    structures={[
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      { rank: 1, model: "modelA", score: null, weight: 100 },
      { rank: 2, model: "modelB", score: 2.34, weight: 50 },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      { rank: 3, model: "modelC", score: 3.45, weight: null },
    ]}
  />
);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cluster_1_model_1 from "../../src/examples/cluster_1_model_1.pdb.gz?url";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cluster_2_model_1 from "../../src/examples/cluster_2_model_1.pdb.gz?url";

export const WithStructure: Story = () => (
  <StructureTable
    headers={[
      { key: "rank", label: "Rank", type: "number" },
      { key: "model", label: "Model", type: "structure" },
    ]}
    structures={[
      { rank: 1, model: cluster_1_model_1 },
      { rank: 2, model: cluster_2_model_1 },
    ]}
  />
);

import {
  headers4structuretable,
  structures,
} from "../../src/examples/HaddockTableData";

structures[0].model = cluster_1_model_1;
structures[1].model = cluster_2_model_1;

export const FromRun: Story = () => (
  <StructureTable headers={headers4structuretable} structures={structures} />
);
