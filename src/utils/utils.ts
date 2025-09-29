import type { Node, NodeID, RawNode } from "../constants/types";

export const getColumnNames = (children: Node[]): string[] => {
  const keys = children.reduce<string[]>((total, child) => {
    return [...total, ...Object.keys(child.data)];
  }, []);
  return [...new Set(keys)];
};

const makeId = (): NodeID => {
  return (
    crypto?.randomUUID?.() ?? (Math.random().toString(36).slice(2) as NodeID)
  );
};

export const normalizeInpuData = (raw: RawNode[]): Record<NodeID, Node> => {
  const out: Record<NodeID, Node> = {};

  const walk = (n: RawNode, parentID: NodeID | null): NodeID => {
    const id = makeId();

    const rawChildren: RawNode[] = Object.values(n.children ?? {}).flatMap(
      (v: any) => (Array.isArray(v?.records) ? v.records : [])
    );

    const childrenIDS = rawChildren.map((child) => walk(child, id));

    out[id] = {
      nodeID: id,
      data: n.data ?? {},
      parentID,
      childrenIDS,
    };

    return id;
  };

  raw.forEach((root) => walk(root, null));

  return out;
};
