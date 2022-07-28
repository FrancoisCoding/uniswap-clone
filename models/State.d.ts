import { PoolReducer } from "./Pool";
import { WatchlistReducer } from "./Watchlist";

export interface State {
  pool: PoolReducer;
  watchlist: WatchlistReducer;
}
