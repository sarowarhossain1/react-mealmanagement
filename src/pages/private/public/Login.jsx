import React, { useEffect } from "react";
import { useState } from "react";
import LOGO from "../../../assets/login.png";
import { Link,  useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useLoginMutation } from "../../../Redux/service/authService";
export const DEFAULT_VALUE = {};

const schemaResolver = yup
  .object()
  .shape({
    mobile: yup.string().required("mobileis is required"),
    password: yup.string().required("password is required"),
  })
  .required();

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, { data, isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const methods = useForm({
    mode: "all",
    defaultValues: DEFAULT_VALUE,
    resolver: yupResolver(schemaResolver)
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = (formData) => {
    login(formData);
  };

  useEffect(() => {
    if (data?.data?.token) {
      localStorage.setItem("token", data?.data?.token);
      navigate("/");
    }
  }, [data]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md">
        {/* <h2 className="text-2xl font-bold text-center mb-6">Login</h2> */}
        <div className="flex  justify-center items-center mb-2">
          {" "}
          <img src={LOGO} className="w-40" alt="" />
        </div>

        {/* Email */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-xl font-semibold mb-1 text-[#536ED6]">
              Email<span className="text-red-500">*</span>
            </label>
            <Controller
              name="mobile"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`form-control w-[380px] h-10 p-3 border-2 border-[#536ED6] rounded placeholder-text-[#536ED6] ${
                    errors.mobile ? "is-invalid" : ""
                  }`}
                  placeholder="mobile"
                  autoComplete="off"
                />
              )}
            />
            {errors.mobile && (
              <div className="invalid-feedback">{errors.mobile.message}</div>
            )}
          </div>

          {/* Password */}
          {/* <div>
            <label className="block text-xl font-semibold mb-1 text-[#536ED6]">
              Password<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              {" "}
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="password"
                    className={`form-control w-[380px] h-10 p-3 border-2 border-[#536ED6] rounded placeholder-text-[#536ED6] ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    placeholder="password"
                    autoComplete="off"
                  />
                )}
              />
               <button
                type="submit"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-600 mb-3"
              >
                {" "}
                👁
              </button>
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
             
            </div>
          </div> */}
          <div className="">
  <label className="block text-xl font-semibold mb-1 text-[#536ED6]">
    Password <span className="text-red-500">*</span>
  </label>

  <div className="relative">
    <Controller
      name="password"
      control={control}
      render={({ field }) => (
        <input
          {...field}
          type={showPassword ? "text" : "password"}
          className={`form-control w-[380px] h-10 p-3 border-2 border-[#536ED6] rounded placeholder-text-[#536ED6] ${
            errors.password ? "is-invalid" : ""
          }`}
          placeholder="password"
          autoComplete="off"
        />
      )}
    />

    {/* 👁 Show / Hide Button */}
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-2.5 text-gray-600"
    >
      {showPassword ? "🙈" : "👁"}
    </button>

    {errors.password && (
      <div className="invalid-feedback">{errors.password.message}</div>
    )}
  </div>
</div>

          
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-4 flex items-center justify-center gap-2">
            Login
            {isLoading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
          </button>
        </form>
        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600 mt-5">
          Don't have an Account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold">
            Sign Up
          </Link>
        </p>

        {/* Footer */}
        <p className="text-center text-gray-500 text-[15px] font-semibold mt-6">
          2018 - 2025 © Meal-Management - Shunnoit.com
        </p>
      </div>
    </div>
  );
};

export default Login;









//  <>
//         {/* Edit Button */}
//         <button
//           type="button"
//           // onClick={edit}
//           className="text-blue-500 hover:text-blue-700 mx-1 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//           title="Edit"
//         >
//           <CiEdit size={20} />
//         </button>

//         {/* Delete Button */}
//         <button
//           type="button"
//           // onClick={() => {
//           //   AleartMessage.Delete({ id: row?.original?._id }, deleteBorder);
//           // }}
//           className="text-yellow-500 hover:text-yellow-700 mx-1 p-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
//           title="Delete"
//         >
//           <MdDelete size={20} />
//         </button>
//       </>