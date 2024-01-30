import { ValueType } from "./SortableTable/SortableTable";

export type StatID = string;

export interface Stats {
  mean: number;
  std: number;
}

export interface TableData {
  [key: string]: number | string | JSX.Element | Stats;
}

export interface Header {
  key: string;
  value: string;
  sort: string | boolean;
  type: ValueType;
}
