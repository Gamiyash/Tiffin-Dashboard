import React, { useState, useEffect } from 'react';
import { FaRegBell } from "react-icons/fa";
import moment from 'moment';
import axios from 'axios';

const TodayOrdersSummary = () => {
    const [showPendingOrders, setShowPendingOrders] = useState(false);
    const [orders, setorders] = useState([]);
    const today = moment().local().startOf('day');

    useEffect(() => {
        const getOrders = async () => {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getOrders`);
            setorders(response.data);
            console.log("TotalOrders:", response.data)
        }

        getOrders();
    }, []);

    // Get processing orders that need delivery today
    const processingOrders = orders.filter(order => {
        if (order.status !== 'Processing') return false;

        // Check if today is a delivery day based on plan type
        if (order.flexiblePlan.type === 'normal') {
            const startDate = moment(order.startDate).local();
            const endDate = moment(order.startDate).local().add(parseInt(order.flexiblePlan.plan, 10), 'days');
            return today.isBetween(startDate, endDate, 'day', '[]');
        }
        else if (order.flexiblePlan.type === 'date-range') {
            const startDate = moment(order.flexiblePlan.startDate).local();
            const endDate = moment(order.flexiblePlan.endDate).local();
            return today.isBetween(startDate, endDate, 'day', '[]');
        }
        else if (order.flexiblePlan.type === 'flexi-dates') {
            return order.flexiblePlan.flexiDates.some(date =>
                moment(date).local().isSame(today, 'day')
            );
        }
        return false;

    });


    // Get new orders that need delivery today but aren't accepted yet
    const pendingOrders = orders.filter(order => {
        if (order.status !== 'New Order') return false;

        if (order.flexiblePlan.type === 'normal') {
            const startDate = moment(order.startDate).local();
            const endDate = moment(order.startDate).local().add(parseInt(order.flexiblePlan.plan, 10), 'days');
            return today.isBetween(startDate, endDate, 'day', '[]');
        }
        else if (order.flexiblePlan.type === 'date-range') {
            const startDate = moment(order.flexiblePlan.startDate).local();
            const endDate = moment(order.flexiblePlan.endDate).local();
            return today.isBetween(startDate, endDate, 'day', '[]');
        }
        else if (order.flexiblePlan.type === 'flexi-dates') {
            return order.flexiblePlan.flexiDates.some(date =>
                moment(date).local().isSame(today, 'day')
            );
        }
        return false;
    });

    const mealTypeCounts = processingOrders.reduce((acc, order) => {
        if (!acc[order.mealType]) {
          acc[order.mealType] = 0;
        }
        acc[order.mealType] += order.quantity;
        return acc;
      }, {});


    const pendingMealTypeCounts = pendingOrders.reduce((acc, order) => {
        if (!acc[order.mealType]) {
            acc[order.mealType] = 0;
          }
          acc[order.mealType] += order.quantity;
          return acc;
        }, {});

    return (
        <div className="w-1/2 max-h-[50vh] overflow-y-auto p-4 bg-white mb-5 rounded-md">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="text-lg font-bold text-gray-700">Today's Orders Summary</div>
                {pendingOrders.length > 0 && (
                    <button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() => setShowPendingOrders(!showPendingOrders)}
                    >
                        <FaRegBell className="h-4 w-4" />
                        <span className="text-sm">
                            {pendingOrders.length} Not Accepted
                        </span>
                    </button>
                )}
            </div>
            <div>
                <div className="space-y-4">
                    {/* Processing Orders */}
                    <div>
                        <h3 className="text-sm font-semibold mb-2">
                        Meals to Prepare & Total ({processingOrders.length}) Orders to Deliver Today
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            {Object.entries(mealTypeCounts).map(([mealType, count]) => (
                                <div key={mealType} className="flex justify-between items-center p-2 bg-blue-50 rounded">
                                    <span className="text-sm">{mealType}</span>
                                    <span className="font-semibold text-blue-600">{count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pending Orders */}
                    {showPendingOrders && pendingOrders.length > 0 && (
                        <div>
                            <h3 className="text-sm font-semibold mb-2 text-yellow-600">
                                Not Accepted Orders for Today ({pendingOrders.length} total)
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                                {Object.entries(pendingMealTypeCounts).map(([mealType, count]) => (
                                    <div key={mealType} className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                                        <span className="text-sm">{mealType}</span>
                                        <span className="font-semibold text-yellow-600">{count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TodayOrdersSummary;