import { useMemo, useState } from "react";
import "./SortableTable.css";

interface Header {
  key: string;
  value: string;
  sort: string | boolean;
  type: string;
}

interface Stats {
  mean: number;
  std: number;
}

type HtmlString = string;

interface TableContentProps {
  content: Stats | number | string | HtmlString;
  type: string;
}

interface TableData {
  [key: string]: Stats | number | string | HtmlString;
}

interface SortState {
  sortKey: string;
  sortOrder: "asc" | "desc";
  sortType: string | boolean;
  valueType: string;
}

interface SortableTableProps {
  data: TableData[];
  verticalHeaders: Header[];
  horizontalHeaders?: Header[];
}

const SortableTable = ({
  data,
  verticalHeaders = [],
  horizontalHeaders = [],
}: SortableTableProps) => {
  const [sortState, setSortState] = useState<SortState>(() => {
    const firstHeader =
      horizontalHeaders.length > 0 ? horizontalHeaders[0] : verticalHeaders[0];
    return {
      sortKey: firstHeader.key,
      sortOrder: "asc",
      sortType: firstHeader.sort,
      valueType: firstHeader.type,
    };
  });

  const handleSort = (key: string, sort: string | boolean, type: string) => {
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
    const getValue = (content: Stats | number | string | HtmlString) => {
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
        return sortOrder === "asc" ? "↓" : "↑";
      }
      return "↑↓";
    }
    return "";
  };

  const TableCellContent = ({ content, type }: TableContentProps) => {
    if (type === "stats") {
      const { mean, std } = content as Stats;
      return (
        <>
          {mean} ± {std}
        </>
      );
    }
    if (type === "html") {
      const htmlContent = content as HtmlString;
      return <span dangerouslySetInnerHTML={{ __html: htmlContent }} />;
    }
    return <>{content}</>;
  };

  // TODO: use flex box in css
  // TODO: fix sort function for horizontalHeaders
  return (
    <table>
      <thead>
        {horizontalHeaders.map((header) => (
          <tr>
            <th
              key={header.key}
              onClick={() => handleSort(header.key, header.sort, header.type)}
            >
              {header.value}
              <span className="sort-icon">
                {getSortIcon(header.key, header.sort)}
              </span>
            </th>
            {sortedData.map((item) => (
              <th>{item[header.key] as "object"}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {verticalHeaders.map((header) => (
          <tr>
            <th
              key={header.key}
              onClick={() => handleSort(header.key, header.sort, header.type)}
            >
              {header.value}
              <span className="sort-icon">
                {getSortIcon(header.key, header.sort)}
              </span>
            </th>
            {sortedData.map((item) => (
              <td key={header.key}>
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
