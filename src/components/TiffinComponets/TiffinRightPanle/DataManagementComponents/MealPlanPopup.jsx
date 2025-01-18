import React, { useState } from "react";
import axios from "axios";

const predefinedPlans = [
  "Trial (1Day)",
  "Week",
  "1 Month",
  "15 Days",
];

const MealPlanPopup = ({ editingItem, setEditingItem, closePopup, refreshData, plans = [] }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState(predefinedPlans);

  const checkForDuplicates = () => {
    const editingPlanId = editingItem._id
    // Check for duplicates in mealTypes & Details Both
    const duplicatePlan = plans.some(
      (plan) =>
        plan._id !== editingPlanId &&
        plan.label.toLowerCase() === editingItem.label.trim().toLowerCase()
    );
    return duplicatePlan;
  };

  const handleSave = async () => {

    if (checkForDuplicates()) {
      setError("The plan is already exist please enter different plan");
      return
    }

    if (!editingItem.label?.trim()) {
      setError("Plan label is required");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      if (editingItem._id) {
        console.log("editingItem._id", editingItem._id)
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/edit-meal-plan/${editingItem._id}`, {
          label: editingItem.label,
        });
      } else {
        console.log("editingItem._id", editingItem._id)
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/add-plan`, {
          label: editingItem.label
        });
      }

      if (refreshData) {
        await refreshData();
      }
      closePopup();
    } catch (err) {
      setError(err.response?.data?.message || "Error saving meal plan");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setEditingItem({ ...editingItem, label: inputValue });

    // Filter predefined suggestions based on input
    const filtered = predefinedPlans.filter((plan) =>
      plan.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredSuggestions(filtered);

    // Show dropdown only if input is not empty
    setShowSuggestions(inputValue.trim() !== "");
  };

  const handleSuggestionClick = (suggestion) => {
    setEditingItem({ ...editingItem, label: suggestion });
    setShowSuggestions(false);
  };

  const addNewSuggestion = () => {
    if (
      editingItem.label.trim() &&
      !predefinedPlans.includes(editingItem.label.trim())
    ) {
      predefinedPlans.push(editingItem.label.trim());
    }
    setShowSuggestions(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-[90vw] md:w-[40vw] max-h-[90vh] overflow-hidden">
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {editingItem._id ? "Edit Meal Plan" : "Add New Meal Plan"}
          </h3>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="label"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Plan Label
              </label>
              <input
                id="label"
                type="text"
                value={editingItem.label || ""}
                onChange={handleInputChange}
                onFocus={() => setShowSuggestions(true)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Enter or select a plan name"
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
                  {/* Add new suggestion */}
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

            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}
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

export default MealPlanPopup;
