import { Header } from "./components/Header";
import { Item } from "./components/Item";
import data from "./data/example-data.json";
import "./index.css";

function App() {
  const columns = [...new Set(...data.map(item => {
    return Object.keys(item.data);
  }))]
  return (
      <table className="w-full bg-stone-700">
        <Header columns={columns} padding={0}/>
        <tbody>
          {data.map((item, index) => {
            return (
              <Item
                rowKey={index}
                columns={columns}
                data={item.data}
                rowChildren={item.children}
                padding={0}
              />
            );
          })}
        </tbody>
      </table>
  );
}

export default App;
