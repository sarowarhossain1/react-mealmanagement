import { useMemo } from "react";
import { useGetSummarryQuery } from "../../Redux/service/SummaryService";
import { useGetMemberQuery } from "../../Redux/service/memberService";
import CustomTable from "../Table/CustomTable";
import dayjs from "dayjs";
import LoadingData from "../../common/LoadingData";
import ErrorData from "../../common/ErrorData";


const MemberSummary = () => {
  const { data: summaryData, isLoading,isError } = useGetSummarryQuery();
  const data1 = summaryData?.data || [];
  const data = data1?.data || [];

  const { data: memberData } = useGetMemberQuery();

  const columns = useMemo(
    () => [
      {
        Header: "S.L",
        accessor: "sl",
        Cell: ({ row }) => row.index + 1,
        classes: "table-user",
      },
      {
        Header: "Meal Quantity",
        accessor: "mealQuantity",
        Cell: ({ value }) => value || "n/a",
        classes: "table-user",
      },
      {
        Header: "Meal Rate",
        accessor: "mealRate",
        Cell: ({ value }) => (value !== undefined ? value.toFixed(2) : "n/a"),
        classes: "table-user",
      },
      {
        Header: "Summary Amount",
        accessor: "summaryAmount",
        Cell: ({ value }) => (value !== undefined ? value.toFixed(1) : "n/a"),
        classes: "table-user",
      },
      {
        Header: "Total Cost",
        accessor: "totalCost",
        Cell: ({ value }) => (value !== undefined ? value.toFixed(2) : "n/a"),
        classes: "table-user",
      },
      {
        Header: "Created At",
        accessor: "createdAt",
        Cell: ({ value }) => (value ? dayjs(value).format("DD-MM-YYYY") : "n/a"),
        classes: "table-user",
      },
    ],
    [memberData] 
  );

 if(isLoading){
  return <LoadingData/>
 }else if(isError){
  return <ErrorData/>
 }else{
return(
 
    <div className="">
      <div>
        <div>
          <div className="text-center mb-3">
            <h2 className="text-xl font-semibold text-[#615FFF] font-serif">Meal Management Summary</h2>
          </div>
          
          {isLoading ? (
            <div className="d-flex justify-content-center">
              {/* <Spinner animation="border" /> */}
            </div>
          ) : (
            <CustomTable columns={columns} data={data} />
          )}
        </div>
      </div>
    </div>
  );
}
};

export default MemberSummary;
