import { useMemo, useState, Fragment } from "react";
import "./SortableTable.css";

interface Header {
  key: string;
  value: string;
  sort: string | boolean;
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
  sortType: string | boolean;
}

interface SortableTableProps {
  data: TableData[];
  verticalHeaders: Header[];
  horizontalHeaders?: Header[];
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
    sortType:
      horizontalHeaders.length > 0
        ? horizontalHeaders[0].sort
        : verticalHeaders[0].sort,
  });

  const handleSort = (key: string, sort: string | boolean) => {
    if (sort) {
      setSortState((prevSortState) => {
        if (prevSortState.sortKey === key) {
          return {
            sortKey: key,
            sortOrder: prevSortState.sortOrder === "asc" ? "desc" : "asc",
            sortType: sort,
          };
        } else {
          return {
            sortKey: key,
            sortOrder: "asc",
            sortType: sort,
          };
        }
      });
    }
  };

  const sortedData = useMemo(() => {
    const { sortKey, sortOrder, sortType } = sortState;
    const getValue = (content: Stats | number | string | HtmlString[]) => {
      if (typeof content === "object" && content !== null) {
        if (sortType === "mean" && "mean" in content) {
          return content.mean;
        } else if (sortType === "std" && "std" in content) {
          return content.std;
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

  const TableCellContent = ({ content }: TableCellContentProps) => {
    const isArrayOfStrings = (content: any): content is HtmlString[] => {
      return (
        Array.isArray(content) &&
        content.every((item) => typeof item === "string")
      );
    };
    if (typeof content === "object" && content !== null) {
      const { mean, std } = content as Stats;
      if (mean !== undefined && std !== undefined) {
        return (
          <>
            {/*use react fstring */}
            {mean} ± {std}
          </>
        );
      }
    }
    if (isArrayOfStrings(content)) {
      const renderedContent = content.map((item, index) => (
        <Fragment key={index}>
          {index > 0 && ", "} {/* Add a comma after each element */}
          <span dangerouslySetInnerHTML={{ __html: item }} />
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
            <th onClick={() => handleSort(header.key, header.sort)}>
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
              onClick={() => handleSort(header.key, header.sort)}
            >
              {header.value}
              <span className="sort-icon">
                {getSortIcon(header.key, header.sort)}
              </span>
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
