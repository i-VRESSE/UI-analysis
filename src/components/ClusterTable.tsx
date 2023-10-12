import { useEffect, useState } from "react";
import NglViewer from "./NglViewer/NglViewer";
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

const getDownloadName = (
  rank: number | "Unclustered",
  bestID: string,
  fileName: string
) => {
  if (fileName === "") {
    return "";
  } else {
    // Extract the extension of the file
    const extensionMatch = fileName.match(/\.([^.]+)$/);
    const extension = extensionMatch?.[1] || "";

    const clusterName =
      rank === "Unclustered" ? "Unclustered" : `Cluster_${rank}`;
    const structureName = `model${extractNumber(bestID)}`;
    return `${clusterName}_${structureName}.${extension}`;
  }
};

const bestStructureCell = (
  fileName: string,
  downloadName: string,
  setActiveStructure: (structure: {
    fileName: string;
    downloadName: string;
  }) => void
) => {
  return (
    <span>
      &#8595;&nbsp;
      <a href={fileName} download={downloadName}>
        Download
      </a>
      &nbsp;&#x1F441;&nbsp;
      <a
        onClick={() => setActiveStructure({ fileName, downloadName })}
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
  maxbest: number,
  setActiveStructure: (structure: {
    fileName: string;
    downloadName: string;
  }) => void,
  cleaned: boolean
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
      const cbest = cleaned ? best + ".gz" : best;
      // Create download name
      const downloadName = getDownloadName(rank, bestID, best);

      // Create html string
      transformedData[bestID] = bestStructureCell(
        cbest,
        downloadName,
        setActiveStructure
      );
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

async function outputIsCleaned(clusters: Record<string, Cluster>) {
  const firstCluster = Object.values(clusters)[0];
  const firstBest = Object.values(firstCluster.best)[0];
  const response = await fetch(firstBest);
  // If not found expect firstBest + .gz to do exist
  return response.status === 404;
}

export const ClusterTable = ({ headers, clusters, maxbest = 1 }: Props) => {
  const [activeStructure, setActiveStructure] = useState({
    fileName: "",
    downloadName: "",
  });
  const [data, setData] = useState<TableData[]>([]);
  const [verticalHeaders, setVerticalHeaders] = useState<Header[]>([]);

  useEffect(() => {
    async function process() {
      const cleaned = await outputIsCleaned(clusters);
      const { verticalHeaders, data } = transformClustersToData(
        headers,
        clusters,
        maxbest,
        setActiveStructure,
        cleaned
      );
      setData(data);
      setVerticalHeaders(verticalHeaders);
    }
    process();
  }, [clusters, headers, maxbest]);

  if (verticalHeaders.length === 0) {
    return <>Loading...</>;
  }
  const table = <SortableTable data={data} verticalHeaders={verticalHeaders} />;
  return (
    <div>
      <NglViewer activeStructure={activeStructure} />
      {table}
    </div>
  );
};
