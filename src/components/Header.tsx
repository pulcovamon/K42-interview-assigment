const Header = ({ columns, level }: { columns: string[]; level: number }) => {
  return (
    <tr className="h-15">
      <th className="w-20 bg-teal-300" style={{ paddingLeft: level * 50 }}></th>
      {columns.map((column) => (
        <th
          key={column}
          className="bg-teal-300"
          style={{ paddingLeft: level * 50 }}
        >
          {column}
        </th>
      ))}
      <th className="w-20 bg-teal-300" style={{ paddingLeft: level * 50 }}>
        delete
      </th>
    </tr>
  );
};

export default Header;
