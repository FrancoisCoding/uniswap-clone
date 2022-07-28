import * as actionTypes from "./types";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { Pool } from "../../../models/Pool";

const APIURL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3";

const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});

export const getPools = (query: string) => (dispatch) => {
  dispatch({ type: actionTypes.GET_POOLS_START });

  client
    .query({
      query: gql(query),
    })
    .then((res) => {
      dispatch({ type: actionTypes.GET_POOLS_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: actionTypes.GET_POOLS_FAILURE, payload: err });
    });
};

export const selectPool = (pool: Pool) => (dispatch) => {
  dispatch({ type: actionTypes.SELECT_POOL, payload: pool });
};

export const selectTxType = (type: string) => (dispatch) => {
  dispatch({ type: actionTypes.SELECT_TX_TYPE, payload: type });
};
