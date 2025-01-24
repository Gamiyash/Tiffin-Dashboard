import React, { useState, useEffect } from "react";
import DashboardAnalytics from "../components/DashboardComponets/Analytics";


export default function DashboardHome() {
  const stats = [
    {
      label: "Today's Orders",
      value: 78,
      bg: "bg-pink-600",
    },
    {
      label: "Revenue (Today)",
      value: "₹ 14,500",
      bg: "bg-blue-600",
    },
    {
      label: "Total Users",
      value: 68,
      bg: "bg-green-600",
    },
    {
      label: "Average Order Value",
      value: 900,
      bg: "bg-yellow-600",
    },
  ];

  const initialRecentActivity = [
    {
      id: "#1423",
      customer: "John Doe",
      total: "₹ 450",
      status: "Delivered",
      time: "10 mins ago",
    },
    {
      id: "#1422",
      customer: "Jane Smith",
      total: "₹ 1200",
      status: "Processing",
      time: "20 mins ago",
    },
    {
      id: "#1421",
      customer: "Ravi Kumar",
      total: "₹ 800",
      status: "Delivered",
      time: "30 mins ago",
    },
    {
      id: "#1420",
      customer: "Ayesha Khan",
      total: "₹ 650",
      status: "Cancelled",
      time: "45 mins ago",
    },
    {
      id: "#1424",
      customer: "Ayesha Khan",
      total: "₹ 650",
      status: "New Orders",
      time: "45 mins ago",
    },
  ];

  const [recentActivity, setRecentActivity] = useState(initialRecentActivity);
  const [filters, setFilters] = useState({
    id: "",
    customer: "",
    total: "",
    status: "",
    time: "",
  });

  useEffect(() => {
    const filteredActivity = initialRecentActivity.filter((order) => {
      return (
        order.id.toLowerCase().includes(filters.id.toLowerCase()) &&
        order.customer.toLowerCase().includes(filters.customer.toLowerCase()) &&
        order.total.toLowerCase().includes(filters.total.toLowerCase()) &&
        order.status.toLowerCase().includes(filters.status.toLowerCase()) &&
        order.time.toLowerCase().includes(filters.time.toLowerCase())
      );
    });
    setRecentActivity(filteredActivity);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-2">
      {/* Title */}
      {/* <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1> */}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`flex items-center justify-between p-4 rounded shadow text-white ${stat.bg}`}
          >
            <div className="flex flex-col">
              <option className="text-sm font-medium opacity-90">
                {stat.label}
              </option>
              <option className="text-xl font-bold mt-1">{stat.value}</option>
            </div>
            {/* Icon placeholder (replace with actual icons if you like) */}
            <svg
              className="w-8 h-8 opacity-75"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5l-7 7 7 7M5 12h14"
              />
            </svg>
          </div>
        ))}
      </div>

      <div className="md:flex-row flex flex-col gap-2 md:h-[70vh] h-full">
          <DashboardAnalytics />
      </div>

      {/* Recent Activity or Orders */}
      {/* <div className="bg-white rounded shadow p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-700">Recent Orders</h2>
          <button className="text-sm text-blue-500 hover:underline">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-2">
                  <div>Order ID</div>
                  <input
                    placeholder="Filter ID"
                    value={filters.id}
                    onChange={(e) => handleFilterChange("id", e.target.value)}
                    className="mt-1 text-xs border border-gray-400 rounded-sm py-1 px-2"
                  />
                </th>
                <th className="py-2">
                  <div>Customer</div>
                  <input
                    placeholder="Filter Customer"
                    value={filters.customer}
                    onChange={(e) => handleFilterChange("customer", e.target.value)}
                    className="mt-1 text-xs border border-gray-400 rounded-sm py-1 px-2"
                  />
                </th>
                <th className="py-2">
                  <div>Total</div>
                  <input
                    placeholder="Filter Total"
                    value={filters.total}
                    onChange={(e) => handleFilterChange("total", e.target.value)}
                    className="mt-1 text-xs border border-gray-400 rounded-sm py-1 px-2"
                  />
                </th>
                <th className="py-2">
                  <div>Status</div>
                  <select
                    className="mt-1 text-xs border border-gray-400 rounded-sm py-1 px-2"
                    value={filters.status}
                    onChange={(e) => handleFilterChange("status", e.target.value)}
                  >
                    <option value="">All</option>
                    <option className="text-yellow-800" value="New Orders">New Orders</option>
                    <option className="text-blue-800" value="Processing">Processing</option>
                    <option className="text-green-800" value="Delivered">Delivered</option>
                    <option className="text-red-800" value="Cancelled">Cancelled</option>
                  </select>
                </th>

                <th className="py-2">
                  <div>Time</div>
                  <input
                    placeholder="Filter Time"
                    value={filters.time}
                    onChange={(e) => handleFilterChange("time", e.target.value)}
                    className="mt-1 text-xs border border-gray-400 rounded-sm py-1 px-2"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((order) => (
                <tr key={order.id} className="border-b last:border-0">
                  <td className="py-2">{order.id}</td>
                  <td className="py-2">{order.customer}</td>
                  <td className="py-2">{order.total}</td>
                  <td className="py-2">
                    <option
                      className={`
                        text-xs font-semibold px-2 py-1 rounded
                        ${order.status === "New Orders"
                        ? "bg-yellow-100 text-yellow-800"
                        : ""
                      }
                        ${order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : ""
                        }
                        ${order.status === "Processing"
                          ? "bg-blue-100 text-blue-800"
                          : ""
                        }
                        ${order.status === "Cancelled"
                          ? "bg-red-100 text-red-800"
                          : ""
                        }
                      `}
                    >
                      {order.status}
                    </option>
                  </td>
                  <td className="py-2 text-gray-500">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </div >
  );
}

