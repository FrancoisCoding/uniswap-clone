import { combineReducers } from "redux";
import poolReducer from "./Pool";

import watchlistReducer from "./Watchlist";

const rootReducer = combineReducers({
  pool: poolReducer,
  watchlist: watchlistReducer,
});

export default rootReducer;
