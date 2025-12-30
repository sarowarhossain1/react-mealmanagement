// import React from "react";
// import { useTable, usePagination } from "react-table";

// // import PagenitionTable from "./TableHelper/PagenitionTable";
// import LoadingData from "../../common/LoadingData";

// const Table = ({ columns, data, isLoading }) => {
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     page,
//     state,
//     prepareRow,
//     canPreviousPage,
//     canNextPage,
//     previousPage,
//     nextPage,
//     setPageSize,
//     pageOptions,
//   } = useTable(
//     { columns, data, initialState: { pageIndex: 0, pageSize: 10 } },
//     usePagination
//   );

//   const { pageIndex, pageSize } = state;

//   if (isLoading) return <LoadingData />;

//   return (
//     <div className=" shadow-sm">
//       {/* Table */}
//       <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           {headerGroups.map((headerGroup) => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map((column) => (
//                 <th
//                   {...column.getHeaderProps()}
//                   className={`px-6 py-3 text-left text-xl font-medium hover:bg-gray-50 transition text-gray-900 uppercase tracking-wider ${column.classes || ""}`}
//                 >
//                   {column.render("Header")}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>

//         <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200 ">
//           {rows.map((row) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map((cell) => (
//                   <td
//                     {...cell.getCellProps()}
//                     className={`px-6 py-4 whitespace-nowrap text-[19px] text-gray-700 ${cell.column.classes || ""}`}
//                   >
//                     {cell.render("Cell")}
//                   </td>
//                 ))}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>

//       {/* Pagination Controls */}
//       <div className="flex items-center justify-between p-4 bg-gray-50">

//         <div className="text-sm text-gray-700">
//           Page <span className="font-medium">{pageIndex + 1}</span> of{" "}
//           <span className="font-medium">{pageOptions.length}</span>
//         </div>

//         {/* Page size selector */}
//         {/* <div className="flex items-center space-x-2">
//           <label className="text-sm text-gray-700">Rows per page:</label>
//           <select
//             value={pageSize}
//             onChange={(e) => setPageSize(Number(e.target.value))}
//             className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             {[10, 15, 20].map((size) => (
//               <option key={size} value={size}>
//                 {size}
//               </option>
//             ))}
//           </select>
//         </div> */}

//         {/* Next/Prev buttons */}
//         {/* <PagenitionTable
//           nextPage={nextPage}
//           previousPage={previousPage}
//           canPreviousPage={canPreviousPage}
//           canNextPage={canNextPage}
//         /> */}
//       </div>
//     </div>
//   );
// };

// export default Table;

import React, { useMemo, useCallback } from "react";
import { useTable, usePagination } from "react-table";
import LoadingData from "../../common/LoadingData";

const Table = ({ columns, data, isLoading }) => {
  // const getSubRows = useCallback((data) => data?.data?.data || []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    rows,
    state,
    pageOptions,
    canPreviousPage,
    canNextPage,
    previousPage,
    nextPage,
    setPageSize,
    prepareRow,
  } = useTable(
    { columns, data,  initialState: { pageIndex: 0, pageSize: 10 } },
    usePagination
  );

  const { pageIndex, pageSize } = state;

  if (isLoading) return <LoadingData />;

  return (
    <div >
       <div className="max-h-[500px] overflow-y-auto overflow-x-auto">
        <div >
          <table
            {...getTableProps()}
            className="min-w-full border border-gray-50 rounded-lg shadow-lg mt-5 text-center  border-collapse "
          >
            <thead className="bg-[#615FFF] text-white font-bold text-xl h-12 ">
              {headerGroups.map((hg) => {
                const { key, ...rest } = hg.getHeaderGroupProps();
                return (
                  <tr key={key} {...rest}>
                    {hg.headers.map((col) => {
                      const { key: colKey, ...colRest } = col.getHeaderProps();
                      return (
                        <th key={colKey} {...colRest}>
                          {col.render("Header")}
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className="transition-colors duration-200 odd:bg-white even:bg-gray-100 hover:bg-gray-300 "
                  >
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className="px-4 py-3 text-[16px] border border-amber-100"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 bg-gray-50">
        <span className="text-sm text-gray-700">
          Page <strong>{pageIndex + 1}</strong> of <strong>{pageOptions.length}</strong>
        </span>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>

          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="ml-2 border rounded px-2 py-1"
          >
            {[10, 15, 20].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Table;
