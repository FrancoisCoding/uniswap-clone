import Link from "next/link";
import { useEffect, useState } from "react";
import {
  MdKeyboardArrowLeft,
  MdStarRate,
  MdKeyboardArrowDown,
  MdOutlineCircle,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { bigNumFormatter } from "../../../src/utils/utils";
import { selectTxType } from "../../../store/actions/PoolActions/PoolActions";
import PoolTransactionsTable from "../../../src/components/Pool/PoolTransactionsTable";
import { State } from "../../../models/State";
import {
  watchlistAdd,
  watchlistRemove,
} from "../../../store/actions/WatchlistActions/WatchlistActions";

const PoolDetails = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: State) => state);
  const { selectedPool, txType, txCount } = state.pool;
  const { watchlist } = state.watchlist;
  const [open, setOpen] = useState(false);
  const [pagination, setPagination] = useState<{
    page: number;
    skip: number;
  }>({
    page: 1,
    skip: 0,
  });

  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    if (selectedPool) {
      setTransactions(
        selectedPool.burns.concat(selectedPool.mints, selectedPool.swaps)
      );
      setFilteredTransactions(
        selectedPool.burns.concat(selectedPool.mints, selectedPool.swaps)
      );
    }
  }, [selectedPool]);

  const selectType = (type: string) => {
    dispatch(selectTxType(type) as any);
    setOpen(false);
  };

  // Pagination Functions
  const prevPage = () => {
    if (pagination.page === 1) {
      return;
    }
    setPagination({
      ...pagination,
      page: pagination.page - 1,
      skip: pagination.skip - 10,
    });
  };

  const nextPage = () => {
    if (pagination.page === Math.ceil(transactions.length / 10)) {
      return;
    }
    setPagination({
      ...pagination,
      page: pagination.page + 1,
      skip: pagination.skip + 10,
    });
  };

  const filter = (filter) => {
    selectType(filter);
    if (filter === "All") {
      setFilteredTransactions(transactions);
      return;
    }
    setFilteredTransactions(
      transactions.filter(
        (transaction: any) => transaction.__typename === filter
      )
    );
  };
  return (
    <div className="sm:px-8 md:px-16 lg:px-32 xl:px-64 px-4 py-16 bg-custom-gray text-white h-full">
      <Link href="/pools">
        <span className="flex items-center hover:cursor-pointer">
          <MdKeyboardArrowLeft />
          Back to Pools
        </span>
      </Link>
      {selectedPool && selectedPool.token0 && (
        <>
          <div className="flex-col">
            <div className="flex justify-between text-base md:text-2xl py-5 items-center">
              <span>
                {selectedPool.token0.symbol}/{selectedPool.token1.symbol}
              </span>
              {watchlist.includes(selectedPool) ? (
                <div
                  className="flex items-center hover:cursor-pointer hover:opacity-80 bg-custom-button rounded-xl py-2 px-4"
                  onClick={() => dispatch(watchlistRemove(selectedPool) as any)}
                >
                  Remove From Watchlist
                </div>
              ) : (
                <div
                  className="flex items-center hover:cursor-pointer hover:opacity-80 bg-custom-button rounded-xl py-2 px-4"
                  onClick={() => dispatch(watchlistAdd(selectedPool) as any)}
                >
                  <MdStarRate />
                  Add to Watchlist
                </div>
              )}
            </div>
            <table className="w-full md:w-2/5 m-0	text-sm text-left text-gray-500">
              <thead className="text-base text-custom-title uppercase bg-custom-black border-custom-border border border-r-0	border-l-0  dark:bg-gray-700">
                <tr>
                  <th className="py-3 px-6">Tokens value (USD)</th>
                  <th className="py-3 px-6">TX Count</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-base text-white uppercase bg-custom-black border-custom-border border border-r-0 border-l-0 dark:bg-gray-800">
                  <td className="py-4 px-6 flex items-center">
                    <MdOutlineCircle className="mx-2" />
                    {selectedPool.token0.symbol}
                  </td>
                  <td className="py-4 px-6">
                    {bigNumFormatter(selectedPool.token0.txCount)}
                  </td>
                </tr>
                <tr className="text-base text-white uppercase bg-custom-black border-custom-border border border-r-0 border-l-0 dark:bg-gray-800">
                  <td className="py-4 px-6 flex items-center">
                    <MdOutlineCircle className="mx-2" />
                    {selectedPool.token1.symbol}
                  </td>
                  <td className="py-4 px-6">
                    {bigNumFormatter(selectedPool.token1.txCount)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex text-2xl py-5">
            <span>Transactions</span>
            <div className="relative select-none">
              <div
                className="px-4 md:px-10 mx-5 border hover:cursor-pointer text-center w-full flex items-center justify-center"
                onClick={() => setOpen(!open)}
              >
                {txType} <MdKeyboardArrowDown />
              </div>
              <div
                className={
                  open
                    ? "flex-col border text-center mx-5 w-full"
                    : "hidden absolute z-10"
                }
              >
                {txType !== "All" && (
                  <div
                    onClick={() => filter("All")}
                    className="hover:cursor-pointer"
                  >
                    All
                  </div>
                )}
                {txType !== "Swap" && (
                  <div
                    onClick={() => filter("Swap")}
                    className="hover:cursor-pointer"
                  >
                    Swap
                  </div>
                )}
                {txType !== "Mint" && (
                  <div
                    onClick={() => filter("Mint")}
                    className="hover:cursor-pointer"
                  >
                    Mint
                  </div>
                )}
                {txType !== "Burn" && (
                  <div
                    onClick={() => filter("Burn")}
                    className="hover:cursor-pointer"
                  >
                    Burn
                  </div>
                )}
              </div>
            </div>
          </div>
          <PoolTransactionsTable
            transactions={filteredTransactions}
            selectedPool={selectedPool}
          />
        </>
      )}
    </div>
  );
};

export default PoolDetails;
