import React from 'react';
import { FaClock } from 'react-icons/fa';

function TimingInput({ day, openTime, closeTime, onOpenChange, onCloseChange }) {
  return (
    <div className="flex items-center space-x-2 p-2 bg-white rounded-md shadow-sm border border-gray-200 hover:border-blue-300 transition duration-150 ease-in-out">
      <label className="w-16 text-xs font-medium text-gray-700">{day}</label>
      <div className="flex items-center space-x-1">
        <label className='text-[12px]' htmlFor="">Open-Time</label>
        <div className="relative">
          <FaClock className="absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
          <input
            type="time"
            value={openTime}
            onChange={(e) => onOpenChange(e.target.value)}
            className="w-24 pl-5 pr-1 py-1 text-xs border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <span className="text-gray-500 text-xs">-</span>
        <label className='text-[12px]' htmlFor="">close-Time</label>
        <div className="relative">
          <FaClock className="absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
          <input
            type="time"
            value={closeTime}
            onChange={(e) => onCloseChange(e.target.value)}
            className="w-24 pl-5 pr-1 py-1 text-xs border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}

export default TimingInput;

