import React from "react";
import { FiPhone, FiMapPin, FiCalendar } from "react-icons/fi";

export default function OrderDetails({ order, onStatusChange }) {
    if (!order) return <div className="text-gray-500">Select an order to view details.</div>;

    const progressSteps = ["New Orders", "Processing", "Delivered"];

    return (
        <div className="bg-white shadow-md rounded-md p-4 w-full">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Order Details</h2>
                <span className="text-sm px-2 py-1 border rounded text-gray-700">{order.id}</span>
            </div>

            <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                    <img
                        src={order.avatar}
                        alt={order.customer}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h3 className="text-sm font-medium">{order.customer}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                        <FiPhone className="mr-2" />
                        {order.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                        <FiMapPin className="mr-2" />
                        {order.address}
                    </div>
                </div>
            </div>

            <hr className="my-4" />

            <div className="mb-4">
                <h4 className="text-sm font-semibold mb-1">Special Instructions</h4>
                <p className="text-sm text-gray-500">{order.specialInstructions}</p>
            </div>

            <hr className="my-4" />

            <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                <div>
                    <h4 className="font-semibold">Plan</h4>
                    <p className="text-gray-500">{order.plan}</p>
                </div>
                <div>
                    <h4 className="font-semibold">Meal Type</h4>
                    <p className="text-gray-500">{order.mealType}</p>
                </div>
                <div>
                    <h4 className="font-semibold">Quantity</h4>
                    <p className="text-gray-500">{order.quantity}</p>
                </div>
            </div>

            <hr className="my-4" />

            <div>
                <h4 className="text-sm font-semibold mb-2">Flexible Plan</h4>
                {order.flexiblePlan.type === "date-range" ? (
                    <div className="flex items-center text-sm text-gray-500">
                        <FiCalendar className="mr-2" />
                        {order.flexiblePlan.startDate.toLocaleDateString()} -{" "}
                        {order.flexiblePlan.endDate.toLocaleDateString()}
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {order.flexiblePlan.flexiDates.map((date, index) => (
                            <span
                                key={index}
                                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                            >
                                {date.toLocaleDateString()}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            {/* <div className="mb-3 mt-3">
                <h4 className="text-sm font-semibold mb-2">Change Order Status</h4>
                <select
                    className="text-sm border border-gray-300 rounded px-2 py-1 cursor-pointer"
                    value={order.status}
                    onChange={(e) => onStatusChange(order.id, e.target.value)}
                >
                    <option className="text-yellow-800" value="New Orders">New Orders</option>
                    <option className="text-blue-800" value="Processing">Processing</option>
                    <option className="text-green-800" value="Delivered">Delivered</option>
                    <option className="text-red-800" value="Cancelled">Cancelled</option>
                </select>
            </div> */}

            <div className="mb-4 mt-6">
                <div className="flex justify-between gap-4 items-center mb-2">
                    <h4 className="text-sm font-semibold">Order Progress</h4>
                    <div className="py-2 flex items-center gap-2">
                        {order.status === "New Order" && (
                            <span className="text-yellow-500  px-2 py-1">
                                New Order
                            </span>
                        )}
                        {order.status === "Processing" && (
                            <span className="text-blue-500  px-2 py-1">
                                Processing
                            </span>
                        )}
                        {order.status === "Rejected" && (
                            <span className="text-red-500  px-2 py-1">
                                Rejected
                            </span>
                        )}
                        {order.status === "Delivered" && (
                            <span className="text-green-500 px-2 py-1">
                                Delivered
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {progressSteps.map((step, index) => (
                        <div key={index} className="flex items-center">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${order.status === step
                                    ? "bg-blue-500"
                                    : progressSteps.indexOf(order.status) > index
                                        ? "bg-green-500"
                                        : "bg-gray-300"
                                    }`}
                            >
                                {index + 1}
                            </div>
                            {index < progressSteps.length - 1 && (
                                <div
                                    className={`h-1 w-10 ${progressSteps.indexOf(order.status) > index
                                        ? "bg-green-500"
                                        : "bg-gray-300"
                                        }`}
                                ></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Admin Actions */}
            <div className="mt-4">
                {order.status === "Processing" && (
                    <button
                        className="px-2 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition"
                        onClick={() => onStatusChange(order.id, "Delivered")}
                    >
                        Mark as Delivered
                    </button>
                )}
                {order.status === "New Order" && (
                    <button
                        className="px-2 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        onClick={() => onStatusChange(order.id, "Processing")}
                    >
                        Accept Order
                    </button>
                )}
            </div>
        </div>
    );
}
