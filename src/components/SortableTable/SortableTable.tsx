import React, { useMemo, useState } from "react";
import "./SortableTable.css";

interface Column {
  key: string;
  header: string;
}

interface TableData {
  [key: string]: { mean?: number; std?: number } | any;
}

interface SortState {
  sortKey: string | null;
  sortOrder: "asc" | "desc";
}

interface SortableTableProps {
  data: TableData[];
  columns: Column[];
  rows: Column[];
}

const SortableTable: React.FC<SortableTableProps> = ({
  data,
  columns,
  rows,
}) => {
  const [sortState, setSortState] = useState<SortState>({
    sortKey: columns[0].key,
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
          typeof a[sortKey] === "object" && a[sortKey]?.mean !== undefined
            ? a[sortKey].mean
            : a[sortKey];
        const valueB =
          typeof b[sortKey] === "object" && b[sortKey]?.mean !== undefined
            ? b[sortKey].mean
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
        {rows.map((row) => (
          <tr>
            <th onClick={() => handleSort(row.key)}>
              {row.header} {getSortIcon(row.key)}
            </th>
            {sortedData.map((item) => (
              <th>{item[row.key]}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {columns.map((column) => (
          <tr>
            <th key={column.key} onClick={() => handleSort(column.key)}>
              {column.header} {getSortIcon(column.key)}
            </th>
            {sortedData.map((item) => (
              <td key={column.key}>
                {typeof item[column.key] === "object" &&
                item[column.key]?.mean !== undefined &&
                item[column.key]?.std !== undefined ? (
                  `${item[column.key].mean} ± ${item[column.key].std}`
                ) : (
                  item[column.key]
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
