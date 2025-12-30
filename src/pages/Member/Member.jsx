import React, { useMemo, useState } from "react";
import LoadingData from "../../common/LoadingData";
import ErrorData from "../../common/ErrorData";
import {
  useDeleteMemberMutation,
  useGetMemberQuery,
} from "../../Redux/service/memberService";
import AlertMessage from "../../Util/AleartMessage";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import MemberModal from "./MemberModal";
import CustomTable from "../Table/CustomTable";
import { FaCirclePlus } from "react-icons/fa6";

export const DEFAULT_MEMBER_VALUE = {
  name: "",
  mobile: "",
  roomNumber: "",
  status: "",
};

const Member = () => {
  const [modal, setModal] = useState(false);
  const [defaultValues, setDefaultValues] = useState(DEFAULT_MEMBER_VALUE);
  const [updateMemberData, setUpdateMemberData] = useState(null);

  const { data, isError, isLoading } = useGetMemberQuery();
  const [deleteMember] = useDeleteMemberMutation();

  const toggle = (values) => {
    setDefaultValues(values);
    setModal(true);
  };

  const ActionColumn = ({ row }) => {
    const edit = () => {
      setDefaultValues(row.original);
      setUpdateMemberData(row.original);
      setModal(true);
    };

    return (
      <>
        <button
          type="button"
          onClick={edit}
          className="text-blue-500 hover:text-blue-700 mx-1 p-1 rounded"
          title="Edit"
        >
          <FaRegEdit size={20} />
        </button>

        <button
          type="button"
          className="text-yellow-500 hover:text-yellow-700 mx-1 p-1 rounded"
          title="Delete"
          onClick={() => AlertMessage.Delete(row?.original?._id, deleteMember)}
        >
          <MdDelete size={20} />
        </button>
      </>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "SL",
        accessor: "sl",
        Cell: ({ row }) => row?.index + 1 || "",
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ value }) => value || "n/a",
      },
      {
        Header: "Mobile",
        accessor: "mobile",
        Cell: ({ value }) => <span>{value || "n/a"}</span>,
      },
      {
        Header: "RoomNumber",
        accessor: "roomNumber",
        Cell: ({ value }) => value || "n/a",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold uppercase ${
              value === "ACTIVE"
                ? "bg-green-100 text-green-700"
                : value === "INACTIVE"
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {value || "N/A"}
          </span>
        ),
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ActionColumn,
      },
    ],
    []
  );

  if (isLoading) return <LoadingData />;
  if (isError) return <ErrorData />;

  return (
    <div className="mt-6">
      <button  onClick={() => toggle(DEFAULT_MEMBER_VALUE)} className="flex items-center px-4 py-2 bg-white rounded-2xl text-black gap-2 font-semibold transition transform hover:scale-105 shadow-2xl">
        <FaCirclePlus size={20} className="text-[#615FFF] shadow-md " />
        <span>Ad Member</span>
      </button>

      <div className="shadow-2xl rounded-lg p-6 mt-5 bg-[#FFFFFF]">
        <CustomTable
          columns={columns}
          data={data?.data?.data ?? []}
          isLoading={isLoading}
        />
      </div>

      <MemberModal
        modal={modal}
        setModal={setModal}
        defaultValues={defaultValues}
        setDefaultValues={setDefaultValues}
        updateMemberData={updateMemberData}
        setUpdateMemberData={setUpdateMemberData}
      />
    </div>
  );
};

export default Member;
