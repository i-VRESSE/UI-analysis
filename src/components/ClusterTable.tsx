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
): { rows: any[]; headers: any[]; data: TableData[] } => {
  const headers = Object.entries(id_labels).map(([key, value]) => ({
    key,
    value,
  }));

  const rows = Object.entries(stat_labels).map(([key, value]) => ({
    key,
    value,
  }));

  const transformedData: TableData[] = clusters.map((cluster) => {
    const { rank, id, size, best, stats } = cluster;
    const data: TableData = { rank, id, size, best };

    Object.entries(stats).forEach(([statID,  stats ]) => {
      data[statID] = stats;
    });

    return data;
  });

  return { rows, headers, data: transformedData };
};

export const ClusterTable = ({
  id_labels,
  stat_labels,
  clusters,
  maxbest = 4,
}: Props) => {
  const { rows, headers, data } = transformClustersToData(
    id_labels,
    stat_labels,
    clusters
  );
  const table = <SortableTable data={data} rows={rows} headers={headers}/>
  return (
    <div>
      {table}
      {maxbest}
    </div>
  );
};
