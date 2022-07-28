import * as actionTypes from "../actions/WatchlistActions/types";
import { WatchlistReducer } from "../../models/Watchlist";

const initialState: WatchlistReducer = {
  watchlist: [],
};

const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.WATCHLIST_ADD:
      return {
        ...state,
        watchlist: [...state.watchlist, action.payload],
      };
    case actionTypes.WATCHLIST_REMOVE:
      const newArray = state.watchlist.filter(
        (pool) => pool !== action.payload
      );
      return {
        ...state,
        watchlist: newArray,
      };
    default:
      return state;
  }
};

export default watchlistReducer;
