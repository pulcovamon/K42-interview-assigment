import { ACTIONS } from "../constants/constants";
import type { State, Action, NodeID, Node } from "../constants/types";

const removeNode = (
  nodes: Record<NodeID, Node>,
  expanded: Record<NodeID, boolean>,
  id: NodeID
) => {
  const idsToRemove = new Set<NodeID>();

  const search = (nodeID: NodeID) => {
    idsToRemove.add(nodeID);
    nodes[nodeID]?.childrenIDS.forEach((ch) => search(ch));
  };
  search(id);

  const newData: Record<NodeID, Node> = { ...nodes };
  idsToRemove.forEach((rid) => {
    delete newData[rid];
  });

  const parentID = nodes[id]?.parentID;
  if (parentID) {
    const parent = newData[parentID];
    if (parent) {
      newData[parentID] = {
        ...parent,
        childrenIDS: parent.childrenIDS.filter((cid) => !idsToRemove.has(cid)),
      };
    }
  }
  const newExpanded = Object.fromEntries(
    Object.entries(expanded).filter(([key]) => !idsToRemove.has(key))
  );
  return { newData, newExpanded };
};

const DataReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTIONS.LOAD_DATA: {
      const data = action.payload.data;
      return { ...state, data };
    }
    case ACTIONS.TOGGLE: {
      const { id } = action.payload;
      return {
        ...state,
        expanded: { ...state.expanded, [id]: !state.expanded[id] },
      };
    }
    case ACTIONS.REMOVE_NODE: {
      const { newData, newExpanded } = removeNode(
        state.data,
        state.expanded,
        action.payload.id
      );
      return { ...state, data: newData, expanded: newExpanded };
    }
    default:
      return state;
  }
};

export default DataReducer;
