import { Header } from "./components/Header";
import { Item } from "./components/Item";
import data from "./data/example-data.json";

function App() {
  const columns = Object.keys(data[0].data);

  return (
    <table>
      <Header columns={columns} />
      <tbody>
        {data.map((item, index) => {
          return (
            <Item
              rowKey={index}
              columns={columns}
              data={item.data}
              rowChildren={item.children}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default App;
