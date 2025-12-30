import React, { useMemo, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";
import LoadingData from "../../common/LoadingData";
import ErrorData from "../../common/ErrorData";
import {
  useDeleteMembersMutation,
  useGetMembersQuery,
} from "../../Redux/service/membersService";
import MembersModal from "./MembersModal";
import AlertMessage from "../../Util/AleartMessage";
import TableMember from "../Table/TableMember";

export const DEFAULT_MEMBER_VALUE = {
  name: "",
  mobile: "",
  roomNumber: "",
  status: "",
};

const Members = () => {
  const [modal, setModal] = useState(false);
  const [defaultValues, setDefaultValues] = useState(DEFAULT_MEMBER_VALUE);

  const { data, isLoading, isError } = useGetMembersQuery();
  const [deleteMembers] = useDeleteMembersMutation();
  console.log(deleteMembers);

  const toggle = (value) => {
    setDefaultValues(value);
    setModal(true);
  };

  const ActionColumn = ({ row }) => (
    <div className="flex gap-2">
      <button>
        <FaRegEdit size={20} />
      </button>
      <button
        onClick={() => AlertMessage.Delete(row?.original?._id, deleteMembers)}
      >
        <MdDelete size={20} />
      </button>
    </div>
  );

  const columns = useMemo(
    () => [
      { Header: "SL",
        accessor: "sl",
        Cell: ({ row }) => row.index + 1 
      },
      { Header: "Name",
        accessor: "name",
        Cell: ({ value }) => value || "N/A" },
      {
        Header: "Mobile",
        accessor: "mobile",
        Cell: ({ value }) => value || "N/A",
      },
      {
        Header: "Room Number",
        accessor: "roomNumber",
        Cell: ({ value }) => value || "N/A",
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
      { Header: "Action", accessor: "action", Cell: ActionColumn },
    ],
    [data]
  );

  if (isLoading) return <LoadingData />;
  if (isError) return <ErrorData />;

  return (
    <div className="mt-10">
      <button
        onClick={() => toggle(DEFAULT_MEMBER_VALUE)}
        className="flex items-center px-4 py-2 bg-sky-900 rounded text-white gap-2 mb-4"
      >
        <FaCirclePlus size={20} />
        <span>Add Member</span>
      </button>

      <TableMember columns={columns} data={data?.data?.data || []} />

      <MembersModal
        modal={modal}
        setModal={setModal}
        defaultValues={defaultValues}
        setDefaultValues={setDefaultValues}
        toggle={toggle}
      />
    </div>
  );
};

export default Members;
