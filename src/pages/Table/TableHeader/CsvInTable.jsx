/* eslint-disable react/prop-types */
import { FaFileCsv } from "react-icons/fa6";
import { CSVLink } from "react-csv";

const CsvInTable = ({ csvData }) => {
  return (

      <div className="shadow-lg inline-block">
      <CSVLink
        className="flex items-center px-4 py-2  text-red-500 bg-amber-400 rounded  transition"
        filename="table.csv"
        data={csvData}
      >
       <FaFileCsv size={20}/>
      </CSVLink>
    </div>
  );
};

export default CsvInTable;
