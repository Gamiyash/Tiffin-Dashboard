import React, { useState, useEffect } from "react";
import OrderDetails from "./OrderDetails";
import { MdDone } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";

const ManageOrders = () => {
    const initialRecentActivity = [
        {
            id: "#1423",
            customer: "John Doe",
            phone: "+1 (555) 123-4567",
            address: "123 Main St, Anytown, AN 12345",
            total: "$450",
            status: "Delivered",
            time: "10 mins ago",
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
            time: "20 mins ago",
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
            time: "30 mins ago",
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
            time: "45 mins ago",
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
            time: "1 hour ago",
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
            time: "15 mins ago",
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
            time: "5 mins ago",
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
            time: "50 mins ago",
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
    const [selectedOrder, setSelectedOrder] = useState(initialRecentActivity[0]); // Default to first order

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


    return (
        <div className="flex gap-4">
            {/* Orders Table */}
            <div className="bg-white rounded shadow p-4 w-[60%]">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Orders</h2>
                    <select
                        className="text-sm border border-gray-300 rounded px-2 py-1 cursor-pointer"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All Statuses</option>
                        <option className="text-yellow-800" value="New Order">New Order</option>
                        <option className="text-blue-800" value="Processing">Processing</option>
                        <option className="text-green-800" value="Delivered">Delivered</option>
                        <option className="text-red-800" value="Rejected">Rejected</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-gray-500 border-b">
                                <th className="py-2 px-2 text-left">Order ID</th>
                                <th className="py-2 px-2 text-left">Customer</th>
                                <th className="py-2 px-2 text-left">Total</th>
                                <th className="py-2 px-2 text-left">Status</th>
                                <th className="py-2 px-2 text-left"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentActivity.map((order) => (
                                <tr
                                    key={order.id}
                                    className={`border-b last:border-0 cursor-pointer ${selectedOrder.id === order.id ? "bg-gray-100" : ""
                                        }`}
                                    onClick={() => setSelectedOrder(order)}
                                >
                                    <td className="py-2 px-2">{order.id}</td>
                                    <td className="py-2 px-2">{order.customer}</td>
                                    <td className="py-2 px-2">{order.total}</td>
                                    <td className="py-2 px-2">
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
                                    <td className="py-2 flex items-center gap-2">
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
            <div className="w-[40%]">
                <OrderDetails order={selectedOrder} onStatusChange={statusChange} />
            </div>
        </div>
    );
};

export default ManageOrders;
