import SortableTable from "./components/SortableTable/SortableTable";
import { data, columns } from "./examples/TableData";

const App = () => {
  return <SortableTable data={data} columns={columns} />;
};

export default App;
