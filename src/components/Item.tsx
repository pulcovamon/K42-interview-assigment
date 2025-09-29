import { memo, useMemo } from "react";
import type { Node } from "../constants/types";
import Header from "./Header";
import { getColumnNames } from "../utils/utils";
import useData from "../hooks/useData";

const Item = memo(function Item({
  node,
  columns,
  level,
}: {
  node: Node;
  columns: string[];
  level: number;
}) {
  const { isExpanded, toggle, removeNode, getChildren } = useData();
  const expanded = isExpanded(node.nodeID);
  const children = getChildren(node.nodeID);
  const childrensColumns = useMemo(() => {
    if (!children || children.length === 0) return [];
    return getColumnNames(children);
  }, [children]);

  return (
    <>
      <tr className="h-15 text-white">
        <td className="text-center" style={{ paddingLeft: level * 50 }}>
          {children.length > 0 ? (
            <button
              onClick={() => toggle(node.nodeID)}
              aria-label={expanded ? "Open" : "Close"}
            >
              {expanded ? "🔽" : "▶️"}
            </button>
          ) : null}
        </td>

        {columns.map((col) => (
          <td
            key={col}
            className="text-center"
            style={{ paddingLeft: level * 50 }}
          >
            {col in node.data ? node.data[col] : "-"}
          </td>
        ))}

        <td className="text-center" style={{ paddingLeft: level * 50 }}>
          <button
            onClick={() => removeNode(node.nodeID)}
            aria-label="Delete node"
          >
            ❌
          </button>
        </td>
      </tr>

      {children.length > 0 && expanded && (
        <>
          <Header columns={childrensColumns} level={level + 1} />
          {children?.map((ch) => {
            if (ch) {
              return (
                <Item
                  key={ch.nodeID}
                  node={ch}
                  columns={childrensColumns}
                  level={level + 1}
                />
              );
            }
            return null;
          })}
        </>
      )}
    </>
  );
});

export default Item;
