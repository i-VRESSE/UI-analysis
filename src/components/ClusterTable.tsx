type StatID = string;
interface Stats {
  mean: number;
  std: number;
}

export interface Cluster {
  rank: number | "Unclustered";
  id: number | "-";
  size: number;
  best: string[];
  stats: Record<StatID, Stats>;
}

interface Props {
  stat_labels: Record<StatID, string>;
  clusters: Cluster[];
  maxbest?: number;
}

export const ClusterTable = ({ stat_labels, clusters, maxbest = 4 }: Props) => {
  return (
    <table>
      <caption>{maxbest}</caption>
    </table>
  );
};
