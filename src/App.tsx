import Header from "./components/Header";
import Item from "./components/Item";
import "./index.css";
import { getColumnNames } from "./utils/utils";
import useData from "./hooks/useData";

const App = () => {
  const { roots } = useData();
  const columns = getColumnNames(roots);
  return (
    <table className="w-full bg-stone-700">
      <thead>
        <Header columns={columns} level={0} />
      </thead>
      <tbody>
        {roots.map((n) => (
          <Item key={n.nodeID} node={n} columns={columns} level={0} />
        ))}
      </tbody>
    </table>
  );
};

export default App;
