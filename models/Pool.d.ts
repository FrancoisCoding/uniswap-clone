export interface PoolReducer {
  pools: { factories: Factory[]; pools: Pool[] };
  selectedPool: Pool;
  loading: boolean;
  error: string;
  txType: string;
  txCount: "";
}

export interface Pool {
  id: string;
  token0: Token;
  token1: Token;
  volumeUSD: string;
  txCount: string;
  totalValueLockedUSD: string;
  burns: [];
  swaps: [];
  mints: [];
  volumeUSD: string;
}

export interface Factory {
  poolCount: number;
  txCount: string;
}

export interface Token {
  id: string;
  symbol: string;
  totalLiquidity: string;
  tradeVolumeUSD: string;
  txCount: string;
}
