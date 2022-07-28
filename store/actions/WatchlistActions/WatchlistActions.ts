import * as actionTypes from "./types";
import { Pool } from "../../../models/Pool";

export const watchlistAdd = (pool: Pool) => (dispatch) => {
  dispatch({ type: actionTypes.WATCHLIST_ADD, payload: pool });
};

export const watchlistRemove = (pool: Pool) => (dispatch) => {
  dispatch({ type: actionTypes.WATCHLIST_REMOVE, payload: pool });
};
