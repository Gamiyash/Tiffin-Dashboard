import React from "react";
import { FiPhone, FiMapPin, FiCalendar } from "react-icons/fi";
import moment from "moment";

export default function OrderDetails({ order, onStatusChange }) {
    if (!order) return <div className="text-gray-500">Select an order to view details.</div>;

    const progressSteps = ["New Order", "Processing", "Delivered"];

    return (
        <div className="bg-white shadow-md rounded-md px-3 py-3 w-full overflow-hidden">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Order Details</h2>
                <div className="flex justify-between gap-4 items-center">
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
                        {order.status === "Plan Completed" && (
                            <span className="text-green-500 px-2 py-1">
                                Plan Completed
                            </span>
                        )}
                        {/* {

                            Array.isArray(order.subStatus) && order.subStatus.map((subStatusItem, index) => (
                                <div key={index} className="flex items-center justify-between mb-2">
                                    {subStatusItem.status === "Delivered" ? (
                                        <span className="text-green-500 px-2 py-1">Delivered</span>
                                    ) : (
                                        <span className="text-yellow-500 px-2 py-1">Pending</span>
                                    )}
                                </div>
                            ))
                        } */}
                    </div>
                </div>
                {/* <span className="text-xs px-2 py-1 border rounded text-gray-700">{order._id}</span> */}
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
                    <div className="flex items-center text-sm text-gray-500 gap-2">
                        <span>Id:</span>
                        <span className="">{order._id}</span>
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
                {/* <div>
                    <h4 className="font-semibold">Plan</h4>
                    <p className="text-gray-500">{order.plan}</p>
                </div> */}
                <div>
                    <h4 className="font-semibold">Meal Type</h4>
                    <p className="text-gray-500">{order.mealType}</p>
                </div>
                <div>
                    <h4 className="font-semibold">Quantity</h4>
                    <p className="text-gray-500">{order.quantity}</p>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold">Placed Time</span>
                    <span className="text-sm text-gray-500">{order.time}</span>
                </div>
            </div>

            <hr className="my-4" />
            <div className="flex justify-between items-center w-full">
                <div className="w-[70%]">
                    <h4 className="text-sm font-semibold mb-2">Plan</h4>
                    {
                        order.flexiblePlan && order.flexiblePlan.type === "date-range" ? (
                            <div className="flex items-center text-sm text-gray-500">
                                <FiCalendar className="mr-2" />
                                {order.flexiblePlan.startDate
                                    ? new Date(order.flexiblePlan.startDate).toLocaleDateString("en-GB")
                                    : "N/A"}{" "}
                                -{" "}
                                {order.flexiblePlan.endDate
                                    ? new Date(order.flexiblePlan.endDate).toLocaleDateString("en-GB")
                                    : "N/A"}
                            </div>
                        ) : order.flexiblePlan && order.flexiblePlan.type === "normal" ? (
                            <span className="text-sm text-gray-500">{order.flexiblePlan.plan}</span>
                        ) : order.flexiblePlan && Array.isArray(order.flexiblePlan.flexiDates) ? (
                            <div className="flex flex-wrap gap-2">
                                {order.flexiblePlan.flexiDates.map((date, index) => (
                                    <span
                                        key={index}
                                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                                    >
                                        {date ? new Date(date).toLocaleDateString("en-GB") : "Invalid Date"}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">No flexible plan available</p>
                        )
                    }

                </div>
                {/* <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold">Placed Time</span>
                    <span className="text-sm text-gray-500">{order.time}</span>
                </div> */}
            </div>
            <div className="">
                <div className="flex justify-between gap-4 items-center mt-3">
                    <h4 className="text-sm font-semibold mb-2">Order Progress</h4>
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
                        {order.subStatus === "Delivered" && (
                            <span className="text-green-500 px-2 py-1">
                                Delivered
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-0 ">
                    {progressSteps.map((step, index) => (
                        <div key={index} className="flex items-center">
                            <div className="flex flex-col items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${order.status === "Delivered" && step === "Delivered"
                                        ? "bg-green-400"
                                        : order.status === step
                                            ? "bg-blue-500"
                                            : progressSteps.indexOf(order.status) > index
                                                ? "bg-green-400"
                                                : "bg-gray-300"
                                        }`}
                                >
                                    {index + 1}
                                </div>
                                <div className="text-[10px] mt-1 text-gray-600 whitespace-nowrap">
                                    {step}
                                </div>
                            </div>
                            {index < progressSteps.length - 1 && (
                                <div className="flex flex-col">
                                    <div
                                        className={`h-1 w-10 mt-2 ${progressSteps.indexOf(order.status) > index
                                            ? "bg-green-400"
                                            : "bg-gray-300"
                                            }`}
                                    ></div>
                                    <div className="h-6" /> {/* Spacer for label alignment */}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="">
                {/* {order.status === "Processing" && (
                    <button
                        className="px-2 py-2 text-[10px] bg-green-400 text-white rounded hover:bg-green-500 transition"
                        onClick={() => onStatusChange(order._id, "Delivered")}
                    >
                        Mark as Delivered
                    </button>
                )} */}
                {order.status === "New Order" && (
                    <button
                        className="px-2 py-2 text-[10px] bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        onClick={() => onStatusChange(order._id, "Processing")}
                    >
                        Accept Order
                    </button>
                )}
            </div>
        </div >
    );
}
