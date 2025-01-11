// import React from 'react'

// const ManageService = () => {
//   const mealPlans = ["Trial (1 Day)", "Week", "Month"];
//   return (
//     <div className='w-[30vw]'>
//       <h1 className='text-2xl font-medium text-gray-700 mb-3'>Manage Tiffin Service</h1>
//       <div className="">
//         <h4 className="text-sm font-medium text-gray-700 mb-1">Meal Plans</h4>
//         {mealPlans.map((plan) => (
//           <div key={plan} className="flex items-center mb-2 w-full">
//             <input
//               type="checkbox"
//               id={plan}
//               checked={true}
//               readOnly
//               className="mr-2"
//             />
//             <label htmlFor={plan} className="text-gray-600">
//               {plan}
//             </label>
//           </div>
//         ))}
//       </div>
//       <div className='flex flex-col gap-1 mt-5'>
//         <label className='text-gray-600 font-medium text-sm' htmlFor="SetServiceDays">Describe Service Days (e.g., Mon-Fri, Mon-Wed, Daily)</label>
//         <input
//           type="text"
//           name='SetServiceDays'
//           placeholder='e.g.,Mon-Fri'
//           className='border border-gray-400 rounded-md px-2 py-2'
//         />
//       </div>

//       <div className='flex  items-center gap-2 mt-5'>
//         <label className='text-gray-600 font-medium text-sm' htmlFor="SetServiceFlexible">Set flexible start/end dates for orders (e.g,start:7/Jan/2025,End:10/Jan/2025).</label>
//         <input
//           type="radio"
//           name='SetServiceFlexble'
//         />
//       </div>

//     </div>
//   )
// }

// export default ManageService

import React, { useState } from 'react';

const mealPlans = [
  { id: 'trial', name: 'Trial (1 Day)' },
  { id: 'week', name: 'Week' },
  { id: 'month', name: 'Month' },
];

export default function ManageService() {
  const [selectedPlans, setSelectedPlans] = useState(mealPlans.map((plan) => plan.id));
  const [serviceDays, setServiceDays] = useState('');
  const [isFlexibleDates, setIsFlexibleDates] = useState(false);

  const handlePlanToggle = (planId) => {
    setSelectedPlans((prev) =>
      prev.includes(planId) ? prev.filter((id) => id !== planId) : [...prev, planId]
    );
  };

  return (
    <div className="w-[30vw]">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Manage Tiffin Service</h2>
        <p className="text-sm text-gray-600">
          Configure your meal plans and service options
        </p>
      </div>

      <div className="space-y-6">
        {/* Meal Plans */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-800">Meal Plans</h4>
          {mealPlans.map((plan) => (
            <div key={plan.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={plan.id}
                checked={true}
                onChange={() => handlePlanToggle(plan.id)}
                className=""
              />
              <label htmlFor={plan.id} className="text-sm text-gray-700">
                {plan.name}
              </label>
            </div>
          ))}
        </div>

        {/* Service Days */}
        <div className="space-y-2">
          <label htmlFor="serviceDays" className="text-sm font-medium text-gray-800">
            Service Days
          </label>
          <input
            id="serviceDays"
            type="text"
            placeholder="e.g., Mon-Fri"
            value={serviceDays}
            onChange={(e) => setServiceDays(e.target.value)}
            className="w-full px-3 py-2 border border-gray-400 rounded-md "
          />
          <p className="text-sm text-gray-500">
            Describe service days (e.g., Mon-Fri, Mon-Wed, Daily)
          </p>
        </div>

        {/* Flexible Dates */}
        <div className="flex items-center gap-3">
          <div
            className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer ${isFlexibleDates ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            onClick={() => setIsFlexibleDates(!isFlexibleDates)}
          >
            <span
              className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isFlexibleDates ? 'translate-x-6' : 'translate-x-1'
                }`}
            ></span>
          </div>
          <label htmlFor="flexibleDates" className="text-md font-medium text-gray-700">
            Set flexible start/end dates for orders
          </label>

        </div>
        {isFlexibleDates && (
          <p className="text-sm text-gray-500">
            User can now set custom start and end dates for each order (e.g., start:
            7/Jan/2025, End: 10/Jan/2025).
          </p>
        )}
      </div>
    </div>
  );
}
