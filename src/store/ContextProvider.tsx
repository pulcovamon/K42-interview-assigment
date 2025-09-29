import { useReducer, useEffect } from "react";
import type { ReactNode } from "react";
import DataReducer from "./dataReducer";
import raw from "../data/example-data.json";
import type { RawNode } from "../constants/types";
import { ACTIONS, DataContext, initialState } from "../constants/constants";
import { normalizeInpuData } from "../utils/utils";

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(DataReducer, initialState);

  useEffect(() => {
    const data = normalizeInpuData(raw as RawNode[]);
    dispatch({ type: ACTIONS.LOAD_DATA, payload: { data } });
  }, []);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export default ContextProvider;
