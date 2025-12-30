import React, { useState } from "react";
import { motion } from "framer-motion";
import './dashboard.css'
import '../../../src/index.css'
import { Home, BarChart2, Grid, Users } from "lucide-react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {  useDashboardDataQuery } from "../../Redux/service/dashboardService";
import LoadingData from "../../common/LoadingData";
import ErrorData from "../../common/ErrorData";
import formatNumber from "../../helper/array-object/Number-Formater";
import Summary from "./Summary";

const sampleChartData = [
  { name: "Jan", users: 4000, sales: 2400 },
  { name: "Feb", users: 3000, sales: 1398 },
  { name: "Mar", users: 2000, sales: 9800 },
  { name: "Apr", users: 2780, sales: 3908 },
  { name: "May", users: 1890, sales: 4800 },
  { name: "Jun", users: 2390, sales: 3800 },
  { name: "Jul", users: 3490, sales: 4300 },
];

const StatCard = ({ title, value, icon }) => (
  <div className="dark:bg-slate-800/60 backdrop-blur p-4 shadow-md dark:shadow-lg border border-gray-100/50 dark:border-slate-700 rounded-xl">
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-lg bg-gray-50 dark:bg-slate-700/40">{icon}</div>
      <div>
        <div className="text-xs text-gray-500 dark:text-slate-300">{title}</div>
        <div className="text-2xl font-semibold">{value}</div>
      </div>
    </div>
  </div>
);

