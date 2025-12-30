import React, { useMemo, useRef } from "react";
import { useGlobalFilter, useTable } from "react-table";
import { useReactToPrint } from "react-to-print";
import CheckBoxInTable from "./TableHeader/CheckBox";
import GlobalSearch from "./TableHeader/GlobalSearch";
import CsvInTable from "./TableHeader/CsvInTable";
import PrinterInTable from "./TableHeader/PrinterInTable";

const CustomTable = ({ columns = [], data = [] }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    getToggleHideAllColumnsProps,
    state,
    setGlobalFilter,
  } = useTable(
    { columns, data, getSubRows: () => [] },
    useGlobalFilter
  );

  const { globalFilter } = state;

  // Safe CSV data with headers
  const csvData = useMemo(() => {
    if (!data || !columns) return [];

    const headers = columns.map((col) => col.Header);
    const values = data.map((row) =>
      columns.map((col) => {
        if (!row) return "";
        let cellValue = "";
        if (col.accessor) {
          if (typeof col.accessor === "function") {
            try {
              cellValue = col.accessor(row) ?? "";
            } catch {
              cellValue = "";
            }
          } else if (typeof col.accessor === "string") {
            cellValue = row[col.accessor] ?? "";
          }
        }
        return cellValue;
      })
    );
    return [headers, ...values];
  }, [columns, data]);

  const tableRef = useRef();
  const generatePdf = useReactToPrint({
    content: () => tableRef.current,
    documentTitle: "table",
  });

  return (
    <div className="overflow-x-auto">
      <div className="mb-16">
        <CheckBoxInTable
          allColumns={allColumns}
          getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}
        />
      </div>

      <div>
        <GlobalSearch setGlobalFilter={setGlobalFilter} filter={globalFilter} />
      </div>

      <div className="my-3 flex justify-end gap-3">
        <CsvInTable csvData={csvData} />
        <PrinterInTable generatePdf={generatePdf} />
      </div>

      <div className="max-h-[500px] overflow-y-auto overflow-x-auto">
        <div ref={tableRef}>
          <table
            {...getTableProps()}
            className="min-w-full border border-gray-50 rounded-lg shadow-lg mt-5 text-center border-collapse"
          >
            <thead className="bg-[#615FFF] text-white font-bold text-xl h-12">
              {headerGroups.map((hg, i) => (
                <tr key={i} {...hg.getHeaderGroupProps()}>
                  {hg.headers.map((col, j) => (
                    <th key={j} {...col.getHeaderProps()}>
                      {col.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                if (!row) return null;
                prepareRow(row);
                return (
                  <tr
                    key={i}
                    {...row.getRowProps()}
                    className="transition-colors duration-200 odd:bg-white even:bg-gray-100 hover:bg-gray-300"
                  >
                    {row.cells.map((cell, j) => (
                      <td
                        key={j}
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
    </div>
  );
};

export default CustomTable;
