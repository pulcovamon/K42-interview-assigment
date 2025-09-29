import { createContext } from "react";
import type { Action, State } from "./types";

export const ACTIONS = {
  LOAD_DATA: "load-data",
  TOGGLE: "toggle",
  REMOVE_NODE: "remove-node",
} as const;

export const initialState: State = {
  data: {},
  expanded: {},
  columns: [],
};

export const DataContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });
