import { useState } from "react";
import { Link } from "react-router-dom";


const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        
        {/* Logo */}
        <div className="flex flex-col items-center mb-5">
          <img src="..." className="h-20 mb-2" alt="Logo" />
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-bold text-gray-800">
          Sign Up
        </h2>
        <p className="text-center text-gray-600 text-sm mt-1 mb-6">
          Create your account to continue.
        </p>

        {/* Form */}
        <form className="space-y-4">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Full Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Mobile<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Your Mobile Number"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter Your Email"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Password<span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-600"
              >
                👁
              </button>
            </div>
          </div>

          {/* Sign Up Button */}
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
            Sign Up
          </button>
        </form>

        {/* Already have account */}
        <p className="text-center text-sm text-gray-600 mt-5">
          Already have an Account?{" "}
          <Link  to="/login" className="text-blue-600 font-semibold">
           Login
          </Link>
        </p>

        {/* Footer */}
        <p className="text-center text-gray-400 text-xs mt-6">
          2018 - 2025 © Hisab Nikash - Shunnoit.com
        </p>
      </div>
    </div>
  );
};

export default Registration;
