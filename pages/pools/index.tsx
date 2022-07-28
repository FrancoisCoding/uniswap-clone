import { useEffect, useState } from "react";
import Loader from "../../src/components/Loader/Loader";
import PoolTable from "../../src/components/Pool/PoolTable";
import { bigNumFormatter } from "../../src/utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { getPools } from "../../store/actions/PoolActions/PoolActions";
import { Pool } from "../../models/Pool";
import { State } from "../../models/State";

const Pools = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: State) => state);
  const [pools, setPools] = useState<Pool[]>([]);
  const [pagination, setPagination] = useState<{
    poolCount: number;
    page: number;
    skip: number;
  }>({
    poolCount: 0,
    page: 1,
    skip: 0,
  });
  const { loading } = state.pool;
  const { watchlist } = state.watchlist;
  const data = state.pool;

  const [poolsQuery, setPoolsQuery] = useState<string>(`
  query {
    factories {
        poolCount
      }
  pools(first: 10, skip: 0) {
      id
      token0 {
        id
        symbol
        name
        txCount
        poolCount
        totalSupply
        volumeUSD
        totalValueLockedUSD
        feesUSD
      }
      token1 {
        id
        symbol
        name
        txCount
        poolCount
        totalSupply
        volumeUSD
        totalValueLockedUSD
        feesUSD
      }
      volumeUSD
      txCount        
      totalValueLockedUSD
      mints {
        transaction {
          id
          timestamp
        }
        amountUSD
      }
      burns {
        transaction {
          id
          timestamp
        }
        amountUSD
      }
      swaps {
        transaction {
          id
          timestamp
        }
        amountUSD
      }
    }
  }
`);

  // Update Pools on Page Change
  useEffect(() => {
    dispatch(getPools(poolsQuery) as any);
  }, [poolsQuery, dispatch]);

  useEffect(() => {
    if (data && data.pools) {
      const newPools = data.pools.pools.map((pool) => {
        let token0 = pool.token0;
        let token1 = pool.token1;
        token0 = {
          ...token0,
          totalLiquidity: bigNumFormatter(token0.totalLiquidity),
          tradeVolumeUSD: bigNumFormatter(token0.tradeVolumeUSD),
        };
        token1 = {
          ...token1,
          totalLiquidity: bigNumFormatter(token1.totalLiquidity),
          tradeVolumeUSD: bigNumFormatter(token1.tradeVolumeUSD),
        };
        return {
          ...pool,
          token0: token0,
          token1: token1,
          volumeUSD: bigNumFormatter(pool.volumeUSD),
          totalValueLockedUSD: bigNumFormatter(pool.totalValueLockedUSD),
        };
      });
      setPools(newPools);
      setPagination({
        ...pagination,
        poolCount: data.pools.factories[0].poolCount,
      });
    }
  }, [data]);

  useEffect(() => {
    setPoolsQuery(`
    query {
      factories {
          poolCount
        }
    pools(first: 10, skip: ${pagination.skip}) {
        id
        token0 {
          id
          symbol
          name
          txCount
          poolCount
          totalSupply
          volumeUSD
          totalValueLockedUSD
          feesUSD
        }
        token1 {
          id
          symbol
          name
          txCount
          poolCount
          totalSupply
          volumeUSD
          totalValueLockedUSD
          feesUSD
        }
        volumeUSD
        txCount        
        totalValueLockedUSD
        mints {
          transaction {
            id
            timestamp
          }
          amountUSD
        }
        burns {
          transaction {
            id
            timestamp
          }
          amountUSD
        }
        swaps {
          transaction {
            id
            timestamp
          }
          amountUSD
        }
      }
    }
  `);
  }, [pagination]);

  // Pagination Functions
  const prevPage = () => {
    if (pagination.page === 1 || loading) {
      return;
    }
    setPagination({
      ...pagination,
      page: pagination.page - 1,
      skip: pagination.skip - 10,
    });
  };

  const nextPage = () => {
    if (pagination.page === Math.trunc(pagination.poolCount / 10) || loading) {
      return;
    }
    setPagination({
      ...pagination,
      page: pagination.page + 1,
      skip: pagination.skip + 10,
    });
  };

  return (
    <>
      {loading && pagination.page === 1 ? (
        <Loader />
      ) : (
        <div className="sm:px-8 md:px-16 lg:px-32 xl:px-64 px-4 py-16 bg-custom-gray">
          <h1 className="md:text-lefttext-center  py-4 text-custom-title">
            Your Watchlist
          </h1>
          <PoolTable
            pools={watchlist}
            pagination={pagination}
            prevPage={prevPage}
            nextPage={nextPage}
            type="Watchlist"
          />
          <h1 className="md:text-left text-center  py-4 text-custom-title">
            All Pools
          </h1>
          {pools && (
            <PoolTable
              pools={pools}
              pagination={pagination}
              prevPage={prevPage}
              nextPage={nextPage}
              type="All"
            />
          )}
        </div>
      )}
    </>
  );
};

export default Pools;
