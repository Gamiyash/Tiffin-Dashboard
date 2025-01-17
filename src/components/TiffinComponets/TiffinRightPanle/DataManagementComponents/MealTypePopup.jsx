// // import React from "react";

// // const MealTypePopup = ({ editingItem, plans, setEditingItem, handleSave, closePopup }) => {
// //   return (
// //     <div className="fixed inset-0 flex items-center justify-center my-auto bg-gray-800 bg-opacity-50 pt-20">
// //       <div className="bg-white p-6 rounded shadow w-[70vw] md:w-[40vw] max-h-[80vh] overflow-auto">
// //         <h3 className="text-lg font-semibold mb-4">Meal Type</h3>
// //         <div className="mb-4">
// //           <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
// //           <input
// //             type="text"
// //             value={editingItem.label}
// //             onChange={(e) => setEditingItem({ ...editingItem, label: e.target.value })}
// //             className="w-full p-2 border border-gray-300 rounded"
// //           />
// //         </div>
// //         <div className="mb-4">
// //           <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
// //           <textarea
// //             value={editingItem.description}
// //             onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
// //             className="w-full p-2 border border-gray-300 rounded"
// //           ></textarea>
// //         </div>
// //         <div className="mb-4">
// //           <label className="block text-sm font-medium text-gray-700 mb-1">Price for each plan</label>
// //           <div className="grid grid-cols-2 gap-2">
// //             {plans.map((plan) => (
// //               <div key={plan._id} className="flex items-center gap-2 mb-3">
// //                 <span className="text-sm w-fit">{plan.label}</span>
// //                 <input
// //                   type="number"
// //                   value={editingItem.prices[plan._id]}
// //                   onChange={(e) => {
// //                     const updatedPrices = { ...editingItem.prices, [plan._id]: e.target.value };
// //                     setEditingItem({ ...editingItem, prices: updatedPrices });
// //                   }}
// //                   className="w-full p-2 border border-gray-300 rounded"
// //                 />
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //         <div className="flex gap-4">
// //           <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
// //           <button onClick={closePopup} className="px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancel</button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MealTypePopup;

// // import React from "react";

