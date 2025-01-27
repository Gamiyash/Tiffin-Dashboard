import React, { useState, useEffect, useMemo } from "react";
import OrderDetails from "./OrderDetails";
import { MdDone } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import moment from "moment";
// import { recentActivity } from "../../data/dummy";
import io from "socket.io-client";
import axios from "axios";


const ManageOrders = () => {
    const [originalOrders, setOriginalOrders] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);
    const [statusFilter, setStatusFilter] = useState("");
    const [selectedOrder, setSelectedOrder] = useState([]);
    const [mealPlanFilter, setMealPlanFilter] = useState("");
    const [mealTypeFilter, setmealTypeFilter] = useState("");
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
    const [showReasonBox, setshowReasonBox] = useState(true);
    const [reason, setReason] = useState("");
    const [sortOrderByDistance, setSortOrderByDistance] = useState("");
    const [distanceRange, setDistanceRange] = useState("");
    const [bulkActionOrders, setBulkActionOrders] = useState([]);
    const [bulkActionType, setBulkActionType] = useState(""); // Tracks the current bulk action


    const socket = useMemo(() => io(`${import.meta.env.VITE_BACKEND_URL}`), []);

    const handleSend = () => {
        if (reason.trim()) {
            setReason("");
            setshowReasonBox(!showReasonBox);
        } else {
            alert("Please provide a reason for rejection.");
        }
    }

    useEffect(() => {
        const getOrders = async () => {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getOrders`);
            setRecentActivity(response.data);
            setOriginalOrders(response.data);
            setSelectedOrder(response.data[0]);
            // console.log("response is:", response.data[0]);
        }

        getOrders();
    }, []);

    const toggleFilters = (filterName) => {
        setActiveFilter((prev) => (prev === filterName ? null : filterName)); // Toggle the clicked filter
    };


    //Manag Statuses
    const statusChange = async (orderId, newStatus) => {
        if (newStatus === "Rejected") {
            setshowReasonBox(!showReasonBox);
        }
        // Update status in local state immediately
        const updatedOrders = recentActivity.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
        );
        setRecentActivity(updatedOrders);

        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/order/${orderId}/status`, {
                status: newStatus,
            });
            // console.log(`Order status for ${orderId} updated to ${newStatus}`);
        } catch (err) {
            console.error("Error updating order status:", err);
        }

        // Update selected order's status if it's currently selected
        if (selectedOrder._id === orderId) {
            setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
    };

    // const handleBulkAction = async (action) => {
    //     // Determine the orders to target based on the action
    //     let orderIds = [];

    //     if (action === "All Accept" || action === "All Reject") {
    //         orderIds = originalOrders
    //             .filter((order) => order.status === "New Order")
    //             .map((order) => order._id);
    //     } else if (action === "Delivered All") {
    //         orderIds = originalOrders
    //             .filter((order) => order.status === "Processing")
    //             .map((order) => order._id);
    //     }

    //     if (orderIds.length === 0) {
    //         alert("No orders available for this action.");
    //         return;
    //     }

    //     try {
    //         // Call the backend API to perform the bulk action
    //         const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/bulk-action`, {
    //             action,
    //             orderIds,
    //         });

    //         const today = moment().startOf("day");

    //         // Update the local state based on the action
    //         if (action === "Delivered All") {
    //             setRecentActivity((prevOrders) =>
    //                 prevOrders.map((order) => {
    //                     if (orderIds.includes(order._id) && order.status === "Processing") {
    //                         const subStatusIndex = order.subStatus.findIndex((entry) =>
    //                             moment(entry.date).isSame(today, "day")
    //                         );

    //                         const updatedSubStatus = [...order.subStatus];

    //                         if (subStatusIndex !== -1) {
    //                             updatedSubStatus[subStatusIndex].status = "Delivered";
    //                         } else {
    //                             updatedSubStatus.push({ date: today.toDate(), status: "Delivered" });
    //                         }

    //                         return { ...order, subStatus: updatedSubStatus };
    //                     }
    //                     return order;
    //                 })
    //             );
    //         } else {
    //             // Handle "All Accept" and "All Reject"
    //             const newStatus = action === "All Accept" ? "Processing" : "Rejected";
    //             setRecentActivity((prevOrders) =>
    //                 prevOrders.map((order) =>
    //                     orderIds.includes(order._id) ? { ...order, status: newStatus } : order
    //                 )
    //             );
    //         }
    //     } catch (err) {
    //         console.error("Error performing bulk action:", err);
    //     }
    // };

    const triggerBulkAction = (action) => {
        // Determine orders applicable for the action
        let applicableOrders = [];

        if (action === "All Accept" || action === "All Reject") {
            applicableOrders = originalOrders.filter((order) => order.status === "New Order");
        } else if (action === "Delivered All") {
            applicableOrders = originalOrders.filter((order) => order.status === "Processing");
        }

        if (applicableOrders.length === 0) {
            alert("No orders available for this action.");
            return;
        }

        // Mark all applicable orders as selected by default
        setBulkActionOrders(applicableOrders.map((order) => ({ ...order, selected: true })));
        setBulkActionType(action); // Save the action type
    };

    const applyBulkAction = async () => {
        const selectedOrders = bulkActionOrders.filter((order) => order.selected);

        if (selectedOrders.length === 0) {
            alert("No orders selected for this action.");
            return;
        }

        const orderIds = selectedOrders.map((order) => order._id);

        try {
            // Call the backend API
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/bulk-action`, {
                action: bulkActionType,
                orderIds,
            });

            const today = moment().local().startOf("day").local();

            // Update local state
            if (bulkActionType === "Delivered All") {
                setRecentActivity((prevOrders) =>
                    prevOrders.map((order) => {
                        if (orderIds.includes(order._id) && order.status === "Processing") {
                            const subStatusIndex = order.subStatus.findIndex((entry) =>
                                moment(entry.date).local().isSame(today, "day")
                            );

                            const updatedSubStatus = [...order.subStatus];

                            if (subStatusIndex !== -1) {
                                updatedSubStatus[subStatusIndex].status = "Delivered";
                            } else {
                                updatedSubStatus.push({ date: today.toDate(), status: "Delivered" });
                            }

                            return { ...order, subStatus: updatedSubStatus };
                        }
                        return order;
                    })
                );
            } else {
                const newStatus = bulkActionType === "All Accept" ? "Processing" : "Rejected";
                setRecentActivity((prevOrders) =>
                    prevOrders.map((order) =>
                        orderIds.includes(order._id) ? { ...order, status: newStatus } : order
                    )
                );
            }

            // Clear bulk action state
            setBulkActionOrders([]);
            setBulkActionType("");
            window.location.reload();
        } catch (err) {
            console.error("Error performing bulk action:", err);
        }
    };

    //subStatus (Delivered.,Pending) for Daily
    const updateSubStatus = async (orderId, date, newStatus) => {
        try {
            // Update sub-status for the specific date
            const updatedOrder = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/order/${orderId}/sub-status`,
                { date, status: newStatus }
            );

            // Update local state with the backend's response
            setRecentActivity((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === updatedOrder._id ? updatedOrder : order
                )
            );
        } catch (err) {
            console.error("Error updating sub-status:", err);
        }
    };

    // Automatically mark orders as "Plan Completed" after the plan duration ends
    useEffect(() => {
        const interval = setInterval(() => {
            const updatedOrders = originalOrders.map((order) => {
                const planEndDate = moment(order.time, "YYYY-MM-DD").local().add(order.plan, "days");
                if (
                    order.status === "Processing" &&
                    moment().local().isAfter(planEndDate, "day")
                ) {
                    return { ...order, status: "Plan Completed" };
                }
                return order;
            });
            setRecentActivity(updatedOrders);
        }, 24 * 60 * 60 * 1000); // Check every day

        return () => clearInterval(interval);
    }, [originalOrders]);


    useEffect(() => {

        socket.on("subStatusUpdated", (order) => {
            setRecentActivity((prevOrders) =>
                prevOrders.map((o) =>
                    o._id === order._id ? { ...o, subStatus: order.subStatus, status: order.status } : o
                )
            );
        });
        socket.on("bulkOrderStatusUpdated", ({ action, orders }) => {
            // Update the statuses of multiple orders at once
            setRecentActivity((prevOrders) =>
                prevOrders.map((order) =>
                    orders.some((updatedOrder) => updatedOrder._id === order._id)
                        ? { ...order, status: orders.find((o) => o._id === order._id).status }
                        : order
                )
            );
        });

        return () => {
            socket.disconnect(); // Cleanup socket connection when component is unmounted
        };
    }, [socket]);

    const uniqueMealPlans = [
        ...new Set(
            originalOrders
                .map((order) => {
                    if (order.flexiblePlan.type === "normal") {
                        return `${order.flexiblePlan.plan} Days`; // For normal plans, return the plan value
                    } else if (order.flexiblePlan.type === "date-range") {
                        return "Date Range Plan"; // Merge all date-range plans into one option
                    } else if (order.flexiblePlan.type === "flexi-dates") {
                        return "Flexi Dates Plan"; // Merge all flexi-dates plans into one option
                    }
                })
                .filter(Boolean) // Filter out null/undefined values
        ),
    ];


    //Filters
    const applyFiltersAndSorting = () => {
        let filteredOrders = [...originalOrders];

        // Meal Type Filter
        if (mealTypeFilter) {
            filteredOrders = filteredOrders.filter(
                (order) => order.mealType === mealTypeFilter
            );
        }

        // Meal Plan Filter
        if (mealPlanFilter) {
            // Apply filtering based on the selected filter
            filteredOrders = filteredOrders.filter((order) => {
                if (!mealPlanFilter) return true; // If no filter is selected, show all orders

                // For filtering, match the appropriate flexiPlan types
                if (mealPlanFilter === "Date Range Plan" && order.flexiblePlan.type === "date-range") {
                    return true;
                }

                if (mealPlanFilter === "Flexi Dates Plan" && order.flexiblePlan.type === "flexi-dates") {
                    return true;
                }

                // For "Normal", filter orders based on the specific plan (7, 30, etc.)
                if (mealPlanFilter === "Normal" && order.flexiblePlan.type === "normal") {
                    return true;  // Matches all "Normal" type, no need to compare plan here
                }

                // For a specific "Normal" plan, compare with the filter value
                if (mealPlanFilter !== "Normal" && order.flexiblePlan.type === "normal") {
                    return `${order.flexiblePlan.plan} Days` === mealPlanFilter;
                }

                return false;

            });
        }

        // Time Filter
        if (timeFilter) {
            const currentDate = moment().local();
            filteredOrders = filteredOrders.filter((order) => {
                const orderDate = moment(order.time, "YYYY-MM-DD").local();
                switch (timeFilter) {
                    case "Today":
                        return orderDate.isSame(currentDate, "day");
                    case "This Week":
                        return orderDate.isSame(currentDate, "week");
                    case "This Month":
                        return orderDate.isSame(currentDate, "month");
                    default:
                        return true;
                }
            });
        }

        // Distance Sorting
        if (sortOrderByDistance) {
            filteredOrders = filteredOrders.sort((a, b) => {
                const distanceA = parseFloat(a.distance.replace(" KM", "").trim());
                const distanceB = parseFloat(b.distance.replace(" KM", "").trim());
                return sortOrderByDistance === "asc" ? distanceA - distanceB : distanceB - distanceA;
            });
        }

        // Distance Range Filter
        if (distanceRange) {
            filteredOrders = filteredOrders.filter((order) => {
                const distance = parseFloat(order.distance.replace(" KM", "").trim());
                switch (distanceRange) {
                    case "0-2":
                        return distance >= 0 && distance <= 2;
                    case "2-5":
                        return distance > 2 && distance <= 5;
                    case "5-10":
                        return distance > 5 && distance <= 10;
                    case "10-15":
                        return distance > 10 && distance <= 15;
                    case ">15":
                        return distance > 15;
                    default:
                        return true;
                }
            });
        }

        setRecentActivity(filteredOrders); // Update the filtered and sorted data
    };

    useEffect(() => {
        applyFiltersAndSorting();
    }, [mealTypeFilter, mealPlanFilter, timeFilter, sortOrderByDistance, distanceRange]);

    const handleMealPlanFilterChange = (e) => {
        setMealPlanFilter(e.target.value);
    };

    const handleMealTypeFilterChange = (e) => {
        setmealTypeFilter(e.target.value);
    };

    const handleTimeFilterChange = (e) => {
        setTimeFilter(e.target.value);
    };

    useEffect(() => {
        const filteredActivity = originalOrders.filter((order) => {
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

    const handleSortByDistance = (order) => {
        setSortOrderByDistance(order); // "asc" for ascending, "desc" for descending
    };

    const handleDistanceRangeChange = (range) => {
        setDistanceRange(range); // Update the state with the selected range
    };

    useEffect(() => {
        const filteredOrders = originalOrders.filter((order) => {
            const total = parseFloat(order.total.replace("$", "").trim());
            if (!totalRange) return true;

            const [min, max] = totalRange.split("-").map((val) => parseFloat(val));
            return total >= min && total <= max;
        });

        setRecentActivity(filteredOrders);
    }, [totalRange]);


    useEffect(() => {
        const filteredActivity = originalOrders.filter(
            (order) => !statusFilter || order.status === statusFilter
        );
        setRecentActivity(filteredActivity);
    }, [statusFilter]);
    return (
        <div className="flex gap-4 max-h-screen overflow-y-auto">
            {/* Orders Table */}
            <div className="bg-white rounded shadow p-4 w-[65%]">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Orders</h2>
                    <div className="space-x-2">
                        <select
                            className="text-xs border border-gray-300 rounded px-2 py-1 cursor-pointer"
                            value={mealPlanFilter}
                            onChange={handleMealPlanFilterChange}
                        >
                            <option value="">All Meal Plans</option>
                            {uniqueMealPlans.map((plan, index) => (
                                <option key={index} value={plan}>
                                    {plan}
                                </option>
                            ))}
                        </select>

                        {/* Time Filter */}
                        <select
                            className="text-xs border border-gray-300 rounded px-2 py-1 cursor-pointer"
                            value={timeFilter}
                            onChange={handleTimeFilterChange}
                        >
                            <option value="">All Time</option>
                            <option value="Today">Today</option>
                            <option value="This Week">This Week</option>
                            <option value="This Month">This Month</option>
                        </select>

                        {bulkActionOrders.length > 0 && (
                            <button
                                onClick={applyBulkAction}
                                className="px-2 py-2 bg-blue-500 text-white rounded text-xs"
                            >
                                Apply {bulkActionType}
                            </button>
                        )}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm table-fixed border">
                        <thead>

                            <tr className="text-gray-500 border-b border-gray-400">

                                <th className="py-2 px-2 text-center border-r w-1/6">
                                    <span className="">MealTypes</span>
                                </th>
                                <th className="py-2 px-2 text-center border-r w-1/6">
                                    <span>Customer</span>
                                </th>
                                <th className="py-2 px-2 text-center border-r w-24">
                                    <div className="">
                                        <select
                                            className="text-sm border border-gray-300 rounded px-2 py-1 cursor-pointer w-20"
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

                                    </div>
                                </th>
                                <th className="px-2 py-2 text-center border-r w-1/6">
                                    Status
                                </th>
                                <th className="px-2 py-2 text-center border-r">
                                    Actions
                                </th>
                                <th className="border-r text-center py-2 flex gap-1 items-center justify-center">
                                    <span>Distance</span>
                                    <div className="flex items-center justify-center">
                                        <button
                                            onClick={() => handleSortByDistance("asc")}
                                            className="text-gray-600 hover:text-gray-800"
                                            aria-label="Sort Ascending"
                                        >
                                            ↑
                                        </button>
                                        <button
                                            onClick={() => handleSortByDistance("desc")}
                                            className="text-gray-600 hover:text-gray-800"
                                            aria-label="Sort Descending"
                                        >
                                            ↓
                                        </button>
                                    </div>
                                </th>
                            </tr>
                            <tr className="text-gray-500 border-b">
                                <th className="py-1 text-center border-r w-1/6">
                                    <select
                                        className="text-xs border border-gray-300 rounded px-1 py-1 cursor-pointer w-full"
                                        value={mealTypeFilter}
                                        onChange={handleMealTypeFilterChange}
                                    >
                                        <option className="text-xs" value="">MealTypes</option>
                                        {[...new Set(originalOrders.map(order => order.mealType))].map(mealType => (
                                            <option key={mealType} value={mealType}>{mealType}</option>
                                        ))}
                                    </select>

                                </th>
                                <th className="py-1 text-center border-r w-1/6">
                                    <input
                                        placeholder="Filter Customer"
                                        value={filters.customer}
                                        onChange={(e) => handleFilterChange("customer", e.target.value)}
                                        className="mt-1 text-xs border border-gray-400 rounded-sm py-1 px-1 w-full"
                                    />
                                </th>
                                <th className="py-1 text-center border-r w-full">
                                    <input
                                        placeholder="Filter Total"
                                        value={filters.total}
                                        onChange={(e) => handleFilterChange("total", e.target.value)}
                                        className="mt-1 text-xs border border-gray-400 rounded-sm py-1 px-2 w-full"
                                    />

                                </th>
                                <th className="py-1 text-center border-r w-1/6">
                                    <select
                                        className="text-xs border border-gray-300 rounded px-1 py-1 cursor-pointer w-full"
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                    >
                                        <option value="" className="text-xs">Status</option>
                                        <option className="text-yellow-800 text-xs" value="New Order">New Order</option>
                                        <option className="text-blue-800 text-xs" value="Processing">Processing</option>
                                        <option className="text-green-800 text-xs" value="Plan Completed">PlanCompleted</option>
                                        <option className="text-red-800 text-xs" value="Rejected">Rejected</option>
                                    </select>
                                </th>
                                <th className="py-1 text-center border-r">
                                    <select
                                        className="text-xs border border-gray-300 rounded px-1 py-1 cursor-pointer w-full"
                                        onChange={(e) => triggerBulkAction(e.target.value)}
                                    >
                                        <option value="" className="text-xs">Actions</option>
                                        <option className="text-yellow-800 text-xs" value="All Accept">Accept All</option>
                                        <option className="text-red-800 text-xs" value="All Reject">Reject All</option>
                                        <option className="text-green-800 text-xs" value="Delivered All">Mark Delivered</option>
                                    </select>
                                </th>
                                <th className="py-1 border-r text-center">
                                    <select
                                        className="text-xs border border-gray-300 rounded px-1 py-1 cursor-pointer w-full"
                                        value={distanceRange}
                                        onChange={(e) => handleDistanceRangeChange(e.target.value)}
                                    >
                                        <option value="" className="text-xs">Distance Range</option>
                                        <option value="0-2" className="text-xs">0-2 km</option>
                                        <option value="2-5" className="text-xs">2-5 km</option>
                                        <option value="5-10" className="text-xs">5-10 km</option>
                                        <option value="10-15" className="text-xs">10-15 km</option>
                                        <option value=">15" className="text-xs">Above 15 km</option>
                                    </select>
                                </th>

                            </tr>

                        </thead>

                        <tbody>
                            {recentActivity.map((order) => (
                                <tr
                                    key={order._id}
                                    className={`border-b last:border-0 cursor-pointer ${selectedOrder._id === order._id ? "bg-gray-100" : ""}`}
                                    onClick={() => setSelectedOrder(order)}
                                >
                                    <td className="py-2 px-2 border-r text-center text-xs">{order.mealType}</td>
                                    <td className="py-2 px-2 border-r text-center text-xs">{order.customer}</td>
                                    <td className="py-2 px-2 border-r text-center text-xs">{order.total}</td>
                                    <td className="py-2 px-2 border-r text-center text-xs">
                                        <span
                                            className={`text-[10px] font-semibold px-2 py-1 rounded ${order.status === "New Order"
                                                ? " text-yellow-500"
                                                : order.status === "Plan Completed"
                                                    ? " text-green-500"
                                                    : order.status === "Processing"
                                                        ? " text-blue-500"
                                                        : " text-red-500"
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    {bulkActionOrders.some((o) => o._id === order._id) ? (
                                        <td className="py-2 px-2 border-r text-xs flex justify-center items-center">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    bulkActionOrders.find((o) => o._id === order._id)?.selected
                                                }
                                                onChange={(e) =>
                                                    setBulkActionOrders((prev) =>
                                                        prev.map((o) =>
                                                            o._id === order._id
                                                                ? { ...o, selected: e.target.checked }
                                                                : o
                                                        )
                                                    )
                                                }
                                            />
                                        </td>
                                    ) : (
                                        <td className="py-2 px-2 border-r text-xs relative">
                                            <div className="flex items-center gap-2 justify-center ">
                                                {order.status === "New Order" && (
                                                    <>
                                                        <span
                                                            className="text-green-500 cursor-pointer"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                statusChange(order._id, "Processing");
                                                            }}
                                                        >
                                                            <MdDone size={20} />
                                                        </span>
                                                        <span
                                                            className="text-red-500 cursor-pointer"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                statusChange(order._id, "Rejected");
                                                            }}
                                                        >
                                                            <MdOutlineCancel size={20} />
                                                        </span>
                                                    </>
                                                )}
                                            </div>

                                            {order.status === "Processing" && (
                                                <div className="flex justify-center items-center">
                                                    {order.subStatus.map((day) =>
                                                        moment(day.date).local().isSame(moment().local(), "day") ? ( // Show button only for today
                                                            <div key={day.date} className="flex items-center gap-2">
                                                                {day.status === "Not Delivered" && (
                                                                    <button
                                                                        onClick={() => updateSubStatus(order._id, day.date, "Delivered")}
                                                                        className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
                                                                    >
                                                                        Deliver
                                                                    </button>
                                                                )}
                                                                {day.status === "Delivered" && (
                                                                    <span className="text-green-500 text-xs font-semibold">Delivered</span>
                                                                )}
                                                            </div>
                                                        ) : null
                                                    )}

                                                </div>
                                            )}
                                        </td>
                                    )}

                                    <td className="py-2 px-2 border-r text-center text-xs">{order.distance}</td>
                                </tr>
                            ))}
                            <div className="">
                                {/* Reason box */}
                                {!showReasonBox && (
                                    <div className="z-20 rounded-md shadow-md absolute bg-gray-50 top-1/2 left-[62%] p-4 w-[20%]">
                                        <h4 className="text-sm font-semibold pb-1 text-red-500">Reason for Rejection</h4>
                                        <textarea
                                            className="w-full border rounded p-2 resize-none "
                                            rows="2"
                                            placeholder="Enter reason here..."
                                            value={reason}
                                            onChange={(e) => setReason(e.target.value)}
                                        />
                                        <div className="flex justify-end gap-2 mt-2">
                                            <button
                                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
                                                onClick={handleSend}
                                            >
                                                Send
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
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
