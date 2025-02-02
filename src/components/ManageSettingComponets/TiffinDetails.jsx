
import { useState } from "react";
import { FaCircle } from "react-icons/fa"; // React Icons for radio buttons
import { FaSave } from 'react-icons/fa';
import axios from 'axios';

export default function TiffinDetails({ tiffinFormData, ontiffinFormDataChange }) {

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        ontiffinFormDataChange({
            ...tiffinFormData,
            [name]: value,
        });
    };

    const handleCategoryChange = (value) => {
        ontiffinFormDataChange({
            ...tiffinFormData,
            category: value,
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-3">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Tiffin Details</h2>
            {/* <form className="space-y-4"> */}
                <div className="flex items-center gap-2 w-full">
                    <div className="w-1/2">
                        <label htmlFor="email" className="block font-medium text-gray-700 text-sm">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={tiffinFormData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full py-1 px-2 border rounded-md text-sm"
                        />
                    </div>
                    <div className="w-1/2">
                        <label htmlFor="phone" className="block font-medium text-gray-700 text-sm">Phone</label>
                        <input
                            type="number"
                            id="phone"
                            name="phone"
                            value={tiffinFormData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full py-1 px-2 border rounded-md"
                        />
                    </div>
                </div>
                <div className="flex w-full gap-2">
                    <div className="w-1/2">
                        <label htmlFor="tiffinName" className="block font-medium text-gray-700 text-sm">Tiffin Name</label>
                        <input
                            type="text"
                            id="tiffinName"
                            name="tiffinName"
                            value={tiffinFormData.tiffinName}
                            onChange={handleInputChange}
                            required
                            className="w-full py-1 px-2 border rounded-md"
                        />
                    </div>
                    <div className="w-1/2">
                        <label htmlFor="address" className="block font-medium text-gray-700 text-sm">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={tiffinFormData.address}
                            onChange={handleInputChange}
                            required
                            className="w-full py-1 px-2 border rounded-md"
                        />
                    </div>
                </div>
                <div>
                    <label className="block font-medium text-gray-700 text-sm ">Category</label>
                    <div className="flex space-x-4">
                        {["veg", "non-veg", "both"].map((option) => (
                            <div key={option} className="flex items-center space-x-2 cursor-pointer" onClick={() => handleCategoryChange(option)}>
                                <FaCircle className={tiffinFormData.category === option ? "text-blue-600" : "text-gray-400"} />
                                <span>{option.charAt(0).toUpperCase() + option.slice(1)}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-end"> 
                </div>
        </div>
    );
}
