import { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { bigNumFormatter, timeDifference } from "../../../src/utils/utils";

const PoolTransactionsTable = ({ transactions, selectedPool }) => {
  const date = new Date();
  const [pagination, setPagination] = useState<{
    currentPage: number;
    itemsPerPage: number;
  }>({
    currentPage: 1,
    itemsPerPage: 10,
  });

  // Display Transactions
  const indexOfLastItem = pagination.currentPage * pagination.itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - pagination.itemsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const prevPage = () => {
    if (pagination.currentPage === 1) {
      return;
    }
    setPagination({ ...pagination, currentPage: pagination.currentPage - 1 });
  };

  const nextPage = () => {
    if (
      pagination.currentPage ===
      Math.ceil(transactions.length / pagination.itemsPerPage)
    ) {
      return;
    }
    setPagination({ ...pagination, currentPage: pagination.currentPage + 1 });
  };
  return (
    <div>
      {currentTransactions ? (
        <>
          <table className="w-full text-sm text-left text-gray-500 table-fixed">
            <thead className="text-base text-custom-title uppercase bg-custom-black border-custom-border border border-r-0	border-l-0  dark:bg-gray-700">
              <tr>
                <th className="py-3 px-6 hidden xl:table-cell">
                  Link to Etherscan
                </th>
                <th className="py-3 px-6">TX Type</th>
                <th className="py-3 px-6">Token Amount (USD)</th>
                <th className="py-3 px-6 hidden md:table-cell">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((transaction, index) => (
                <tr
                  className="text-base text-white uppercase bg-custom-black border-custom-border border border-r-0 border-l-0 dark:bg-gray-800 hover:cursor-pointer hover:text-white/60"
                  key={`${transaction.transaction.id}/${index}`}
                >
                  <td className="py-4 px-6 lowercase truncate hidden xl:table-cell">
                    <a
                      href={`https://etherscan.io/tx/${transaction.transaction.id}`}
                      className="truncate"
                    >{`https://etherscan.io/tx/${transaction.transaction.id}`}</a>
                  </td>
                  <td className="py-4 px-6">{transaction.__typename}</td>
                  <td className="py-4 px-6">
                    {transaction.txType === "Burn"
                      ? bigNumFormatter(transaction.burns[0].pool.volumeUSD)
                      : transaction.txType === "Swap"
                      ? bigNumFormatter(transaction.swaps[0].pool.volumeUSD)
                      : transaction.txType === "Mint"
                      ? bigNumFormatter(transaction.mints[0].pool.volumeUSD)
                      : 0}{" "}
                    {selectedPool.token0.symbol}
                  </td>
                  <td className="py-4 px-6 hidden md:table-cell">
                    {timeDifference(date, transaction.transaction.timestamp)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center w-full py-4 text-white bg-custom-black rounded-2xl items-center select-none">
            <AiOutlineArrowLeft
              onClick={() => prevPage()}
              className={
                pagination.currentPage === 1
                  ? "opacity-40 text-custom-arrow"
                  : "hover:cursor-pointer text-custom-arrow"
              }
            />
            <p className="px-2">
              {pagination.currentPage} of{" "}
              {Math.ceil(transactions.length / pagination.itemsPerPage)}
            </p>
            <AiOutlineArrowRight
              onClick={() => nextPage()}
              className={
                pagination.currentPage === Math.ceil(transactions.length / 10)
                  ? "opacity-40 text-custom-arrow"
                  : "hover:cursor-pointer text-custom-arrow"
              }
            />
          </div>
        </>
      ) : (
        <div className="bg-custom-black rounded-2xl">
          <h1 className="p-4 text-custom-title">
            Saved pools will appear here
          </h1>
        </div>
      )}
    </div>
  );
};

export default PoolTransactionsTable;
