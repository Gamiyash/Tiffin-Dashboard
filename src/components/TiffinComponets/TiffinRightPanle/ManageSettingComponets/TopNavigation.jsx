// // TabNavigation.js
// import React from 'react';
// import { FaClock, FaCalendarAlt, FaCog } from 'react-icons/fa';

// function TabNavigation({ activeTab, setActiveTab }) {
//   return (
//     <div className="border-b border-gray-200">
//       <div className="grid grid-cols-3 gap-4">
//         <button
//           type="button"
//           onClick={() => setActiveTab('timing')}
//           className={`flex items-center justify-center py-2 ${activeTab === 'timing' ? 'border-b-2 border-blue-500' : ''}`}
//         >
//           <FaClock className="w-4 h-4 mr-2" /> Timing
//         </button>
//         <button
//           type="button"
//           onClick={() => setActiveTab('closure')}
//           className={`flex items-center justify-center py-2 ${activeTab === 'closure' ? 'border-b-2 border-blue-500' : ''}`}
//         >
//           <FaCalendarAlt className="w-4 h-4 mr-2" /> Closure Days
//         </button>
//         <button
//           type="button"
//           onClick={() => setActiveTab('additional')}
//           className={`flex items-center justify-center py-2 ${activeTab === 'additional' ? 'border-b-2 border-blue-500' : ''}`}
//         >
//           <FaCog className="w-4 h-4 mr-2" /> Additional
//         </button>
//       </div>
//     </div>
//   );
// }

// export default TabNavigation;

import React from 'react';
import { FaClock, FaCalendarAlt, FaCog } from 'react-icons/fa';

function TabNavigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'timing', label: 'Timing', icon: FaClock },
    { id: 'closure', label: 'Closure Days', icon: FaCalendarAlt },
    { id: 'additional', label: 'Additional', icon: FaCog },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`
              ${activeTab === id
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              focus:outline-none focus:text-red-800 focus:border-red-700
              transition duration-150 ease-in-out
            `}
          >
            <div className="flex items-center space-x-2">
              <Icon className={`w-5 h-5 ${activeTab === id ? 'text-red-500' : 'text-gray-400'}`} />
              <span>{label}</span>
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default TabNavigation;

