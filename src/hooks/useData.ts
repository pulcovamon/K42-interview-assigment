import { useCallback, useContext, useMemo } from "react"
import { ACTIONS, DataContext } from "../constants/constants";
import type { NodeID } from "../constants/types";

const useData = () => {
    const context = useContext(DataContext);

    if (context === undefined) {
        throw new Error("useData must be used with DataContext!");
    }

    const { state, dispatch } = context;
    
    const roots = useMemo(() => {
        return Object.values(state.data).filter(n => n.parentID === null);
    }, [state.data])

    const getNode = useCallback((id: NodeID) => {
        return state.data[id];
    }, [state.data])

    const getChildren = useCallback((id: NodeID) => {
        const node = state.data[id]
        if (node.childrenIDS.length > 0) {
            return node.childrenIDS.map(ch => {
                return state.data[ch];
            })
        }
        return [];
    }, [state.data])
    
    const toggle = useCallback((id: NodeID) => {
        dispatch({ type: ACTIONS.TOGGLE, payload: { id }})
    }, [dispatch]);


    const removeNode = useCallback((id: NodeID) => {
        dispatch({ type: ACTIONS.REMOVE_NODE, payload: { id }})
    }, [dispatch]);

    const isExpanded = useCallback((id: NodeID) => {
        return Boolean(state.expanded[id]);
    }, [state.expanded])

    return { state, roots, isExpanded, toggle, removeNode, getChildren, getNode };
}

export default useData;