// // TimingTab.js
// import React from 'react';
// import TimingInput from './TimingInput';

// function TimingTab({ timings, handleTimingChange, useMonday, setUseMonday, applyMondayTiming, daysOfWeek }) {
//   return (
//     <div className="bg-white rounded-lg shadow p-6">
//       <h2 className="text-xl font-semibold mb-4">Operating Hours</h2>
//       <div className="space-y-4">
//         {daysOfWeek.map(day => (
//           <TimingInput
//             key={day}
//             day={day}
//             openTime={timings[day].open}
//             closeTime={timings[day].close}
//             onOpenChange={(value) => handleTimingChange(day, 'open', value)}
//             onCloseChange={(value) => handleTimingChange(day, 'close', value)}
//           />
//         ))}
//         <div className="flex items-center space-x-2 mt-4">
//           <input
//             type="checkbox"
//             id="useMonday"
//             checked={useMonday}
//             onChange={(e) => {
//               setUseMonday(e.target.checked);
//               if (e.checked) applyMondayTiming();
//             }}
//             className="rounded"
//           />
//           <label htmlFor="useMonday" className="font-medium text-gray-700">
//             Use Monday's timing for all days
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ClosureTab.js
// import DatePicker from './DatePicker';

// function ClosureTab({ closureDates, handleClosureDateAdd, setClosureDates }) {
//   return (
//     <div className="bg-white rounded-lg shadow p-6">
//       <h2 className="text-xl font-semibold mb-4">Service Closure Days</h2>
//       <div className="space-y-4">
//         <div className="flex items-center space-x-4">
//           <DatePicker onSelect={handleClosureDateAdd} />
//           <button
//             type="button"
//             onClick={() => setClosureDates([])}
//             className="px-4 py-2 border rounded-md hover:bg-gray-50"
//           >
//             Clear All
//           </button>
//         </div>
//         {closureDates.length > 0 && (
//           <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//             <h3 className="font-semibold text-gray-700 mb-2">Closed on:</h3>
//             <ul className="list-disc list-inside space-y-1">
//               {closureDates.map((date, index) => (
//                 <li key={index} className="text-gray-600">
//                   {date.toDateString()}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // AdditionalTab.js

// function AdditionalTab({ additionalSettings, handleAdditionalSettingChange }) {
//   return (
//     <div className="bg-white rounded-lg shadow p-6">
//       <h2 className="text-xl font-semibold mb-4">Additional Settings</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="space-y-2">
//           {['catering', 'houseParty', 'specialEvents'].map((service) => (
//             <div key={service} className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id={service}
//                 checked={additionalSettings[service]}
//                 onChange={(e) => handleAdditionalSettingChange(service, e.target.checked)}
//                 className="rounded"
//               />
//               <label htmlFor={service} className="font-medium text-gray-700">
//                 {service.charAt(0).toUpperCase() + service.slice(1).replace(/([A-Z])/g, ' $1')} Services
//               </label>
//             </div>
//           ))}
//         </div>
//         <div className="space-y-4">
//           {['freeDelivery', 'deliveryDetails', 'deliveryCity', 'specialMealDay', 'location'].map((field) => (
//             <div key={field}>
//               <label htmlFor={field} className="font-medium text-gray-700">
//                 {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
//               </label>
//               {field === 'deliveryDetails' ? (
//                 <textarea
//                   id={field}
//                   value={additionalSettings[field]}
//                   onChange={(e) => handleAdditionalSettingChange(field, e.target.value)}
//                   placeholder={`Enter ${field.toLowerCase().replace(/([A-Z])/g, ' $1')}...`}
//                   className="mt-1 w-full px-3 py-2 border rounded-md"
//                   rows="3"
//                 />
//               ) : (
//                 <input
//                   type="text"
//                   id={field}
//                   value={additionalSettings[field]}
//                   onChange={(e) => handleAdditionalSettingChange(field, e.target.value)}
//                   placeholder={`Enter ${field.toLowerCase().replace(/([A-Z])/g, ' $1')}...`}
//                   className="mt-1 w-full px-3 py-2 border rounded-md"
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export { TimingTab, ClosureTab, AdditionalTab };