// // const MealTypePopup = ({ editingItem, plans, setEditingItem, handleSave, closePopup }) => {
// //   return (
// //     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
// //       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-[90vw] md:w-[40vw]  max-h-[90vh] overflow-auto">
// //         <div className="p-6 space-y-6">
// //           <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Meal Type</h3>
// //           <div className="space-y-4">
// //             <div>
// //               <label htmlFor="label" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Label</label>
// //               <input
// //                 id="label"
// //                 type="text"
// //                 value={editingItem.label}
// //                 onChange={(e) => setEditingItem({ ...editingItem, label: e.target.value })}
// //                 className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
// //               />
// //             </div>
// //             <div>
// //               <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
// //               <textarea
// //                 id="description"
// //                 value={editingItem.description}
// //                 onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
// //                 className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white h-24 resize-none"
// //               ></textarea>
// //             </div>
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Price for each plan</label>
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 {plans.map((plan) => (
// //                   <div key={plan._id} className="flex items-center space-x-3">
// //                     <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-1/3">{plan.label}</span>
// //                     <input
// //                       type="number"
// //                       value={editingItem.prices[plan._id]}
// //                       onChange={(e) => {
// //                         const updatedPrices = { ...editingItem.prices, [plan._id]: e.target.value };
// //                         setEditingItem({ ...editingItem, prices: updatedPrices });
// //                       }}
// //                       className="w-2/3 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
// //                     />
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //         <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end space-x-4">
// //           <button
// //             onClick={closePopup}
// //             className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             onClick={handleSave}
// //             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           >
// //             Save
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MealTypePopup;

// import React, { useState } from "react";

// const MealTypePopup = ({ editingItem, plans, setEditingItem, handleSave, closePopup }) => {
//   const [applyTo, setApplyTo] = useState("all"); // 'all' or 'specific'
//   const [selectedPlans, setSelectedPlans] = useState([]);

//   const handleCheckboxChange = (_id) => {
//     if (selectedPlans.includes(_id)) {
//       setSelectedPlans(selectedPlans.filter((id) => id !== _id));
//     } else {
//       setSelectedPlans([...selectedPlans, _id]);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-[90vw] md:w-[40vw] max-h-[90vh] overflow-auto">
//         <div className="p-6 space-y-6">
//           <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Meal Type</h3>
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="label" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Label
//               </label>
//               <input
//                 id="label"
//                 type="text"
//                 value={editingItem.label}
//                 onChange={(e) => setEditingItem({ ...editingItem, label: e.target.value })}
//                 className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
//               />
//             </div>
//             <div>
//               <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Description
//               </label>
//               <textarea
//                 id="description"
//                 value={editingItem.description}
//                 onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
//                 className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white h-24 resize-none"
//               ></textarea>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Meal Plan</label>
//               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
//                 <label className="flex items-center">
//                   <input
//                     type="radio"
//                     name="applyTo"
//                     value="all"
//                     checked={applyTo === "all"}
//                     onChange={() => {
//                       setApplyTo("all");
//                       setEditingItem({ ...editingItem, plans: "all" });
//                     }}
//                     className="mr-2 text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
//                   />
//                   <span className="text-gray-700 dark:text-gray-300">All Meal Plans</span>
//                 </label>
//                 <label className="flex items-center">
//                   <input
//                     type="radio"
//                     name="applyTo"
//                     value="specific"
//                     checked={applyTo === "specific"}
//                     onChange={() => {
//                       setApplyTo("specific");
//                       setEditingItem({ ...editingItem, plans: [] });
//                     }}
//                     className="mr-2 text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
//                   />
//                   <span className="text-gray-700 dark:text-gray-300">Specific Meal Plans</span>
//                 </label>
//               </div>
//             </div>
//             {applyTo === "specific" && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Specific Plans</label>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                   {plans.map((plan) => (
//                     <label key={plan._id} className="flex items-center">
//                       <input
//                         type="checkbox"
//                         value={plan._id}
//                         checked={selectedPlans.includes(plan._id)}
//                         onChange={() => handleCheckboxChange(plan._id)}
//                         className="mr-2 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
//                       />
//                       <span className="text-gray-700 dark:text-gray-300">{plan.label}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end space-x-4">
//           <button
//             onClick={closePopup}
//             className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => handleSave({ ...editingItem, selectedPlans })}
//             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MealTypePopup;

import React, { useState, useEffect } from "react";
import axios from "axios";


const predefinedMealTypeLabels = [
  "Basic Combo",
  "Premium Combo",
  "Deluxe Combo",
  "Light Meal",
  "Protein Boost",
  "Kids Meal",
  "Vegan Combo",
];

const MealTypePopup = ({ editingItem, setEditingItem, closePopup, refreshData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [applyTo, setApplyTo] = useState("all");
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [prices, setPrices] = useState({});
  const [Plans, setPlans] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState(predefinedMealTypeLabels);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const mapMealPlans = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/menu`);
      setPlans(response.data.plans)
      // console.log("The Plans is:", response.data.plans)
    }
    mapMealPlans()
  }, [])

  if (!editingItem) {
    return null; // Prevent rendering if editingItem is undefined
  }

  useEffect(() => {
    if (editingItem) {
      console.log("editing item plans (array):", editingItem.specificPlans);
      console.log("Plans (object array):", Plans);
  
      // Get all plan labels from Plans objects
      const allPlanLabels = Plans.map(plan => plan.label);
      
      // Check if specificPlans array contains all plan labels
      const hasAllPlans = editingItem.specificPlans && 
        Array.isArray(editingItem.specificPlans) &&
        editingItem.specificPlans.length === allPlanLabels.length &&
        editingItem.specificPlans.every(plan => allPlanLabels.includes(plan));
  
      // Set applyTo to "all" if all plans are selected, otherwise "specific"
      setApplyTo(hasAllPlans ? "all" : "specific");
  
      // Set selectedPlans from the specificPlans array
      setSelectedPlans(editingItem.specificPlans || []);
    }
  }, [editingItem, Plans]);


  // Modified to store labels instead of IDs
  const handleCheckboxChange = (plan) => {
    if (selectedPlans.includes(plan.label)) {
      setSelectedPlans(selectedPlans.filter((label) => label !== plan.label));
    } else {
      setSelectedPlans([...selectedPlans, plan.label]);
    }
  };


  const handlePriceChange = (_id, value) => {
    setPrices({
      ...prices,
      [_id]: value
    });
  };


  const handleSave = async () => {
    if (!editingItem.label?.trim() || !editingItem.description?.trim()) {
      setError("Label and description are required");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      if (editingItem.mealTypeId) {
        // Edit Meal Type
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/edit-meal-type/${editingItem.mealTypeId}`, {
          label: editingItem.label,
          description: editingItem.description,
          prices: editingItem.prices,
          applyTo,
          selectedPlans: applyTo === "all" ? Plans.map(plan => plan.label) : selectedPlans,
        });

      } else {
        // Add Meal Type
        const mealTypeResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/add-meal-type`, {
          label: editingItem.label,
          description: editingItem.description,
          prices: editingItem.prices,
        });

        const newMealTypeId = mealTypeResponse.data.tiffin.menu.mealTypes.slice(-1)[0].mealTypeId;

        const planData = {
          mealTypeId: newMealTypeId,
          applyTo,
          selectedPlans: applyTo === "all" ? Plans.map(plan => plan.label) : selectedPlans,
        };

        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/apply-meal-plans`, planData);
      }

      if (refreshData) {
        await refreshData();
      }
      closePopup();
    } catch (err) {
      console.error("Error details:", err);
      setError(err.response?.data?.message || "Error saving meal type");
    } finally {
      setIsLoading(false);
    }
  };
  const handleMealTypeInputChange = (e) => {
    const inputValue = e.target.value;
    setEditingItem({ ...editingItem, label: inputValue });

    // Filter suggestions based on the input
    const filtered = predefinedMealTypeLabels.filter((label) =>
      label.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredSuggestions(filtered);

    // Show the dropdown if input is not empty
    setShowSuggestions(inputValue.trim() !== "");
  };

  // Handle selecting a suggestion from the dropdown
  const handleSuggestionClick = (suggestion) => {
    setEditingItem({ ...editingItem, label: suggestion });
    setShowSuggestions(false);
  };

  // Handle adding a new suggestion to the predefined list
  const addNewSuggestion = () => {
    if (
      editingItem.label.trim() &&
      !predefinedMealTypeLabels.includes(editingItem.label.trim())
    ) {
      predefinedMealTypeLabels.push(editingItem.label.trim());
      setFilteredSuggestions(predefinedMealTypeLabels);
    }
    setShowSuggestions(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-[90vw] md:w-[40vw] max-h-[90vh] overflow-auto">
        <div className="p-6 space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {editingItem.mealTypeId ? "Edit Meal Type" : "Add New Meal Type"}
          </h3>

          <div className="space-y-4">
            {/* <div>
              <label htmlFor="label" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Label
              </label>
              <input
                id="label"
                type="text"
                value={editingItem.label || ""}
                onChange={(e) => setEditingItem({ ...editingItem, label: e.target.value })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div> */}

            <div>
              <label htmlFor="mealType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Meal Type
              </label>
              <input
                id="mealType"
                type="text"
                value={editingItem.label || ""}
                onChange={handleMealTypeInputChange}
                onFocus={() => setShowSuggestions(true)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Enter or select a meal type"
              />

              {/* Suggestions Dropdown */}
              {showSuggestions && (
                <ul className="mt-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 max-h-40 overflow-y-auto">
                  {filteredSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600"
                    >
                      {suggestion}
                    </li>
                  ))}
                  {/* Option to add a new suggestion */}
                  {editingItem.label.trim() && !filteredSuggestions.includes(editingItem.label) && (
                    <li
                      onClick={addNewSuggestion}
                      className="px-4 py-2 cursor-pointer text-blue-600 hover:underline"
                    >
                      Add "{editingItem.label}"
                    </li>
                  )}
                </ul>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Meal Details
              </label>
              <textarea
                id="description"
                placeholder="eg.,4 Roti • 1 Veg (12 Oz)/Non-Veg (12 Oz)"
                value={editingItem.description || ""}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                className="text-sm w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white h-24 resize-none"
              />
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Price for each plan</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Plans.map((plan) => (
                  <div key={plan._id} className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-1/3">{plan.label}</span>
                    <input
                      type="number"
                      value={editingItem.prices[plan._id]}
                      onChange={(e) => {
                        const updatedPrices = { ...editingItem.prices, [plan._id]: e.target.value };
                        setEditingItem({ ...editingItem, prices: updatedPrices });
                      }}
                      className="w-2/3 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Apply to Plans
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="applyTo"
                      value="all"
                      checked={applyTo === "all"}
                      onChange={() => setApplyTo("all")}
                      className="mr-2 text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
                    />
                    <span className="text-gray-700 dark:text-gray-300">All Plans</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="applyTo"
                      value="specific"
                      checked={applyTo === "specific"}
                      onChange={() => setApplyTo("specific")}
                      className="mr-2 text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Specific Plans</span>
                  </label>
                </div>
              </div>

              {applyTo === "specific" && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Select Plans
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {Plans.map((plan) => (
                      <label key={plan.label} className="flex items-center">
                        <input
                          type="checkbox"
                          value={plan.label}
                          checked={selectedPlans.includes(plan.label)}
                          onChange={() => handleCheckboxChange(plan)}
                          className="mr-2 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
                        />
                        <span className="text-gray-700 dark:text-gray-300">{plan.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              {error && (
                <div className="text-red-500 text-sm">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end space-x-4">
          <button
            onClick={closePopup}
            disabled={isLoading}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Saving...
              </>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealTypePopup;