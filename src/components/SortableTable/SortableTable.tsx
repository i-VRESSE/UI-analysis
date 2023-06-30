import { useMemo, useState } from "react";
import "./SortableTable.css";


interface header {
  key: string;
  value: string;
}

interface Stats {
  mean: number;
  std: number;
}

type HTMLString = string;

interface TableData {
  [key: string]: Stats | number | string | HTMLString;
}

interface SortState {
  sortKey: string;
  sortOrder: "asc" | "desc";
}

interface SortableTableProps {
  data: TableData[];
  verticalHeaders: header[];
  horizontalHeaders?: header[];
}

interface TableCellContentProps {
  content: Stats | number | string | HTMLString;
}

const SortableTable = ({
  data,
  verticalHeaders = [],
  horizontalHeaders = []
}: SortableTableProps) => {
  const [sortState, setSortState] = useState<SortState>({
    sortKey: horizontalHeaders.length > 0 ? horizontalHeaders[0].key : verticalHeaders[0].key,
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

  // TODO: move icons to the right
  // TODO: show icons by default
  const getSortIcon = (key: string) => {
    const { sortKey, sortOrder } = sortState;
    if (sortKey === key) {
      return sortOrder === "asc" ? "▼": "▲";
    }
    return "";
  };

  const sortedData = useMemo(() => {
    const { sortKey, sortOrder } = sortState;
    const getValue = (content: Stats | number | string | HTMLString) => {
      if (typeof content === "object" && content?.mean !== undefined){
        return content.mean
      }
      return content;
    };
    if (sortKey) {
      return [...data].sort((a, b) => {
        const valueA = getValue(a[sortKey]);
        const valueB = getValue(b[sortKey]);

       // Exclude HTMLString from sorting
        if (
          !(a[sortKey] as HTMLString) &&
          !(b[sortKey] as HTMLString)
        ) {
          return 0;
        }

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

  const TableCellContent = ({content}: TableCellContentProps) => {
    if (typeof content === "object" && content !== null) {
      const { mean, std } = content as Stats;
      if (mean !== undefined && std !== undefined) {
        return (
          <>
            {mean} ± {std}
          </>
        );
      }
    }
    return <>{content}</>;
  };

  // TODO: use flex box in css
  return (
    <table>
      <thead>
        {horizontalHeaders.map((header) => (
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
        {verticalHeaders.map((header) => (
          <tr>
            <th key={header.key} onClick={() => handleSort(header.key)}>
              {header.value} {getSortIcon(header.key)}
            </th>
            {sortedData.map((item) => (
              <td key={header.key}>
                <TableCellContent content={item[header.key]}/>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SortableTable;
