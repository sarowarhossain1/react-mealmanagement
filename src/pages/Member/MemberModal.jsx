import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { Controller, Form, useForm } from "react-hook-form";
import * as yup from "yup";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useCreateMemberMutation,
  useUpdateMemberMutation,
} from "../../Redux/service/memberService";
import { DEFAULT_MEMBER_VALUE } from "./Member";

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

const MemberModal = ({
  modal,
  setModal,
  defaultValues,
  setDefaultValues,
  setUpdateMemberData,
  updateMemberData,
}) => {
  // if (!modal) return null;

  const [createMember, { isSuccess: isCreateSuccess, isLoading }] =
    useCreateMemberMutation();
  const [updateMember, { isSuccess: updateSuccess }] =
    useUpdateMemberMutation();

  const methods = useForm({
    mode: "all",
    resolver: yupResolver(schemaResolver),
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (isCreateSuccess || updateSuccess) {
      setModal(false);
      setDefaultValues(DEFAULT_MEMBER_VALUE);
      setUpdateMemberData(false);
    }
  }, [isCreateSuccess, updateSuccess]);

  const onSubmit = (formData) => {
    if (!updateMemberData) {
      createMember(formData);
      toast.success("Member created");
    } else {
      updateMember({
        id: defaultValues?._id,
        ...formData,
      });
      toast.success("Member updated");
    }
  };

  // Reset form when modal opens or defaultValues change
  useEffect(() => {
    if (modal) {
      reset(defaultValues || DEFAULT_MEMBER_VALUE);
    }
  }, [modal, defaultValues, reset]);

  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 "
          onClick={() => setModal(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="bg-[#FFFFFF]  W-[800PX] p-6 rounded-xl shadow-2xs -mt-80 "
          >
            <div className="flex justify-between">
              <h2 className="text-xl font-bold mb-4 text-[#536ED6]">
                {defaultValues?._id ? "Edit Member" : "+ Member"}
              </h2>
              <button
                onClick={() => setModal(false)}
                className="px-4 py-2 text-[#536ED6] rounded-lg mb-4"
              >
                <IoClose size={24} />
              </button>
            </div>
            <div className="">
              <form onSubmit={handleSubmit(onSubmit)} className="">
                <div className="grid grid-cols-1 md:grid-cols-3  gap-3">
                  <div>
                    <label className="block text-xl font-semibold mb-1 text-[#536ED6]">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <div>
                      <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="Enter Your Name"
                            className={`
        w-[380px] h-10 p-3 border-2 rounded outline-none 
        placeholder-[#536ED6]
        ${errors.name ? "border-red-500" : "border-[#536ED6]"}
      `}
                            autoComplete="off"
                          />
                        )}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xl font-semibold mb-1 text-[#536ED6]">
                      Mobile <span className="text-red-500">*</span>
                    </label>
                    <div>
                      <Controller
                        name="mobile"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            placeholder="Enter Your Mobile"
                            className={`
        w-[380px] h-10 p-3 border-2 rounded outline-none 
        placeholder-[#536ED6]
        ${errors.mobile ? "border-red-500" : "border-[#536ED6]"}
      `}
                            autoComplete="off"
                          />
                        )}
                      />
                      {errors.mobile && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.mobile.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xl font-semibold mb-1 text-[#536ED6]">
                      Room Number <span className="text-red-500">*</span>
                    </label>
                    <div>
                      <Controller
                        name="roomNumber"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            placeholder="Enter Your Room Number"
                            className={`
        w-[380px] h-10 p-3 border-2 rounded outline-none 
        placeholder-[#536ED6]
        ${errors.roomNumber ? "border-red-500" : "border-[#536ED6]"}
      `}
                            autoComplete="off"
                          />
                        )}
                      />

                      {errors.roomNumber && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.roomNumber.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <label className="block text-xl font-semibold mb-1 text-[#536ED6]">
                      Status <span className="text-red-500">*</span>
                    </label>

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
                            <option value="ACTIVE">Active</option>
                            <option value="INACTIVE">Inactive</option>
                          </select>

                          {errors.status && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.status.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-1 text-[19px] rounded-lg border-2 border-[#615FFF]
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
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MemberModal;