const Dashboard = () => {

  const {data:dashboardData, isLoading, isError}= useDashboardDataQuery()

  if(isLoading){
   return <LoadingData/>
  }else if(isError){
    return  <ErrorData/>
  }else{
  return (
    <div className="p-6">
      <motion.section
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="h-[300px] overflow-y-auto scrollbar-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-violet-900 rounded shadow-2xl transform transition duration-300 hover:scale-95 cursor-pointer py-2 hover:bg-cyan-900">
            <div className="flex justify-center items-center mt-5  gap-3">
               <h4 className="text-white"><Users size={20}/></h4>
               <p className="text-white text-[18px] font-semibold">Total Member</p> 
            </div>
             <h1 className="text-center text-xl text-[#ffff]">
              {Number(dashboardData?.totalActiveMember) +
                Number(dashboardData?.totalInActiveMember)}
            </h1>
          </div>
          <div className="bg-[#FF6D00] rounded shadow-2xl transform transition duration-300 hover:scale-95 cursor-pointer hover:bg-violet-900">
            <div className="flex justify-center items-center mt-5  gap-3">
               <h4 className="text-white"><BarChart2 size={20}/></h4>
               <p className="text-white text-[18px] font-semibold">Total Active Member</p> 
            </div>
             <h1 className="text-center text-xl text-[#ffff]">
              {formatNumber(dashboardData?.totalActiveMember)}
            </h1>
          </div>
           <div className="bg-[#2E7D32] rounded shadow-2xl transform transition duration-300 hover:scale-95 cursor-pointer hover:bg-rose-800">
            <div className="flex justify-center items-center mt-5  gap-3">
               <h4 className="text-white"><Grid size={20}/></h4>
               <p className="text-white text-[18px] font-semibold">Total InActive Member</p> 
            </div>
             <h1 className="text-center text-xl text-[#ffff]">
              {formatNumber(dashboardData?.totalInActiveMember)}
            </h1>
          </div>
          <div className="bg-[#2E7D77] rounded shadow-2xl transform transition duration-300 hover:scale-95 cursor-pointer hover:bg-red-900">
            <div className="flex justify-center items-center mt-5  gap-3">
               <h4 className="text-white"><BsFillBellFill size={20}/></h4>
               <p className="text-white text-[18px] font-semibold">Positive Member</p> 
            </div>
             <h1 className="text-center text-xl text-[#ffff]">
              {formatNumber(dashboardData?.totalPositiveMember)}
            </h1>
          </div>
           <div className="bg-[#2E7899] rounded shadow-2xl transform transition duration-300 hover:scale-95 cursor-pointer hover:bg-purple-800">
            <div className="flex justify-center items-center mt-5  gap-3">
               <h4 className="text-white"><BsFillBellFill size={20}/></h4>
               <p className="text-white text-[18px] font-semibold">Negative Member</p> 
            </div>
             <h1 className="text-center text-xl text-[#ffff]">
              {formatNumber(dashboardData?.totalNegativeMember)}
            </h1>
          </div>
          <div className="bg-[#2E7899] rounded shadow-2xl transform transition duration-300 hover:scale-95 cursor-pointer hover:bg-pink-900">
            <div className="flex justify-center items-center mt-5  gap-3">
               <h4 className="text-white"><BsFillBellFill size={20}/></h4>
               <p className="text-white text-[18px] font-semibold">Total Deposit</p> 
            </div>
             <h1 className="text-center text-xl text-[#ffff]">
              {formatNumber(dashboardData?.totalDeposit)}
            </h1>
          </div>
           <div className="bg-[#C300D5] rounded shadow-2xl transform transition duration-300 hover:scale-95 cursor-pointer hover:bg-orange-800">
            <div className="flex justify-center items-center mt-5  gap-3">
               <h4 className="text-white"><BsFillBellFill size={20}/></h4>
               <p className="text-white text-[18px] font-semibold">Total Cost</p> 
            </div>
             <h1 className="text-center text-xl text-[#ffff]">
              {formatNumber(dashboardData?.totalCost)}
            </h1>
          </div>
          <div className="bg-[#00D540] rounded shadow-2xl transform transition duration-300 hover:scale-95 cursor-pointer py-2 hover:bg-lime-800">
            <div className="flex justify-center items-center mt-5  gap-3">
               <h4 className="text-white"><BsFillBellFill size={20}/></h4>
               <p className="text-white text-[18px] font-semibold">Cash In Hand</p> 
            </div>
             <h1 className="text-center text-xl text-[#ffff]">
              {formatNumber(dashboardData?.totalCashInHand)}
            </h1>
          </div>
          <div className="bg-lime-900 rounded shadow-2xl transform transition duration-300 hover:scale-95 cursor-pointer py-2 hover:bg-fuchsia-800">
            <div className="flex justify-center items-center mt-5  gap-3">
               <h4 className="text-white"><BsFillBellFill size={20}/></h4>
               <p className="text-white text-[18px] font-semibold">Total Meal</p> 
            </div>
             <h1 className="text-center text-xl text-[#ffff]">
              {formatNumber(dashboardData?.totalMeal)}
            </h1>
          </div>
          <div className="bg-fuchsia-800 rounded shadow-2xl transform transition duration-300 hover:scale-95 cursor-pointer py-2 hover:bg-amber-500">
            <div className="flex justify-center items-center mt-5  gap-3">
               <h4 className="text-white"><BsFillBellFill size={20}/></h4>
               <p className="text-white text-[18px] font-semibold">Meal Rate</p> 
            </div>
             <h1 className="text-center text-xl text-[#ffff]">
              {formatNumber(dashboardData?.mealRate)}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2  dark:bg-slate-800 rounded-2xl p-4 shadow-md dark:shadow-lg border border-gray-100/50 dark:border-slate-700 bg-purple-200 text-white hover:bg-purple-600">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[16px] text-[#615FFF] font-semibold">Overview</div>
                <div className="text-lg font-semibold text-[#615FFF]">Users & Sales</div>
              </div>
              <div className="text-sm text-[#615FFF]">Last 6 months</div>
            </div>

            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <AreaChart
                  data={sampleChartData}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopOpacity={0.4} />
                      <stop offset="95%" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="#6366F1"
                    fillOpacity={1}
                    fill="url(#colorUsers)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-purple-400 dark:bg-slate-800 rounded-2xl p-4 shadow-md dark:shadow-lg border border-gray-100/50 dark:border-slate-700 hover:bg-white">
            <div className="text-[16px] text-[#615FFF] font-semibold">Quick Actions</div>
            <div className="mt-4 flex flex-col gap-3">
              <button className="w-full text-left px-3 py-2 rounded-md bg-indigo-50 text-indigo-600">
                Create report
              </button>
              <button className="w-full text-left px-3 py-2 rounded-md bg-[#615FFF] dark:bg-indigo-700/40 text-white">
                Export data
              </button>
              <button className="w-full text-left px-3 py-2 rounded-md bg-[#615FFF] dark:bg-indigo-800 text-white">
                Manage team
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-md dark:shadow-lg border border-gray-100/50 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-gray-500">Recent users</div>
              <div className="text-lg font-semibold">Latest signups</div>
            </div>
            <div className="text-sm text-gray-500">Showing 10 entries</div>
           
          </div>
                  <div className="text-sm text-gray-500 text-center">Meal Management Summary</div>
          {/* <div className="overflow-x-auto">
            <table className="w-full text-sm table-auto">
              <thead>
                <tr className="text-left text-xs text-gray-500 uppercase">
                  <th className="py-2">Name</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Role</th>
                  <th className="py-2">Joined</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Ayesha Khan", email: "ayesha@example.com", role: "Admin", joined: "2025-10-02", status: "Active" },
                  { name: "Rafi Ahmed", email: "rafi@example.com", role: "Editor", joined: "2025-09-21", status: "Pending" },
                  { name: "Mina Roy", email: "mina@example.com", role: "Viewer", joined: "2025-08-12", status: "Active" },
                ].map((u) => (
                  <tr key={u.email} className="border-t dark:border-slate-700">
                    <td className="py-3">{u.name}</td>
                    <td className="py-3">{u.email}</td>
                    <td className="py-3">{u.role}</td>
                    <td className="py-3">{u.joined}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          u.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
          <div>
            <Summary/>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
};

export default Dashboard;