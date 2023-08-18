import ShowStructure from "./NglViewer/ShowStructure";
import SortableTable, { ValueType } from "./SortableTable/SortableTable";

export type StatID = string;
export type BestID = string;
export type ClusterID = string;

export interface Stats {
  mean: number;
  std: number;
}

export interface Header {
  key: string;
  value: string;
  sort: string | boolean;
  type: ValueType;
}

export interface Cluster {
  rank: number | "Unclustered";
  id: number | "-";
  size: number;
  best: Record<BestID, string>;
  stats: Record<StatID, Stats>;
}

export interface Props {
  headers: Record<StatID, string>;
  clusters: Record<ClusterID, Cluster>;
  maxbest?: number;
}

export interface TableData {
  [key: string]: any;
}

const extractNumber = (inputString: string) => {
  const match = inputString.match(/\d+/); // Match one or more digits
  return match ? parseInt(match[0], 10) : null; // Convert matched string to number
};

const getDownloadName = (rank: number | "Unclustered", bestID: string) => {
  const clusterName =
    rank === "Unclustered" ? "Unclustered" : `Cluster_${rank}`;
  const structureName = `model${extractNumber(bestID)}`;
  return `${clusterName}_${structureName}`;
};

const getHTMLElement = (fileName: string, downloadName: string) => {
  return (
    <span>
      &#8595;&nbsp;
      <a href={fileName} download={downloadName}>
        Download
      </a>
      &nbsp;&#x1F441;&nbsp;
      <a
        onClick={() => ShowStructure(fileName, downloadName)}
        style={{ cursor: "pointer" }}
      >
        View
      </a>
    </span>
  );
};

const transformClustersToData = (
  headers: Record<string, string>,
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
      // Create download name
      const downloadName = getDownloadName(rank, bestID);

      // Create html string
      transformedData[bestID] = getHTMLElement(best, downloadName);
    });

    data.push(transformedData);
  });

  // Prepare headers that are in the data
  const dataKeys = Object.keys(data[0] || {});
  Object.entries(headers).forEach(([key, value]) => {
    let sort: string | boolean;
    let type: ValueType;
    if (dataKeys.includes(key)) {
      if (key in clusters[Object.keys(clusters)[0]].best) {
        sort = false;
        type = "html";
      } else if (key in clusters[Object.keys(clusters)[0]].stats) {
        sort = "mean";
        type = "stats";
      } else {
        sort = true;
        type = "value";
      }
      const header: Header = { key, value, sort, type };
      verticalHeaders.push(header);
    }
  });
  return { verticalHeaders, data };
};

export const ClusterTable = ({ headers, clusters, maxbest = 1 }: Props) => {
  const { verticalHeaders, data } = transformClustersToData(
    headers,
    clusters,
    maxbest
  );
  const table = <SortableTable data={data} verticalHeaders={verticalHeaders} />;
  return <div>{table}</div>;
};
