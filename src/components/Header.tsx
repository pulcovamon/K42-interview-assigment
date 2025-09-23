export function Header({ columns }: { columns: string[] }) {
  return (
    <thead>
      <tr>
        <th>children</th>
        {columns.map((column) => {
          return <th key={column}>{column}</th>;
        })}
        <th>delete</th>
      </tr>
    </thead>
  );
}
