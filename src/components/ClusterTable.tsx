import React from "react";
import SortableTable from "./SortableTable/SortableTable";

type StatID = string;
interface Stats {
  mean: number;
  std: number;
}

export interface Cluster {
  rank: number | "Unclustered";
  id: number | "-";
  size: number;
  best: string[];
  stats: Record<StatID, Stats>;
}

interface Props {
  id_labels: Record<StatID, string>;
  stat_labels: Record<StatID, string>;
  clusters: Cluster[];
  maxbest?: number;
}

interface TableData {
  [key: string]: any;
}

const transformClustersToData = (
  id_labels: Record<string, string>,
  stat_labels: Record<string, string>,
  clusters: Cluster[]
): { columns: any[]; rows: any[]; data: TableData[] } => {
  const rows = Object.entries(id_labels).map(([key, header]) => ({
    key,
    header,
  }));

  const columns = Object.entries(stat_labels).map(([key, header]) => ({
    key,
    header,
  }));

  const transformedData: TableData[] = clusters.map((cluster) => {
    const { rank, id, size, best, stats } = cluster;
    const data: TableData = { rank, id, size, best };

    Object.entries(stats).forEach(([statID, { mean }]) => {
      data[statID] = mean;
    });

    return data;
  });

  return { columns, rows, data: transformedData };
};

export const ClusterTable = ({
  id_labels,
  stat_labels,
  clusters,
  maxbest = 4,
}: Props) => {
  const { columns, rows, data } = transformClustersToData(
    id_labels,
    stat_labels,
    clusters
  );
  const table = SortableTable({ data, columns, rows });
  return (
    <div>
      {table}
      {maxbest}
    </div>
  );
};
