// // TiffinSettings.js
// import React, { useState } from 'react';
// import TabNavigation from './TopNavigation';
// import { TimingTab, ClosureTab, AdditionalTab } from './TimingTabs';

// const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// export default function TiffinSettings() {
//   const [activeTab, setActiveTab] = useState('timing');
//   const [timings, setTimings] = useState(
//     daysOfWeek.reduce((acc, day) => ({
//       ...acc,
//       [day]: { open: '', close: '' }
//     }), {})
//   );
//   const [useMonday, setUseMonday] = useState(false);
//   const [closureDates, setClosureDates] = useState([]);
//   const [additionalSettings, setAdditionalSettings] = useState({
//     catering: false,
//     houseParty: false,
//     specialEvents: false,
//     freeDelivery: '',
//     deliveryDetails: '',
//     deliveryCity: '',
//     specialMealDay: '',
//     location: ''
//   });

//   const handleTimingChange = (day, type, value) => {
//     setTimings(prev => ({
//       ...prev,
//       [day]: { ...prev[day], [type]: value }
//     }));
//   };

//   const applyMondayTiming = () => {
//     if (useMonday) {
//       const mondayTiming = timings['Monday'];
//       setTimings(
//         daysOfWeek.reduce((acc, day) => ({
//           ...acc,
//           [day]: { ...mondayTiming }
//         }), {})
//       );
//     }
//   };

//   const handleClosureDateAdd = (date) => {
//     setClosureDates(prev => [...prev, date]);
//   };

//   const handleAdditionalSettingChange = (setting, value) => {
//     setAdditionalSettings(prev => ({
//       ...prev,
//       [setting]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Submitting settings:', { timings, closureDates, additionalSettings });
//   };

//   return (
//     <div className="container mx-auto p-4 max-w-4xl">
//       <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Tiffin Dashboard Settings</h1>
//       <form onSubmit={handleSubmit} className="space-y-8">
//         <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
//         {activeTab === 'timing' && (
//           <TimingTab
//             timings={timings}
//             handleTimingChange={handleTimingChange}
//             useMonday={useMonday}
//             setUseMonday={setUseMonday}
//             applyMondayTiming={applyMondayTiming}
//             daysOfWeek={daysOfWeek}
//           />
//         )}
        
//         {activeTab === 'closure' && (
//           <ClosureTab
//             closureDates={closureDates}
//             handleClosureDateAdd={handleClosureDateAdd}
//             setClosureDates={setClosureDates}
//           />
//         )}
        
//         {activeTab === 'additional' && (
//           <AdditionalTab
//             additionalSettings={additionalSettings}
//             handleAdditionalSettingChange={handleAdditionalSettingChange}
//           />
//         )}

//         <div className="flex justify-end">
//           <button
//             type="submit"
//             className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full sm:w-auto"
//           >
//             Save Settings
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

import React, { useState } from 'react';
import TabNavigation from './TopNavigation';
import { TimingTab, ClosureTab, AdditionalTab } from './TimingTabs';
import { FaSave } from 'react-icons/fa';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function TiffinSettings() {
  const [activeTab, setActiveTab] = useState('timing');
  const [timings, setTimings] = useState(
    daysOfWeek.reduce((acc, day) => ({
      ...acc,
      [day]: { open: '', close: '' }
    }), {})
  );
  const [useMonday, setUseMonday] = useState(false);
  const [closureDates, setClosureDates] = useState([]);
  const [additionalSettings, setAdditionalSettings] = useState({
    catering: false,
    houseParty: false,
    specialEvents: false,
    freeDelivery: '',
    deliveryDetails: '',
    deliveryCity: '',
    specialMealDay: '',
    location: ''
  });

  const handleTimingChange = (day, type, value) => {
    setTimings(prev => ({
      ...prev,
      [day]: { ...prev[day], [type]: value }
    }));
  };

  const applyMondayTiming = () => {
    if (useMonday) {
      const mondayTiming = timings['Monday'];
      setTimings(
        daysOfWeek.reduce((acc, day) => ({
          ...acc,
          [day]: { ...mondayTiming }
        }), {})
      );
    }
  };

  const handleClosureDateAdd = (date) => {
    setClosureDates(prev => [...prev, date]);
  };

  const handleAdditionalSettingChange = (setting, value) => {
    setAdditionalSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting settings:', { timings, closureDates, additionalSettings });
  };

  return (
    <div className="container mx-auto bg-gray-50">
      {/* <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Tiffin Dashboard Settings</h1> */}
      <form onSubmit={handleSubmit} className="space-y-3 bg-white rounded-lg shadow-lg p-6">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="mt-6">
          {activeTab === 'timing' && (
            <TimingTab
              timings={timings}
              handleTimingChange={handleTimingChange}
              useMonday={useMonday}
              setUseMonday={setUseMonday}
              applyMondayTiming={applyMondayTiming}
              daysOfWeek={daysOfWeek}
            />
          )}
          
          {activeTab === 'closure' && (
            <ClosureTab
              closureDates={closureDates}
              handleClosureDateAdd={handleClosureDateAdd}
              setClosureDates={setClosureDates}
            />
          )}
          
          {activeTab === 'additional' && (
            <AdditionalTab
              additionalSettings={additionalSettings}
              handleAdditionalSettingChange={handleAdditionalSettingChange}
            />
          )}
        </div>

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out flex items-center space-x-2"
          >
            <FaSave />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
