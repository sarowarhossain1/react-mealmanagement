import { useState } from "react";
import {
  FaCog,
  FaShieldAlt,
  FaUserShield,
  FaBell,
} from "react-icons/fa";

const Setting=()=> {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex gap-10">

      {/* SIDEBAR */}
      <div className="w-64 bg-white shadow-md rounded-xl p-6">
        <div className="flex flex-col items-center mb-6">
          <FaCog className="text-4xl text-gray-700 mb-3" />
          <h2 className="text-xl font-semibold text-gray-800">Settings</h2>
        </div>

        <ul className="space-y-4">
          <li
            className={`flex items-center gap-2 cursor-pointer p-2 rounded 
              ${activeTab === "general" ? "text-blue-600 font-semibold" : "text-gray-700"}`}
            onClick={() => setActiveTab("general")}
          >
            <FaShieldAlt /> General
          </li>

          <li
            className={`flex items-center gap-2 cursor-pointer p-2 rounded 
              ${activeTab === "security" ? "text-blue-600 font-semibold" : "text-gray-700"}`}
            onClick={() => setActiveTab("security")}
          >
            <FaUserShield /> Security
          </li>

          <li
            className={`flex items-center gap-2 cursor-pointer p-2 rounded 
              ${activeTab === "privacy" ? "text-blue-600 font-semibold" : "text-gray-700"}`}
            onClick={() => setActiveTab("privacy")}
          >
            <FaShieldAlt /> Privacy
          </li>

          <li
            className={`flex items-center gap-2 cursor-pointer p-2 rounded 
              ${activeTab === "notifications" ? "text-blue-600 font-semibold" : "text-gray-700"}`}
            onClick={() => setActiveTab("notifications")}
          >
            <FaBell /> Notifications
          </li>
        </ul>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 space-y-8">

        {/* GENERAL SETTINGS */}
        {activeTab === "general" && (
          <div className="bg-white p-6 shadow-md rounded-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">General Settings</h3>

            <label className="font-medium text-gray-700">Username:</label>
            <input className="w-full border-2 rounded-lg p-2 mb-4 border-blue-500" />

            <label className="font-medium text-gray-700">Email:</label>
            <input className="w-full border-2 rounded-lg p-2 mb-4 border-blue-500" />

            <label className="font-medium text-gray-700">Language:</label>
            <select className="w-full border-2 border-blue-500 rounded-lg p-2 mb-4">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>

            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        )}

        {/* SECURITY SETTINGS */}
        {activeTab === "security" && (
          <div className="bg-white p-6 shadow-md rounded-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Security Settings</h3>

            <label className="font-medium text-gray-700">Current Password:</label>
            <input type="password" className="w-full border-2 border-blue-500 rounded-lg p-2 mb-4" />

            <label className="font-medium text-gray-700">New Password:</label>
            <input type="password" className="w-full border-2 border-blue-500 rounded-lg p-2 mb-4" />

            <label className="font-medium text-gray-700">Confirm Password:</label>
            <input type="password" className="w-full border-2 border-blue-500 rounded-lg p-2 mb-4" />

            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Change Password
            </button>
          </div>
        )}

        {/* PRIVACY SETTINGS */}
        {activeTab === "privacy" && (
          <div className="bg-white p-6 shadow-md rounded-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Privacy Settings</h3>

            <label className="font-medium text-gray-700">Profile Visibility:</label>
            <select className="w-full border-2 border-blue-500 rounded-lg p-2 mb-4">
              <option>Public</option>
              <option>Friends Only</option>
              <option>Private</option>
            </select>

            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        )}

        {/* NOTIFICATION SETTINGS */}
        {activeTab === "notifications" && (
          <div className="bg-white p-6 shadow-md rounded-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Notifications</h3>

            <div className="space-y-3">
              <label>
                <input type="checkbox" className="mr-2" /> Email Notifications
              </label>

              <label>
                <input type="checkbox" className="mr-2" /> SMS Notifications
              </label>

              <label>
                <input type="checkbox" className="mr-2" /> App Alerts
              </label>
            </div>

            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Save Settings
            </button>
          </div>
        )}

      </div>
    </div>
  );
}


export default Setting