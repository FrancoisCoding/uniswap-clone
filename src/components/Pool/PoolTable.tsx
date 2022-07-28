import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { GiLinkedRings } from "react-icons/gi";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { selectPool } from "../../../store/actions/PoolActions/PoolActions";

const PoolTable = ({ pools, pagination, prevPage, nextPage, type }) => {
  const dispatch = useDispatch();
  return (
    <div>
      {pools.length > 0 && pagination ? (
        <>
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-base text-custom-title uppercase bg-custom-black border-custom-border border border-r-0	border-l-0  dark:bg-gray-700">
              <tr>
                <th className="py-3 px-6 hidden lg:table-cell">#</th>
                <th className="py-3 px-6">Pool</th>
                <th className="py-3 px-6 hidden md:table-cell">TX Count</th>
                <th className="py-3 px-6 hidden lg:table-cell">TVL (USD)</th>
                <th className="py-3 px-6">Volume (USD)</th>
              </tr>
            </thead>
            <tbody>
              {pools.map((pool, index) => (
                <Link href={`/pools/${pool.id}`} key={pool.id}>
                  <tr
                    className="text-base text-white uppercase bg-custom-black border-custom-border border border-r-0 border-l-0 dark:bg-gray-800 hover:cursor-pointer hover:text-white/60"
                    onClick={() => dispatch(selectPool(pool) as any)}
                  >
                    <td className="py-4 px-6 hidden lg:table-cell">
                      {10 * (pagination.page - 1) + index + 1}
                    </td>
                    <td className="py-4 px-6 flex items-center">
                      <GiLinkedRings />
                      {pool.token0.symbol}/{pool.token1.symbol}
                    </td>
                    <td className="py-4 px-6 hidden md:table-cell">
                      {pool.txCount}
                    </td>
                    <td className="py-4 px-6 hidden lg:table-cell">
                      {pool.totalValueLockedUSD}
                    </td>
                    <td className="py-4 px-6">{pool.volumeUSD}</td>
                  </tr>
                </Link>
              ))}
            </tbody>
          </table>
          {type === "All" ? (
            <div className="flex justify-center w-full py-4 text-white bg-custom-black rounded-2xl items-center select-none">
              <AiOutlineArrowLeft
                onClick={() => prevPage()}
                className={
                  pagination.page === 1
                    ? "opacity-40 text-custom-arrow"
                    : "hover:cursor-pointer text-custom-arrow"
                }
              />
              <p className="px-2">
                {pagination.page} of {Math.trunc(pagination.poolCount / 10)}
              </p>
              <AiOutlineArrowRight
                onClick={() => nextPage()}
                className={
                  pagination.page === Math.trunc(pagination.poolCount / 10)
                    ? "opacity-40 text-custom-arrow"
                    : "hover:cursor-pointer text-custom-arrow"
                }
              />
            </div>
          ) : (
            <div className="flex justify-center w-full py-4 text-white bg-custom-black rounded-2xl items-center">
              <AiOutlineArrowLeft
                className={
                  pagination.page === 1
                    ? "opacity-40 text-custom-arrow"
                    : "hover:cursor-pointer text-custom-arrow"
                }
              />
              <p className="px-2">1 of 1</p>
              <AiOutlineArrowRight
                className={
                  pagination.page === Math.trunc(pagination.poolCount / 10)
                    ? "opacity-40 text-custom-arrow"
                    : "hover:cursor-pointer text-custom-arrow"
                }
              />
            </div>
          )}
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

export default PoolTable;
