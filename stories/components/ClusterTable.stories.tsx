import React from "react";

import type { Story } from "@ladle/react";
import { ClusterTable } from "../../src/components/ClusterTable";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cluster_1_model_1 from "../../src/examples/cluster_1_model_1.pdb.gz?url";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cluster_2_model_1 from "../../src/examples/cluster_2_model_1.pdb.gz?url";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import target from "../../src/examples/target.pdb?url";
import { clusterHeaders, clusters } from "../../src/examples/HaddockTableData";

// Correct urls
clusters[0].best1 = cluster_1_model_1;
clusters[0].best2 = cluster_2_model_1;
clusters[0].best3 = target;
clusters[0].best4 = target;
clusters[1].best1 = target;
clusters[1].best2 = target;
clusters[1].best3 = target;
clusters[1].best4 = "";

export const FromRun: Story = () => (
  <ClusterTable headers={clusterHeaders} clusters={clusters} />
);
