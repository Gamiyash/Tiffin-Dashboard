import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, Bar, BarChart, CartesianGrid } from "recharts";
import { FaChartLine } from "react-icons/fa";
import { VscFeedback } from "react-icons/vsc";

export default function DashboardAnalytics() {
    const [activeTab, setActiveTab] = useState("daily");

    const data = {
        daily: [
            { date: "Mon", orders: 12, totalPurchase: 240 },
            { date: "Tue", orders: 18, totalPurchase: 360 },
            { date: "Wed", orders: 15, totalPurchase: 300 },
            { date: "Thu", orders: 20, totalPurchase: 400 },
            { date: "Fri", orders: 25, totalPurchase: 500 },
            { date: "Sat", orders: 30, totalPurchase: 600 },
            { date: "Sun", orders: 22, totalPurchase: 440 },
        ],
        weekly: [
            { week: "Week 1", orders: 180, totalPurchase: 2900 },
            { week: "Week 2", orders: 145, totalPurchase: 2900 },
            { week: "Week 3", orders: 132, totalPurchase: 2640 },
            { week: "Week 4", orders: 160, totalPurchase: 3200 },
        ],
        monthly: [
            { month: "Jan", orders: 520, totalPurchase: 10400 },
            { month: "Feb", orders: 480, totalPurchase: 9600 },
            { month: "Mar", orders: 550, totalPurchase: 11000 },
            { month: "Apr", orders: 590, totalPurchase: 11800 },
            { month: "May", orders: 610, totalPurchase: 12200 },
            { month: "Jun", orders: 670, totalPurchase: 13400 },
            { month: "Jul", orders: 768, totalPurchase: 15360 },
            { month: "Aug", orders: 870, totalPurchase: 17400 },
            { month: "Sept", orders: 920, totalPurchase: 18400 },
            { month: "Oct", orders: 980, totalPurchase: 19600 },
            { month: "Nov", orders: 1050, totalPurchase: 21000 },
            { month: "Dec", orders: 457, totalPurchase: 9140 },
        ],
    };

    // const predefinedMealTypeLabels = [
    //     "Basic Combo",
    //     "Premium Combo",
    //     "Deluxe Combo",
    //     "Light Meal",
    //     "Protein Boost",
    //     "Kids Meal",
    //     "Vegan Combo",
    //   ];

    const MealTypesData = [
        { category: "Basic Combo", count: 65 },
        { category: "Premium Combo", count: 25 },
        { category: "Deluxe Combo", count: 10 },
        { category: "Light Meal", count: 10 },,
    ];

    const tabs = ["daily", "weekly", "monthly"];
    const axisKey = { daily: "date", weekly: "week", monthly: "month" };


    return (
        <div className="flex gap-2 items-center w-full">
            {/* Order Analytics */}
            <div className="p-4 bg-white rounded shadow space-y-4 md:w-1/2 w-full">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-lg font-bold text-gray-700 flex items-center gap-2">
                            <FaChartLine className="text-blue-500" />
                            Order Analytics
                        </h1>
                        <p className="text-sm text-gray-500">View order trends for different time periods</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            className={`px-4 py-2 text-sm font-medium rounded ${activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Line Chart */}
                <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data[activeTab]}>
                            <XAxis dataKey={axisKey[activeTab]} tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: "#ddd" }} />
                            <YAxis yAxisId="left" tick={{ fontSize: 12 }} axisLine={{ stroke: "#ddd" }} tickLine={false} label={{ value: "Orders", angle: -90, position: "insideLeft", fill: "#4287f5" }} />
                            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} axisLine={{ stroke: "#ddd" }} tickLine={false} label={{ value: "Total Purchase (₹)", angle: -90, position: "center", dx: 20, style: { textAnchor: "middle", fill: "#82ca9d" } }} />
                            <Tooltip />
                            <Legend verticalAlign="top" height={36} />
                            <Line yAxisId="left" type="monotone" dataKey="orders" stroke="#4287f5" strokeWidth={3} name="Orders" dot={{ stroke: "#4287f5", r: 4 }} />
                            <Line yAxisId="right" type="monotone" dataKey="totalPurchase" stroke="#82ca9d" strokeWidth={2} name="Total Purchase" dot={{ stroke: "#82ca9d", r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Customer Feedback */}
            <div className="w-full md:w-1/2 bg-white rounded-md shadow-md space-y-4 p-4">
                <div>
                    <h1 className="text-lg font-bold text-gray-700 flex items-center gap-2">
                        <VscFeedback className="text-blue-500 font-bold" />Customer Feedback</h1>
                    <p className="text-sm text-gray-500">Distribution of customer sentiment</p>
                </div>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={MealTypesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" className="text-[10px]" />
                            <YAxis />
                            <Tooltip
                            />
                            <Bar dataKey="count" fill="#009999" name="Number of MealTypes" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
