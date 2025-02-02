import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, Bar, BarChart, CartesianGrid } from "recharts";
import { FaChartLine } from "react-icons/fa";
import { MdOutlineNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { HiOutlineInformationCircle } from "react-icons/hi";
import axios from "axios";

export default function DashboardAnalytics() {
    const [activeTab, setActiveTab] = useState("daily");
    const [activeTabForMealType, setactiveTabForMealType] = useState("Today");
    const [orderData, setOrderData] = useState([]);
    const [mealTypeData, setMealTypeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchOrderAnalytics = async (timeframe) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/order-analytics?timeframe=${timeframe}`);
            setOrderData(response.data);
        } catch (error) {
            console.error("Error fetching order analytics:", error);
        }
    };

    const fetchMealTypeAnalytics = async (timeframe) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/mealtype-analytics?timeframe=${timeframe}`);
            setMealTypeData(response.data);
        } catch (error) {
            console.error("Error fetching meal type analytics:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([
                fetchOrderAnalytics(activeTab),
                fetchMealTypeAnalytics(activeTabForMealType)
            ]);
            setLoading(false);
        };

        fetchData();
    }, [activeTab, activeTabForMealType]);

    const tabs = ["daily", "weekly", "monthly"];
    const axisKey = { daily: "date", weekly: "week", monthly: "month" };
    const mealTypesTabs = ["Today", "This Week", "This Month"];

    // if (loading) {
    //     return <div className="w-full h-64 flex items-center justify-center">Loading...</div>;
    // }

    return (
        <div className="flex gap-2 items-center w-full">
            {/* Order Analytics */}
            <div className="p-4 bg-white rounded shadow space-y-4 md:w-1/2 w-full">
                <div className="flex items-center justify-between">
                    <div className="w-full">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-1 items-center">
                                <h1 className="text-lg font-bold text-gray-700 flex items-center gap-2">
                                    <FaChartLine className="text-blue-500" />
                                    Order Analytics
                                </h1>
                                <div className="relative group mt-1">
                                    <HiOutlineInformationCircle
                                        size={15}
                                        className="text-gray-600 cursor-pointer hover:text-gray-800"
                                    />
                                    <div className="absolute w-[25vw] mt-4 top-full -left-32 hidden group-hover:flex items-center justify-center bg-gray-700 text-white text-xs rounded-md px-2 py-1 shadow-md">
                                        <span>Dynamic order analytics based on selected timeframe</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex text-blue-600 cursor-pointer">
                                <MdOutlineNavigateNext onClick={() => navigate("/orders")} size={20} />
                            </div>
                        </div>
                        <p className="text-sm text-gray-500">View order trends for different time periods</p>
                    </div>
                </div>

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

                <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={orderData}>
                            <XAxis dataKey={axisKey[activeTab]} tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: "#ddd" }} />
                            <YAxis yAxisId="left" tick={{ fontSize: 12 }} axisLine={{ stroke: "#ddd" }} tickLine={false} label={{ value: "Orders", angle: -90, position: "insideLeft", fill: "#4287f5" }} />
                            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} axisLine={{ stroke: "#ddd" }} tickLine={false} label={{ value: "Total Purchase ($)", angle: -90, position: "center", dx: 20, style: { textAnchor: "middle", fill: "#82ca9d" } }} />
                            <Tooltip />
                            <Legend verticalAlign="top" height={36} />
                            <Line yAxisId="left" type="monotone" dataKey="orders" stroke="#4287f5" strokeWidth={3} name="Orders" dot={{ stroke: "#4287f5", r: 4 }} />
                            <Line yAxisId="right" type="monotone" dataKey="totalPurchase" stroke="#82ca9d" strokeWidth={2} name="Total Purchase" dot={{ stroke: "#82ca9d", r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* MealTypes Analytics */}
            <div className="w-full md:w-1/2 bg-white rounded-md shadow-md space-y-4 p-4">
                <div className="w-full">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-1 items-center">
                            <h1 className="text-lg font-bold text-gray-700 flex items-center gap-2">
                                <FaChartLine className="text-blue-500" />MealTypes Analytics
                            </h1>
                            <div className="relative group mt-1">
                                <HiOutlineInformationCircle
                                    size={15}
                                    className="text-gray-600 cursor-pointer hover:text-gray-800"
                                />
                                <div className="absolute w-[25vw] mt-4 top-full -left-32 hidden group-hover:flex items-center justify-center bg-gray-700 text-white text-xs rounded-md px-2 py-1 shadow-md">
                                    <span>Dynamic meal type analytics based on selected timeframe</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex text-blue-600 cursor-pointer">
                            <MdOutlineNavigateNext onClick={() => navigate("/tiffin")} size={20} />
                        </div>
                    </div>
                    <p className="text-sm text-gray-500">Sales Overview Of MealTypes</p>
                </div>

                <div className="flex gap-2">
                    {mealTypesTabs.map((tab) => (
                        <button
                            key={tab}
                            className={`px-4 py-2 text-sm font-medium rounded ${activeTabForMealType === tab ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`}
                            onClick={() => setactiveTabForMealType(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={mealTypeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" className="text-[10px]" />
                            <YAxis />
                            <Tooltip formatter={(value, name, props) => [`${value} Orders`, `Meal Type: ${props.payload.category}`]} />
                            <Bar dataKey="count" fill="#009999" name="Number of Orders" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* <div className="text-center text-sm text-gray-600 mt-2">
                    Showing data for: <span className="font-semibold">{activeTabForMealType}</span>
                </div> */}
            </div>
        </div>
    );
}