import React from 'react';
import TimingInput from './TimingInput';
import DatePicker from './DatePicker';
import { FaCheck, FaTimes, FaUtensils, FaHome, FaGlassCheers, FaTruck, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

function TimingTab({ timings, handleTimingChange, useMonday, setUseMonday, applyMondayTiming, daysOfWeek }) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Operating Hours</h2>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
        {daysOfWeek.map(day => (
          <TimingInput
            key={day}
            day={day}
            openTime={timings[day].open}
            closeTime={timings[day].close}
            onOpenChange={(value) => handleTimingChange(day, 'open', value)}
            onCloseChange={(value) => handleTimingChange(day, 'close', value)}
          />
        ))}
       
      </div>
      <div className="flex items-center space-x-2 mt-4">
          <input
            type="checkbox"
            id="useMonday"
            checked={useMonday}
            onChange={(e) => {
              setUseMonday(e.target.checked);
              if (e.target.checked) applyMondayTiming();
            }}
            className="rounded text-blue-600 focus:ring-blue-500 h-3 w-3"
          />
          <label htmlFor="useMonday" className="font-medium text-gray-700 text-sm">
            Use Monday's timing for all days
          </label>
        </div>
    </div>
  );
}

function ClosureTab({ closureDates, handleClosureDateAdd, setClosureDates }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Service Closure Days</h2>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <DatePicker onSelect={handleClosureDateAdd} />
          <button
            type="button"
            onClick={() => setClosureDates([])}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out text-gray-700"
          >
            Clear All
          </button>
        </div>
        {closureDates.length > 0 && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-2">Closed on:</h3>
            <ul className="space-y-1">
              {closureDates.map((date, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <FaCalendarAlt className="mr-2 text-red-500" />
                  {date.toDateString()}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function AdditionalTab({ additionalSettings, handleAdditionalSettingChange }) {
  const checkboxItems = [
    { id: 'catering', label: 'Catering Services', icon: FaUtensils },
    { id: 'houseParty', label: 'House Party Services', icon: FaHome },
    { id: 'specialEvents', label: 'Special Events Services', icon: FaGlassCheers },
  ];

  const inputItems = [
    { id: 'freeDelivery', label: 'Free Delivery', icon: FaTruck, placeholder: 'E.g., Orders above ₹500' },
    { id: 'deliveryCity', label: 'Delivery City', icon: FaMapMarkerAlt, placeholder: 'Enter city name' },
    { id: 'specialMealDay', label: 'Special Meal Day', icon: FaCalendarAlt, placeholder: 'E.g., Sunday' },
    { id: 'location', label: 'Location', icon: FaMapMarkerAlt, placeholder: 'Enter your location' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">Additional Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          {checkboxItems.map(({ id, label, icon: Icon }) => (
            <div key={id} className="flex items-center space-x-2 bg-white p-2 rounded-md shadow-sm">
              <input
                type="checkbox"
                id={id}
                checked={additionalSettings[id]}
                onChange={(e) => handleAdditionalSettingChange(id, e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <label htmlFor={id} className="flex items-center space-x-2 text-sm text-gray-700">
                <Icon className="text-blu-500 w-4 h-4" />
                <span>{label}</span>
              </label>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {inputItems.map(({ id, label, icon: Icon, placeholder }) => (
            <div key={id} className="bg-white p-2 rounded-md shadow-sm">
              <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <div className="relative">
                <Icon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  id={id}
                  value={additionalSettings[id]}
                  onChange={(e) => handleAdditionalSettingChange(id, e.target.value)}
                  placeholder={placeholder}
                  className="w-full pl-8 pr-2 py-1 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="bg-white p-2 rounded-md shadow-sm">
        <label htmlFor="deliveryDetails" className="block text-sm font-medium text-gray-700 mb-1">
          Delivery Details
        </label>
        <textarea
          id="deliveryDetails"
          value={additionalSettings.deliveryDetails}
          onChange={(e) => handleAdditionalSettingChange('deliveryDetails', e.target.value)}
          placeholder="Enter delivery details..."
          className="w-full px-2 py-1 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          rows="2"
        />
      </div> */}
    </div>
  );
}

export { TimingTab, ClosureTab, AdditionalTab };

