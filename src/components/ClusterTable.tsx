import SortableTable from "./SortableTable/SortableTable";

type StatID = string;
type BestID = string;
type HtmlString = string;
type ClusterID = string;

interface Stats {
  mean: number;
  std: number;
}

interface header {
  key: string;
  value: string;
}

export interface Cluster {
  rank: number | "Unclustered";
  id: number | "-";
  size: number;
  best: Record<BestID, HtmlString[]>;
  stats: Record<StatID, Stats>;
}

interface Props {
  stat_labels: Record<StatID, string>;
  clusters: Record<ClusterID, Cluster>;
  maxbest?: number;
}

interface TableData {
  [key: string]: any;
}

const transformClustersToData = (
  stat_labels: Record<string, string>,
  clusters: Record<ClusterID, Cluster>,
  maxbest: number
): { verticalHeaders: header[]; data: TableData[] } => {
  const verticalHeaders = Object.entries(stat_labels).map(([key, value]) => ({
    key,
    value,
  }));

  const transformedData: TableData[] = Object.values(clusters).map(
    (cluster) => {
      const { rank, id, size, best, stats } = cluster;
      const data: TableData = { rank, id, size };

      //  unpack stats
      Object.entries(stats).forEach(([statID, stats]) => {
        data[statID] = stats;
      });

      // select the first maxBest items
      // TODO make sure they are sorted
      const maxBest = Object.entries(best).slice(0, maxbest);

      // unpack best
      maxBest.forEach(([bestID, best]) => {
        data[bestID] = best;
      });

      return data;
    }
  );

  // match keys of data and verticalHeaders
  const dataKeys = Object.keys(transformedData[0] || {});
  const filteredVerticalHeaders = verticalHeaders.filter(({ key }) =>
    dataKeys.includes(key)
  );

  return { verticalHeaders: filteredVerticalHeaders, data: transformedData };
};

export const ClusterTable = ({ stat_labels, clusters, maxbest = 1 }: Props) => {
  const { verticalHeaders, data } = transformClustersToData(
    stat_labels,
    clusters,
    maxbest
  );
  const table = <SortableTable data={data} verticalHeaders={verticalHeaders} />;
  return <div>{table}</div>;
};
