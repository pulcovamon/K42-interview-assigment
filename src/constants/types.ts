/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { ACTIONS } from "./constants";

export type NodeID = string;

export interface RawNode {
  data: Record<string, string | number | null>;
  children: {
    [relationship: string]:
      | {
          records: RawNode[];
        }
      | {};
  };
}

export interface Node {
  nodeID: NodeID;
  data: Record<string, string | number | null>;
  parentID: string | null;
  childrenIDS: string[];
}

export interface State {
  data: Record<NodeID, Node>;
  expanded: Record<NodeID, boolean>;
  columns: string[];
}

export type Action =
  | { type: typeof ACTIONS.LOAD_DATA; payload: { data: Record<NodeID, Node> } }
  | { type: typeof ACTIONS.TOGGLE; payload: { id: NodeID } }
  | {
      type: typeof ACTIONS.REMOVE_NODE;
      payload: { id: NodeID };
    };
