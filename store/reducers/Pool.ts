import * as actionTypes from "../actions/PoolActions/types";
import { PoolReducer } from "../../models/Pool";

const initialState: PoolReducer = {
  pools: null,
  selectedPool: null,
  loading: false,
  error: "",
  txType: "All",
  txCount: "",
};

const poolReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_POOLS_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_POOLS_SUCCESS:
      return {
        ...state,
        pools: action.payload,
        loading: false,
      };
    case actionTypes.GET_POOLS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case actionTypes.SELECT_POOL:
      return {
        ...state,
        selectedPool: action.payload,
      };
    case actionTypes.SELECT_TX_TYPE:
      return {
        ...state,
        txType: action.payload,
      };
    default:
      return state;
  }
};

export default poolReducer;
