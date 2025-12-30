/* eslint-disable react/prop-types */
import { Checkbox } from "antd";

const CheckBoxInTable = ({ allColumns, getToggleHideAllColumnsProps }) => {
  return (
    <div className="flex flex-wrap items-start gap-4 mx-3 mt-2 px-2">
      {/* Toggle All */}
      <div className="flex items-center gap-2">
        <Checkbox {...getToggleHideAllColumnsProps()} />
        <span className="text-lg font-semibold text-indigo-600">
          ✔ All Columns
        </span>
      </div>

      {/* Individual Columns */}
      {allColumns.map((column) => (
        <div
          key={column.id}
          className="flex items-center gap-2 px-3 py-1 rounded-md border border-gray-200 bg-white shadow-sm"
        >
          <Checkbox {...column.getToggleHiddenProps()} />
          <label className="text-sm font-semibold text-gray-700 cursor-pointer">
            {column.Header}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckBoxInTable;
