import { createStore, applyMiddleware } from "redux";
import { rootReducer, IRootstate } from "./reducers/RootReducer";
import logger from "redux-logger";
import thunk, { ThunkMiddleware } from "redux-thunk";

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk as ThunkMiddleware<IRootstate>, logger)
);