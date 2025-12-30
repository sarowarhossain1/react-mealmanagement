import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { useMembersCreateMutation } from "../../Redux/service/membersService";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DEFAULT_MEMBER_VALUE } from "../Member/Member";

const schemaResolver = yup
  .object()
  .shape({
    name: yup.string().required("Please Enter Your Name"),
    mobile: yup.string().required("Please Enter Your Mobile Number"),
    // .matches(/^[0-9]{11}$/, "Mobile number must be exactly 11 digits"),
    roomNumber: yup
      .string()
      .typeError("Room number")
      .required("Enter Your Room Number"),
    status: yup
      .string()
      .required("Please Select Status")
      .oneOf(["ACTIVE", "INACTIVE"], "Invalid status"),
  })
  .required();

const MembersModal = ({
  modal,
  setModal,
  defaultValues,
  setDefaultValues,
  toggleModal,
}) => {
  // if (!modal) return null;
  const [createMembers, { isLoading, isSuccess: isCreateSuccess }] =
    useMembersCreateMutation();
  const methods = useForm({
    mode: "all",
    resolver: yupResolver(schemaResolver),
    defaultValues:DEFAULT_MEMBER_VALUE
  });

  useEffect(() => {
    if (isCreateSuccess) {
       setModal(false);
    }
  }, [isCreateSuccess]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  

  const onSubmit = (formData) => {
   createMembers(formData);
  };

  useEffect(() => {
    if (modal) {
      reset(defaultValues ?? DEFAULT_MEMBER_VALUE);
    }
  }, [modal, defaultValues, reset]);

if (!modal) return null;


  return (
<div>
  {
    modal && (
       <div
      onClick={() => setModal(false)}
      className="fixed inset-0 z-50 flex items-center justify-center "
    >
      <div 
       onClick={(e) => e.stopPropagation()}
      className="bg-white rounded-lg  p-6 relative w-[1200px]">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold mb-4">
            {defaultValues?._id ? "Edit Members" : "Add Members"}
          </h2>
          <div onClick={() => setModal(false)}>
            <IoClose size={24} />
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label htmlFor="">Name</label>
                <div>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          placeholder="Enter Your Name"
                          className={`${
                            errors.name ? "border-red-700" : "border-[#536ED6]"
                          } w-[380px] h-10 border-2 border-[#536ED6] p-2 placeholder-[#536ED6]`}
                          autoComplete="off"
                        />
                      </>
                    )}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">
                      {errors.name.message}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <label>Mobile</label>
                <div>
                  <Controller
                    name="mobile"
                    control={control}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          type="number"
                          placeholder="Enter your Number"
                          className={`${
                            errors.mobile
                              ? "border-red-700"
                              : "border-[#536ED6]"
                          }  w-[380px] h-10 border-2 border-[#536ED6] p-2 placeholder-[#536ED6]`}
                          autoComplete="off"
                        />
                      </>
                    )}
                  />
                  {errors.mobile && (
                    <span className="text-red-500 text-sm">
                      {errors.mobile.message}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <label>Room Number</label>
                <div>
                  <Controller
                    name="roomNumber"
                    control={control}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          type="number"
                          placeholder="Enter your Number"
                          className={`${
                            errors.number
                              ? "border-red-700"
                              : "border-[#536ED6]"
                          }  w-[380px] h-10 border-2 border-[#536ED6] p-2 placeholder-[#536ED6]`}
                          autoComplete="off"
                        />
                      </>
                    )}
                  />
                  {errors.roomNumber && (
                    <span className="text-red-500 text-sm">
                      {errors.roomNumber.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <div>
                  <label htmlFor="">Status</label>
                  <div>
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <>
                          <select
                            {...field}
                            className={`w-[380px] h-10 p-2 border-2 border-[#536ED6] rounded text-[#536ED6] outline-none ${
                              errors.status ? "border-red-500" : ""
                            }`}
                          >
                            <option value="">Select Status</option>
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                          </select>
                        </>
                      )}
                    />
                    {errors.status && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.status.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 text-[19px] rounded-lg border-2 border-[#615FFF]
  bg-white text-[#615FFF] hover:bg-[#615FFF] hover:text-white
  shadow-lg flex items-center justify-center gap-2
  disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading && (
                    <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  )}
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    )
  }
</div>
  );
};

export default MembersModal;
