import { useCallback, useContext, useMemo } from "react"
import { ACTIONS, DataContext } from "../constants/constants";

const useData = () => {
    const context = useContext(DataContext);

    if (context === undefined) {
        throw new Error("useData must be used with DataContext!");
    }

    const { state, dispatch } = context;
    
    const roots = useMemo(() => {
        return Object.values(state.data).filter(n => n.parentID === null);
    }, [state.data])

    const getNode = useCallback((id: string) => {
        return state.data[id];
    }, [state.data])

    const getChildren = useCallback((id: string) => {
        const node = state.data[id]
        if (node.childrenIDS.length > 0) {
            return node.childrenIDS.map(ch => {
                return state.data[ch];
            })
        }
        return [];
    }, [state.data])
    
    const toggle = useCallback((id: string) => {
        dispatch({ type: ACTIONS.TOGGLE, payload: { id }})
    }, [dispatch]);


    const removeNode = useCallback((id: string) => {
        dispatch({ type: ACTIONS.REMOVE_NODE, payload: { id }})
    }, [dispatch]);

    const isExpanded = useCallback((id: string) => {
        return Boolean(state.expanded[id]);
    }, [state.expanded])

    return { state, roots, isExpanded, toggle, removeNode, getChildren, getNode };
}

export default useData;