// // DatePicker.js
// import React, { useState } from 'react';
// import { FaCalendarAlt } from 'react-icons/fa';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

// function DatePicker({ onSelect }) {
//   const [date, setDate] = useState(null);
//   const [showCalendar, setShowCalendar] = useState(false);

//   const handleSelect = (newDate) => {
//     setDate(newDate);
//     onSelect(newDate);
//     setShowCalendar(false);
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setShowCalendar(!showCalendar)}
//         className="flex items-center px-4 py-2 border rounded-md hover:bg-gray-50 w-[280px] justify-start text-left"
//       >
//         <FaCalendarAlt className="mr-2 h-4 w-4" />
//         {date ? date.toLocaleDateString() : "Pick a date"}
//       </button>
//       {showCalendar && (
//         <div className="absolute top-full mt-1 z-50 bg-white border rounded-md shadow-lg">
//           <Calendar
//             onChange={handleSelect}
//             value={date}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default DatePicker;

import React, { useState, useRef, useEffect } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function DatePicker({ onSelect }) {
  const [date, setDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  const handleSelect = (newDate) => {
    setDate(newDate);
    onSelect(newDate);
    setShowCalendar(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [calendarRef]);

  return (
    <div className="relative" ref={calendarRef}>
      <button
        onClick={() => setShowCalendar(!showCalendar)}
        className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out w-full sm:w-64 justify-between text-left"
      >
        <span className="text-gray-700">{date ? date.toLocaleDateString() : "Pick a date"}</span>
        <FaCalendarAlt className="text-gray-400" />
      </button>
      {showCalendar && (
        <div className="absolute top-full left-0 mt-1 z-50">
          <Calendar
            onChange={handleSelect}
            value={date}
            className="border border-gray-200 rounded-md shadow-lg"
          />
        </div>
      )}
    </div>
  );
}

export default DatePicker;
