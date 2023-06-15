import React, { useState } from 'react';
import './SortableTable.css';

interface Column {
  key: string;
  header: string;
}

interface TableData {
  [key: string]: any;
}

interface SortState {
  sortKey: string | null;
  sortOrder: 'asc' | 'desc';
}

interface SortableTableProps {
  data: TableData[];
  columns: Column[];
}

const SortableTable: React.FC<SortableTableProps> = ({ data, columns }) => {
  const [sortState, setSortState] = useState<SortState>({
    sortKey: columns[0].key,
    sortOrder: 'asc',
  });

  const handleSort = (key: string) => {
    setSortState((prevSortState) => {
      if (prevSortState.sortKey === key) {
        return {
          sortKey: key,
          sortOrder: prevSortState.sortOrder === 'asc' ? 'desc' : 'asc',
        };
      } else {
        return {
          sortKey: key,
          sortOrder: 'asc',
        };
      }
    });
  };

  const getSortIcon = (key: string) => {
    const { sortKey, sortOrder } = sortState;
    if (sortKey === key) {
      return sortOrder === 'asc' ? '↕︎' : '↕︎';
    }
    return '';
  };

  const sortedData = React.useMemo(() => {
    const { sortKey, sortOrder } = sortState;
    if (sortKey) {
      return [...data].sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return data;
  }, [data, sortState]);

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} onClick={() => handleSort(column.key)}>
              {column.header} {getSortIcon(column.key)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column.key}>{item[column.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SortableTable;
