import SortableTable from "./SortableTable/SortableTable";

type StatID = string;
type HtmlString = string;

interface Stats {
  mean: number;
  std: number;
}

export interface Cluster {
  rank: number | "Unclustered";
  id: number | "-";
  size: number;
  best: Array<HtmlString>;
  stats: Record<StatID, Stats>;
}

interface Props {
  stat_labels: Record<StatID, string>;
  clusters: Cluster[];
  maxbest?: number;
}

interface TableData {
  [key: string]: any;
}

// TODO: implmenet best and maxbest
const transformClustersToData = (
  stat_labels: Record<string, string>,
  clusters: Cluster[]
): { verticalHeaders: any[]; data: TableData[] } => {
  const verticalHeaders = Object.entries(stat_labels).map(([key, value]) => ({
    key,
    value,
  }));

  const transformedData: TableData[] = clusters.map((cluster) => {
    const { rank, id, size, best, stats } = cluster;
    const data: TableData = { rank, id, size, best };

    Object.entries(stats).forEach(([statID, stats]) => {
      data[statID] = stats;
    });

    return data;
  });

  return { verticalHeaders, data: transformedData };
};

// TODO add maxbest
export const ClusterTable = ({ stat_labels, clusters }: Props) => {
  const { verticalHeaders, data } = transformClustersToData(
    stat_labels,
    clusters
  );
  const table = <SortableTable data={data} verticalHeaders={verticalHeaders} />;
  return <div>{table}</div>;
};
