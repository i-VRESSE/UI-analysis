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
  sort: string | boolean;
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
  const data: TableData[] = [];
  const verticalHeaders: Header[] = [];

  Object.values(clusters).forEach((cluster) => {
    const { rank, id, size, best, stats } = cluster;
    const transformedData: TableData = { rank, id, size };

    // Unpack stats
    Object.entries(stats).forEach(([statID, stats]) => {
      transformedData[statID] = stats;
    });

    // Select the first maxBest items
    // TODO make sure they are sorted
    const maxBest = Object.entries(best).slice(0, maxbest);

    // Unpack best
    maxBest.forEach(([bestID, best]) => {
      transformedData[bestID] = best;
    });

    data.push(transformedData);
  });

  // Prepare headers that are in the data
  const dataKeys = Object.keys(data[0] || {});
  Object.entries(stat_labels).forEach(([key, value]) => {
    let sort: string | boolean;
    if (dataKeys.includes(key)) {
      if (key in clusters[Object.keys(clusters)[0]].best) {
        sort = false;
      } else if (key in clusters[Object.keys(clusters)[0]].stats) {
        sort = "mean";
      } else {
        sort = true;
      }
      const header: Header = { key, value, sort };
      verticalHeaders.push(header);
    }
  });
  return { verticalHeaders, data };
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
