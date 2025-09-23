export function Header({
  columns,
  padding,
}: {
  columns: string[];
  padding: number;
}) {
  return (
    <tr className="h-15">
        {Array(padding).fill(0).map((_, index) => {
          return <td key={index}></td>;
        })}
      <th key="children" className="w-20 bg-teal-300"></th>
      {columns.map((column) => {
        return (
          <th key={column} className="bg-teal-300">
            {column}
          </th>
        );
      })}
      <th key="delete" className="w-20 bg-teal-300">delete</th>
    </tr>
  );
}
