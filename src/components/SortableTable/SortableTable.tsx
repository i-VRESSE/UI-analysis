import { useMemo, useState } from "react";
import "./SortableTable.css";

interface Row {
  key: string;
  value: string;
}

interface Stats {
  mean: number;
  std: number;
}

interface TableData {
  [key: string]: Stats | number | string;
}

interface SortState {
  sortKey: string;
  sortOrder: "asc" | "desc";
}

interface SortableTableProps {
  data: TableData[];
  rows: Row[];
  headers: Row[];
}

const SortableTable = ({
  data,
  rows,
  headers
}: SortableTableProps) => {
  const [sortState, setSortState] = useState<SortState>({
    sortKey: headers[0].key,
    sortOrder: "asc",
  });

  const handleSort = (key: string) => {
    setSortState((prevSortState) => {
      if (prevSortState.sortKey === key) {
        return {
          sortKey: key,
          sortOrder: prevSortState.sortOrder === "asc" ? "desc" : "asc",
        };
      } else {
        return {
          sortKey: key,
          sortOrder: "asc",
        };
      }
    });
  };

  const getSortIcon = (key: string) => {
    const { sortKey, sortOrder } = sortState;
    if (sortKey === key) {
      return sortOrder === "asc" ? "↕︎" : "↕︎";
    }
    return "";
  };

  const sortedData = useMemo(() => {
    const { sortKey, sortOrder } = sortState;
    if (sortKey) {
      return [...data].sort((a, b) => {
        const valueA =
          typeof a[sortKey] === "object" && (a[sortKey] as Stats)?.mean !== undefined
            ? (a[sortKey] as Stats).mean
            : a[sortKey];
        const valueB =
          typeof b[sortKey] === "object" && (b[sortKey] as Stats)?.mean !== undefined
            ? (b[sortKey] as Stats).mean
            : b[sortKey];

        if (valueA < valueB) {
          return sortOrder === "asc" ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortOrder === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return data;
  }, [data, sortState]);

  return (
    <table>
      <thead>
        {headers.map((header) => (
          <tr>
            <th onClick={() => handleSort(header.key)}>
              {header.value} {getSortIcon(header.key)}
            </th>
            {sortedData.map((item) => (
              <th>{(item[header.key] as "object")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr>
            <th key={row.key} onClick={() => handleSort(row.key)}>
              {row.value} {getSortIcon(row.key)}
            </th>
            {sortedData.map((item) => (
              <td key={row.key}>
                {typeof item[row.key] === "object" &&
                item[row.key] !== null &&
                (item[row.key] as Stats).mean !== undefined &&
                (item[row.key] as Stats).std !== undefined ? (
                  <>
                  {(item[row.key] as Stats).mean} ± {(item[row.key] as Stats).std}
                  </>
                ) : (
                  <>{item[row.key]}</>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SortableTable;
