import { useMemo, useState, Fragment } from "react";
import HTMLString from 'react-html-string';
import "./SortableTable.css";

interface header {
  key: string;
  value: string;
}

interface Stats {
  mean: number;
  std: number;
}

type HtmlString = string;

interface TableData {
  [key: string]: Stats | number | string | HtmlString[];
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
  content: Stats | number | string | HtmlString[];
}

const SortableTable = ({
  data,
  verticalHeaders = [],
  horizontalHeaders = [],
}: SortableTableProps) => {
  const [sortState, setSortState] = useState<SortState>({
    sortKey:
      horizontalHeaders.length > 0
        ? horizontalHeaders[0].key
        : verticalHeaders[0].key,
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
      return sortOrder === "asc" ? "▼" : "▲";
    }
    return "";
  };

  const sortedData = useMemo(() => {
    const { sortKey, sortOrder } = sortState;
    const isArrayOfStrings = (content: any): content is HtmlString[] => {
      return Array.isArray(content) && content.every((item) => typeof item === "string");
    };
    const getValue = (content: Stats | number | string | HtmlString[]) => {
      if (typeof content === "object" && content !== null) {
        if ("mean" in content){
          return content.mean;
        }
      }
      return content;
    };
    if (sortKey) {
      return [...data].sort((a, b) => {
        const valueA = getValue(a[sortKey]);
        const valueB = getValue(b[sortKey]);

        // Exclude HtmlString from sorting
        if (isArrayOfStrings(valueA) || isArrayOfStrings(valueB)) {
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

  const TableCellContent = ({ content }: TableCellContentProps) => {
    const isArrayOfStrings = (content: any): content is HtmlString[] => {
      return Array.isArray(content) && content.every((item) => typeof item === "string");
    };
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
    if (isArrayOfStrings(content)){
      const renderedContent = content.map((item, index) => (
        <Fragment key={index}>
          {index > 0 && ", "} {/* Add a comma after each element */}
          <HTMLString html={item} />
        </Fragment>
      ));
      return <>{renderedContent}</>;
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
              <th>{item[header.key] as "object"}</th>
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
                <TableCellContent content={item[header.key]} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SortableTable;
