import { useState } from "react";
import type { JSONRecord } from "../classes/types";
import { Header } from "./Header";

export function Item({
  rowKey,
  columns,
  data,
  rowChildren,
  padding,
}: {
  rowKey: number;
  columns: string[];
  data: object;
  rowChildren: object;
  padding: number;
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
  const childrensColumns = hasChildren
    ? [
        ...new Set(
          ...records.map((item) => {
            return Object.keys(item.data);
          })
        ),
      ]
    : [];
  const bgColor = rowKey % 2 === 0 ? "bg-stone-700" : "bg-stone-800";

  return (
    <>
      <tr className="h-15 text-white" key={rowKey}>
        {Array(padding)
          .fill(0)
          .map((_, index) => {
            return <td key={index}></td>;
          })}
        <td
          key="show-children"
          className={`text-center ${bgColor}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {hasChildren ? <button>{isOpen ? "🔽" : "▶️"}</button> : <></>}
        </td>
        {columns.map((column: string, index: number) => {
          return (
            <td
              className={`text-center ${bgColor}`}
              key={column}
            >
              {column in data ? data[column] : "-"}
            </td>
          );
        })}
        <td
          key="delete"
          className={`text-center ${bgColor} w-25`}
        >
          <button>❌</button>
        </td>
      </tr>

      {hasChildren && isOpen && (
        <>
          <Header columns={childrensColumns} padding={padding + 1} bgColor={bgColor} />
          {records.map((child: JSONRecord, index: number) => (
            <Item
              rowKey={index}
              data={child.data}
              rowChildren={child.children}
              columns={childrensColumns}
              padding={padding + 1}
            />
          ))}
        </>
      )}
    </>
  );
}
