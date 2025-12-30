/* eslint-disable react/prop-types */
import { RiMenuSearchFill } from "react-icons/ri";

const GlobalSearch = ({ filter, setGlobalFilter }) => {
  return (
    <div className="flex justify-center my-4">
      <div className="flex items-center w-full max-w-sm">
        {/* Icon */}
        <span className="flex items-center justify-center bg-[#615FFF] px-3 h-10 mx-2  text-white rounded-l-md">
          {/* <i className="bi bi-filter-circle">aaa</i> */}
          <RiMenuSearchFill  size={30} />
        </span>

        {/* Input */}
        <input
          type="text"
          value={filter || ""}
          onChange={(e) => setGlobalFilter(e.target.value || undefined)}
          placeholder="Search..."
          className="w-full h-10 px-3 text-sm  text-black border-2 border-gray-400 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#001529]"
        />
      </div>
    </div>
  );
};

export default GlobalSearch;
