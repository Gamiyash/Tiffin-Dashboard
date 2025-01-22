import React, { useState, useEffect } from "react";
import OrderDetails from "./OrderDetails";
import { MdDone } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import moment from "moment";

const ManageOrders = () => {

    function getRandomDate(start, end) {
        const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return randomDate.toISOString().split('T')[0];
    }

    const initialRecentActivity = [
        {
            id: "#1423",
            customer: "John Doe",
            phone: "+1 (555) 123-4567",
            address: "123 Main St, Anytown, AN 12345",
            total: "$450",
            status: "Delivered",
            time: getRandomDate(new Date(2025, 1, 1), new Date()),
            specialInstructions: "Leave the package at the doorstep.",
            plan: "Trial",
            mealType: "Basic",
            quantity: 1,
            avatar: "https://randomuser.me/api/portraits/men/10.jpg",
            flexiblePlan: {
                type: "date-range",
                startDate: new Date(2024, 0, 2),
                endDate: new Date(2024, 0, 10),
            },
        },
        {
            id: "#1422",
            customer: "Jane Smith",
            phone: "+1 (555) 987-6543",
            address: "456 Maple Ave, Somecity, SC 54321",
            total: "$1200",
            status: "Processing",
            time: getRandomDate(new Date(2025, 1, 1), new Date()),
            specialInstructions: "Ring the doorbell upon arrival.",
            plan: "Weekly",
            mealType: "Premium",
            quantity: 2,
            avatar: "https://randomuser.me/api/portraits/women/12.jpg",
            flexiblePlan: {
                type: "flexi-dates",
                flexiDates: [
                    new Date(2024, 0, 3),
                    new Date(2024, 0, 5),
                    new Date(2024, 0, 8),
                ],
            },
        },
        {
            id: "#1421",
            customer: "Ravi Kumar",
            phone: "+91 98765 43210",
            address: "789 Elm St, New Delhi, DL 110001",
            total: "$800",
            status: "Delivered",
            time: getRandomDate(new Date(2025, 1, 1), new Date()),
            specialInstructions: "Do not include onions.",
            plan: "Monthly",
            mealType: "Basic",
            quantity: 3,
            avatar: "https://randomuser.me/api/portraits/men/15.jpg",
            flexiblePlan: {
                type: "date-range",
                startDate: new Date(2024, 0, 1),
                endDate: new Date(2024, 0, 31),
            },
        },
        {
            id: "#1420",
            customer: "Ayesha Khan",
            phone: "+91 99876 54321",
            address: "123 Cherry Lane, Mumbai, MH 400001",
            total: "$650",
            status: "Rejected",
            time: getRandomDate(new Date(2025, 1, 1), new Date()),
            specialInstructions: "Deliver between 6-7 PM.",
            plan: "Weekly",
            mealType: "Vegetarian",
            quantity: 1,
            avatar: "https://randomuser.me/api/portraits/women/20.jpg",
            flexiblePlan: {
                type: "flexi-dates",
                flexiDates: [new Date(2024, 0, 4), new Date(2024, 0, 9)],
            },
        },
        {
            id: "#1424",
            customer: "Mohit Sharma",
            phone: "+91 98700 12345",
            address: "101 Palm Street, Jaipur, RJ 302001",
            total: "$1000",
            status: "New Order",
            time: getRandomDate(new Date(2025, 1, 1), new Date()),
            specialInstructions: "Extra spicy food requested.",
            plan: "Trial",
            mealType: "Deluxe",
            quantity: 2,
            avatar: "https://randomuser.me/api/portraits/men/25.jpg",
            flexiblePlan: {
                type: "date-range",
                startDate: new Date(2024, 0, 5),
                endDate: new Date(2024, 0, 15),
            },
        },
        {
            id: "#1425",
            customer: "Emily Davis",
            phone: "+1 (555) 456-7890",
            address: "222 Broadway, New York, NY 10007",
            total: "$750",
            status: "New Order",
            time: getRandomDate(new Date(2025, 1, 1), new Date()),
            specialInstructions: "Add extra cutlery.",
            plan: "Weekly",
            mealType: "Non-Vegetarian",
            quantity: 2,
            avatar: "https://randomuser.me/api/portraits/women/16.jpg",
            flexiblePlan: {
                type: "flexi-dates",
                flexiDates: [new Date(2024, 0, 6), new Date(2024, 0, 10)],
            },
        },
        {
            id: "#1426",
            customer: "Sanjay Mehta",
            phone: "+91 87654 32109",
            address: "88 MG Road, Pune, MH 411001",
            total: "$1400",
            status: "Delivered",
            time: getRandomDate(new Date(2025, 1, 1), new Date()),
            specialInstructions: "Deliver to the office reception.",
            plan: "Monthly",
            mealType: "Deluxe",
            quantity: 4,
            avatar: "https://randomuser.me/api/portraits/men/30.jpg",
            flexiblePlan: {
                type: "date-range",
                startDate: new Date(2024, 0, 1),
                endDate: new Date(2024, 0, 31),
            },
        },
        {
            id: "#1427",
            customer: "Priya Nair",
            phone: "+91 98987 65432",
            address: "202 Greenfields, Kochi, KL 682001",
            total: "$550",
            status: "New Order",
            time: getRandomDate(new Date(2025, 1, 1), new Date()),
            specialInstructions: "Do not include garlic.",
            plan: "Trial",
            mealType: "Vegetarian",
            quantity: 1,
            avatar: "https://randomuser.me/api/portraits/women/22.jpg",
            flexiblePlan: {
                type: "date-range",
                startDate: new Date(2024, 0, 10),
                endDate: new Date(2024, 0, 15),
            },
        },
    ];



    const [recentActivity, setRecentActivity] = useState(initialRecentActivity);
    const [statusFilter, setStatusFilter] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(initialRecentActivity[0]);
    const [mealPlanFilter, setMealPlanFilter] = useState("");
    const [timeFilter, setTimeFilter] = useState("");
    const [filters, setFilters] = useState({
        mealType: "",
        customer: "",
        total: "",
        status: "",
        time: "",
    });
    const [totalRange, setTotalRange] = useState("");
    const [activeFilter, setActiveFilter] = useState(null);

    const toggleFilters = (filterName) => {
        setActiveFilter((prev) => (prev === filterName ? null : filterName)); // Toggle the clicked filter
    };


    useEffect(() => {
        const filteredOrders = initialRecentActivity.filter((order) => {
            const total = parseFloat(order.total.replace("$", "").trim());
            if (!totalRange) return true;

            const [min, max] = totalRange.split("-").map((val) => parseFloat(val));
            return total >= min && total <= max;
        });

        setRecentActivity(filteredOrders);
    }, [totalRange]);


    useEffect(() => {
        const filteredActivity = initialRecentActivity.filter(
            (order) => !statusFilter || order.status === statusFilter
        );
        setRecentActivity(filteredActivity);
    }, [statusFilter]);

    // Handle status change for a specific order
    const statusChange = (orderId, newStatus) => {
        const updatedOrders = recentActivity.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
        );
        setRecentActivity(updatedOrders);

        // Update selected order's status if it's currently selected
        if (selectedOrder.id === orderId) {
            setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
    }
    useEffect(() => {
        const filteredActivity = initialRecentActivity.filter((order) => {
            return (
                order.mealType.toLowerCase().includes(filters.mealType.toLowerCase()) &&
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

    const handleBulkAction = (action) => {
        const updatedOrders = recentActivity.map((order) => {
            if (action === "All Accept" && order.status === "New Order") {
                return { ...order, status: "Processing" };
            }
            if (action === "All Reject" && order.status === "New Order") {
                return { ...order, status: "Rejected" };
            }
            if (action === "All Delivered" && order.status === "Processing") {
                return { ...order, status: "Delivered" };
            }
            return order;
        });
        setRecentActivity(updatedOrders);
    };

    const handleMealPlanFilterChange = (e) => {
        setMealPlanFilter(e.target.value);
    };

    const handleTimeFilterChange = (e) => {
        setTimeFilter(e.target.value);
    };

    useEffect(() => {
        let filteredOrders = initialRecentActivity;

        // Apply meal plan filter
        if (mealPlanFilter) {
            filteredOrders = filteredOrders.filter(order => order.plan === mealPlanFilter);
        }

        // Apply time filter (Today, This Week, This Month)
        if (timeFilter) {
            const currentDate = moment();
            filteredOrders = filteredOrders.filter((order) => {
                const orderDate = moment(order.time, "YYYY-MM-DD");  // Assuming time is in YYYY-MM-DD format
                switch (timeFilter) {
                    case "Today":
                        return orderDate.isSame(currentDate, 'day');
                    case "This Week":
                        return orderDate.isSame(currentDate, 'week');
                    case "This Month":
                        return orderDate.isSame(currentDate, 'month');
                    default:
                        return true;
                }
            });
        }

        setRecentActivity(filteredOrders);
    }, [mealPlanFilter, timeFilter]);


    return (
        <div className="flex gap-4">
            {/* Orders Table */}
            <div className="bg-white rounded shadow p-4 w-[65%]">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Orders</h2>
                    <div className="space-x-2">
                        {/* Meal Plan Filter */}
                        <select
                            className="text-sm border border-gray-300 rounded px-2 py-1 cursor-pointer"
                            value={mealPlanFilter}
                            onChange={handleMealPlanFilterChange}
                        >
                            <option value="">All Meal Plans</option>
                            <option value="Trial">Trial</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                        </select>

                        {/* Time Filter */}
                        <select
                            className="text-sm border border-gray-300 rounded px-2 py-1 cursor-pointer"
                            value={timeFilter}
                            onChange={handleTimeFilterChange}
                        >
                            <option value="">All Time</option>
                            <option value="Today">Today</option>
                            <option value="This Week">This Week</option>
                            <option value="This Month">This Month</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-gray-500 border-b">
                                <th className="py-2 px-2 text-left border-r">
                                    {activeFilter !== "mealType" && (
                                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => toggleFilters("mealType")}>
                                            <span>MealTypes</span>
                                            <IoIosSearch className="mt-1" />
                                        </div>
                                    )}
                                    {activeFilter === "mealType" && (
                                        <input
                                            placeholder="Filter MealType"
                                            value={filters.mealType}
                                            onChange={(e) => handleFilterChange("mealType", e.target.value)}
                                            className="mt-1 text-xs border border-gray-400 rounded-sm py-1 px-2 w-24"
                                        />
                                    )}
                                </th>
                                <th className="py-2 px-2 text-left border-r">
                                    {activeFilter !== "customer" && (
                                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => toggleFilters("customer")}>
                                            Customer <IoIosSearch className="mt-1" />
                                        </div>
                                    )}
                                    {activeFilter === "customer" && (
                                        <input
                                            placeholder="Filter Customer"
                                            value={filters.customer}
                                            onChange={(e) => handleFilterChange("customer", e.target.value)}
                                            className="mt-1 text-xs border border-gray-400 rounded-sm py-1 px-2 w-24"
                                        />
                                    )}
                                </th>
                                <th className="py-2 px-2 text-left border-r">
                                    {activeFilter !== "total" && (
                                        <div className="flex items-center gap-1">
                                            <select
                                                className="text-sm border border-gray-300 rounded px-2 py-1 cursor-pointer w-24"
                                                value={totalRange}
                                                onChange={(e) => setTotalRange(e.target.value)}
                                            >
                                                <option value="" className="text-sm">Total</option>
                                                <option value="0-200" className="text-sm">0 - 200</option>
                                                <option value="200-500" className="text-sm">200 - 500</option>
                                                <option value="500-700" className="text-sm">500 - 700</option>
                                                <option value="700-1000" className="text-sm">700 - 1000</option>
                                                <option value="1000-2000" className="text-sm">1000 - 2000</option>
                                            </select>
                                            <div className="flex items-center gap-2 cursor-pointer" onClick={() => toggleFilters("total")}>
                                                <IoIosSearch className="mt-1" />
                                            </div>
                                        </div>
                                    )}
                                    {activeFilter === "total" && (
                                        <input
                                            placeholder="Filter Total"
                                            value={filters.total}
                                            onChange={(e) => handleFilterChange("total", e.target.value)}
                                            className="mt-1 text-xs border border-gray-400 rounded-sm py-1 px-2 w-24"
                                        />
                                    )}
                                </th>
                                <th className="py-2 px-2 text-left border-r">
                                    <select
                                        className="text-sm border border-gray-300 rounded px-2 py-1 cursor-pointer w-24"
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                    >
                                        <option value="" className="text-sm">Status</option>
                                        <option className="text-yellow-800" value="New Order">New Order</option>
                                        <option className="text-blue-800" value="Processing">Processing</option>
                                        <option className="text-green-800" value="Delivered">Delivered</option>
                                        <option className="text-red-800" value="Rejected">Rejected</option>
                                    </select>
                                </th>
                                <th className="py-2 px-2 text-left">
                                    <select
                                        className="text-sm border border-gray-300 rounded px-2 py-1 cursor-pointer w-24"
                                        onChange={(e) => handleBulkAction(e.target.value)}
                                    >
                                        <option value="" className="text-sm">Actions</option>
                                        <option className="text-yellow-800" value="All Accept">Accept All</option>
                                        <option className="text-red-800" value="All Reject">Reject All</option>
                                        <option className="text-green-800" value="All Delivered">Delivered All</option>
                                    </select>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {recentActivity.map((order) => (
                                <tr
                                    key={order.id}
                                    className={`border-b last:border-0 cursor-pointer ${selectedOrder.id === order.id ? "bg-gray-100" : ""}`}
                                    onClick={() => setSelectedOrder(order)}
                                >
                                    <td className="py-2 px-2 border-r text-center">{order.mealType}</td>
                                    <td className="py-2 px-2 border-r text-center">{order.customer}</td>
                                    <td className="py-2 px-2 border-r text-center">{order.total}</td>
                                    <td className="py-2 px-2 border-r text-center">
                                        <span
                                            className={`text-xs font-semibold px-2 py-1 rounded ${order.status === "New Order"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : order.status === "Delivered"
                                                    ? "bg-green-100 text-green-800"
                                                    : order.status === "Processing"
                                                        ? "bg-blue-100 text-blue-800"
                                                        : "bg-red-100 text-red-800"
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-2 flex items-center gap-2 justify-center">
                                        {order.status === "New Order" && (
                                            <>
                                                <span
                                                    className="text-green-500 cursor-pointer"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        statusChange(order.id, "Processing");
                                                    }}
                                                >
                                                    <MdDone size={20} />
                                                </span>
                                                <span
                                                    className="text-red-500 cursor-pointer"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        statusChange(order.id, "Rejected");
                                                    }}
                                                >
                                                    <MdOutlineCancel size={20} />
                                                </span>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>

            {/* Order Details */}
            <div className="w-[35%]">
                <OrderDetails order={selectedOrder} onStatusChange={statusChange} />
            </div>
        </div >
    );
};

export default ManageOrders;
