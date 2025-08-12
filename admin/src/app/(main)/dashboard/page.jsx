"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  FiDollarSign,
  FiShoppingCart,
  FiUsers,
  FiCreditCard,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";

const salesData = [
  { name: "Jan", revenue: 4000, profit: 2400 },
  { name: "Feb", revenue: 3000, profit: 1398 },
  { name: "Mar", revenue: 5000, profit: 7800 },
  { name: "Apr", revenue: 4780, profit: 3908 },
  { name: "May", revenue: 5890, profit: 4800 },
  { name: "Jun", revenue: 4390, profit: 3800 },
  { name: "Jul", revenue: 5490, profit: 4300 },
];

const trafficData = [
  { name: "Direct", value: 400, color: "#6366f1" }, // Indigo
  { name: "Organic", value: 300, color: "#34d399" }, // Emerald
  { name: "Referral", value: 300, color: "#f59e0b" }, // Amber
  { name: "Social", value: 200, color: "#ec4899" }, // Pink
];

const recentOrders = [
  {
    id: "#1234",
    user: "John Doe",
    amount: "$150.00",
    status: "Paid",
    image: "https://i.pravatar.cc/40?u=a042581f4e29026704d",
  },
  {
    id: "#1235",
    user: "Jane Smith",
    amount: "$250.50",
    status: "Paid",
    image: "https://i.pravatar.cc/40?u=a042581f4e29026705d",
  },
  {
    id: "#1236",
    user: "Sam Wilson",
    amount: "$80.25",
    status: "Pending",
    image: "https://i.pravatar.cc/40?u=a042581f4e29026706d",
  },
  {
    id: "#1237",
    user: "Alice Brown",
    amount: "$300.00",
    status: "Paid",
    image: "https://i.pravatar.cc/40?u=a042581f4e29026707d",
  },
  {
    id: "#1238",
    user: "Mike Davis",
    amount: "$45.99",
    status: "Failed",
    image: "https://i.pravatar.cc/40?u=a042581f4e29026708d",
  },
];

const StatCard = ({ icon, title, value, change, changeType }) => {
  const isPositive = changeType === "positive";
  return (
    <div className="bg-gray-800 p-6 rounded-xl flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-sm text-gray-400">{title}</span>
        <span className="text-2xl font-semibold text-gray-100">{value}</span>
        <div className="flex items-center text-xs mt-1">
          <span
            className={`flex items-center ${
              isPositive ? "text-green-400" : "text-red-400"
            }`}
          >
            {isPositive ? (
              <FiArrowUp className="mr-1" />
            ) : (
              <FiArrowDown className="mr-1" />
            )}
            {change}
          </span>
          <span className="text-gray-500 ml-1">vs last month</span>
        </div>
      </div>
      <div
        className={`p-3 rounded-full ${
          isPositive
            ? "bg-green-500/10 text-green-400"
            : "bg-indigo-500/10 text-indigo-400"
        }`}
      >
        {icon}
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <div className="flex-1 bg-gray-900 min-h-screen p-6 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100">Dashboard</h1>
          <p className="text-gray-400 mt-1">
            Welcome back, here's a summary of your business.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<FiDollarSign size={22} />}
            title="Total Revenue"
            value="$45,231.89"
            change="+20.1%"
            changeType="positive"
          />
          <StatCard
            icon={<FiUsers size={22} />}
            title="Subscriptions"
            value="+2350"
            change="+180.1%"
            changeType="positive"
          />
          <StatCard
            icon={<FiShoppingCart size={22} />}
            title="Sales"
            value="+12,234"
            change="+19%"
            changeType="positive"
          />
          <StatCard
            icon={<FiCreditCard size={22} />}
            title="Active Now"
            value="+573"
            change="+201"
            changeType="positive"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
          <div className="xl:col-span-2 bg-gray-800 p-6 rounded-xl">
            <h2 className="text-lg font-semibold text-gray-200 mb-4">
              Revenue Overview
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart
                data={salesData}
                margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                <YAxis
                  stroke="#9ca3af"
                  fontSize={12}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "0.5rem",
                  }}
                  labelStyle={{ color: "#d1d5db" }}
                  itemStyle={{ color: "#8884d8" }}
                />
                <Legend iconType="circle" iconSize={10} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  activeDot={{ r: 8, fill: "#8b5cf6" }}
                  dot={{ fill: "#8b5cf6", r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#34d399"
                  strokeWidth={2}
                  activeDot={{ r: 8, fill: "#34d399" }}
                  dot={{ fill: "#34d399", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl">
            <h2 className="text-lg font-semibold text-gray-200 mb-4">
              Traffic Source
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={trafficData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  stroke="none"
                >
                  {trafficData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "0.5rem",
                  }}
                />
                <Legend iconType="circle" iconSize={10} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-6 bg-gray-800 p-6 rounded-xl">
          <h2 className="text-lg font-semibold text-gray-200 mb-4">
            Recent Orders
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-4 text-sm font-medium text-gray-400">
                    User
                  </th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-400">
                    Order ID
                  </th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-400">
                    Amount
                  </th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-400">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-700 hover:bg-gray-700/50"
                  >
                    <td className="py-4 px-4 flex items-center">
                      <img
                        src={order.image}
                        alt={order.user}
                        className="w-10 h-10 rounded-full mr-4"
                      />
                      <span className="font-medium text-gray-100">
                        {order.user}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-300">{order.id}</td>
                    <td className="py-4 px-4 text-gray-100 font-medium">
                      {order.amount}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium ${
                          order.status === "Paid"
                            ? "bg-green-500/10 text-green-400"
                            : order.status === "Pending"
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
