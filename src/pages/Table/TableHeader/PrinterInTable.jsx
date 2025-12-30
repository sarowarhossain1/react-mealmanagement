import React from "react";
import { IoPrint } from "react-icons/io5";

const PrinterInTable = ({ generatePdf }) => {
  return (
    <button
      type="button"
      onClick={generatePdf}
      className="px-4 py-2 text-[#008236] bg-[#F5F5F5] rounded shadow-md flex items-center gap-2"
    >
      <IoPrint size={20} /> Print
    </button>
  );
};

export default PrinterInTable;
