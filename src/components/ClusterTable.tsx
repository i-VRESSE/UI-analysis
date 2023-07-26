import SortableTable from "./SortableTable/SortableTable";

type StatID = string;
type BestID = string;
type HtmlString = string;
type ClusterID = string;

interface Stats {
  mean: number;
  std: number;
}

interface Header {
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
): { verticalHeaders: Header[]; data: TableData[] } => {

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

  // prepare headers that are in the data
  const verticalHeaders: Header[] = [];
  const dataKeys = Object.keys(transformedData[0] || {});
  Object.entries(stat_labels).forEach(([key, value]) => {
    if (dataKeys.includes(key)) {
      verticalHeaders.push({ key, value });
    }
  });

  return { verticalHeaders, data: transformedData };
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
