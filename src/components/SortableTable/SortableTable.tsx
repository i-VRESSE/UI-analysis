import { useMemo, useState } from "react";
import "./SortableTable.css";

export type ValueType = "html" | "stats" | "value";
interface Header {
  key: string;
  value: string;
  sort: string | boolean;
  type: ValueType;
}

interface Stats {
  mean: number;
  std: number;
}

interface TableContentProps {
  content: Stats | number | string | JSX.Element;
  type: ValueType;
}

interface TableData {
  [key: string]: Stats | number | string | JSX.Element;
}

interface SortState {
  sortKey: string;
  sortOrder: "asc" | "desc";
  sortType: string | boolean;
  valueType: ValueType;
}

interface SortableTableProps {
  data: TableData[];
  verticalHeaders: Header[];
}

const SortableTable = ({ data, verticalHeaders = [] }: SortableTableProps) => {
  const [sortState, setSortState] = useState<SortState>(() => {
    return {
      sortKey: verticalHeaders[0].key,
      sortOrder: "asc",
      sortType: verticalHeaders[0].sort,
      valueType: verticalHeaders[0].type,
    };
  });

  const handleSort = (key: string, sort: string | boolean, type: ValueType) => {
    if (sort) {
      setSortState((prevSortState) => {
        return {
          sortKey: key,
          sortOrder:
            prevSortState.sortKey === key
              ? prevSortState.sortOrder === "asc"
                ? "desc"
                : "asc"
              : "asc",
          sortType: sort,
          valueType: type,
        };
      });
    }
  };

  const sortedData = useMemo(() => {
    const { sortKey, sortOrder, sortType, valueType } = sortState;
    const getValue = (content: Stats | number | string | JSX.Element) => {
      if (valueType === "stats") {
        const { mean, std } = content as Stats;
        if (sortType === "mean") {
          return mean;
        } else if (sortType === "std") {
          return std;
        }
      }
      return content;
    };
    if (sortKey && sortType) {
      return [...data].sort((a, b) => {
        const valueA = getValue(a[sortKey]);
        const valueB = getValue(b[sortKey]);

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

  const getSortIcon = (key: string, sort: string | boolean) => {
    const { sortKey, sortOrder } = sortState;
    if (sort) {
      if (sortKey === key) {
        return sortOrder === "asc" ? "→" : "←";
      }
      return "⇄";
    }
    return "";
  };

  const TableCellContent = ({ content, type }: TableContentProps) => {
    if (type === "stats") {
      const { mean, std } = content as Stats;
      if (std === 0) {
        return <>{mean}</>;
      }
      return (
        <>
          {mean} ± {std}
        </>
      );
    }
    return <>{content}</>;
  };

  // TODO: use flex box in css
  return (
    <table>
      <thead></thead>
      <tbody>
        {verticalHeaders.map((header) => (
          <tr key={header.key}>
            <th
              onClick={() => handleSort(header.key, header.sort, header.type)}
            >
              {header.value}
              <span
                className={
                  header.key === sortState.sortKey
                    ? "sort-icon active"
                    : "sort-icon"
                }
              >
                {getSortIcon(header.key, header.sort)}
              </span>
            </th>
            {sortedData.map((item, i) => (
              <td key={header.key + i}>
                <TableCellContent
                  content={item[header.key]}
                  type={header.type}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SortableTable;
