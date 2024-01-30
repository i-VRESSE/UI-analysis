import { useState, useMemo } from "react";
import NglViewer from "./NglViewer/NglViewer";
import SortableTable, { ValueType } from "./SortableTable/SortableTable";
import type { Header, StatID, TableData } from "./table";

export interface Structure {
  rank: number;
  model: string;
  stats: Record<StatID, number>;
}

interface Props {
  headers: Record<StatID, string>;
  structures: Structure[];
}

const structureCell = (
  model: string,
  downloadName: string,
  setActiveStructure: (structure: {
    fileName: string;
    downloadName: string;
  }) => void
) => {
  const fileName = model;

  return (
    <span>
      {downloadName}
      <br />
      <a href={fileName} download={downloadName}>
        &#8595;&nbsp;Download
      </a>
      &nbsp;
      <a
        onClick={() => setActiveStructure({ fileName, downloadName })}
        style={{ cursor: "pointer" }}
      >
        &#x1F441;&nbsp;View
      </a>
    </span>
  );
};

function transformStructuresToData(
  headers: Record<StatID, string>,
  structures: Structure[],
  setActiveStructure: (structure: {
    fileName: string;
    downloadName: string;
  }) => void
): { verticalHeaders: Header[]; data: TableData[] } {
  const verticalHeaders: Header[] = [];

  const data: TableData[] = structures.map(({ model, rank, stats }) => {
    const name = model.split("/").pop() || model;
    return {
      rank,
      ...stats,
      path: structureCell(model, name, setActiveStructure),
    };
  });

  Object.entries(headers).forEach(([key, value]) => {
    let sort: string | boolean;
    let type: ValueType;
    if (key === "model") {
      sort = false;
      type = "html";
    } else {
      sort = true;
      type = "value";
    }
    const header: Header = { key, value, sort, type };
    verticalHeaders.push(header);
  });

  return { verticalHeaders, data };
}

export const StructureTable = ({ headers, structures }: Props) => {
  const [activeStructure, setActiveStructure] = useState({
    fileName: "",
    downloadName: "",
  });

  const { verticalHeaders, data } = useMemo(
    () => transformStructuresToData(headers, structures, setActiveStructure),
    [headers, structures, setActiveStructure]
  );
  const table = <SortableTable data={data} verticalHeaders={verticalHeaders} />;
  return (
    <div>
      <NglViewer activeStructure={activeStructure} />
      {table}
    </div>
  );
};
