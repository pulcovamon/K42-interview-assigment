import { useState } from "react";
import type { JSONRecord } from "../classes/types";
import { Header } from "./Header";

export function Item({
  rowKey,
  columns,
  data,
  rowChildren,
}: {
  rowKey: number;
  columns: string[];
  data: object;
  rowChildren: object;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const keys =
    rowChildren && typeof rowChildren === "object"
      ? Object.keys(rowChildren as Record<string, any>)
      : [];
  const records = keys.length
    ? (rowChildren as Record<string, any>)[keys[0]]?.records ?? []
    : [];
  const hasChildren = records.length > 0;
  const childrensColumns = hasChildren ? Object.keys(records[0].data) : [];

  return (
    <>
      <tr key={rowKey}>
        {hasChildren ? (
          <td onClick={() => setIsOpen(!isOpen)}>{isOpen ? "🔽" : "▶️"}</td>
        ) : (
          <td>{""}</td>
        )}
        {columns.map((column: string) => {
          return <td key={column}>{data[column]}</td>;
        })}
        <td>❌</td>
      </tr>
      {hasChildren && isOpen && (
        <>
          <Header columns={childrensColumns} />
          <tbody>
            {records.map((child: JSONRecord, index: number) => (
              <Item
                rowKey={index}
                data={child.data}
                rowChildren={child.children}
                columns={childrensColumns}
              />
            ))}
          </tbody>
        </>
      )}
    </>
  );
}
