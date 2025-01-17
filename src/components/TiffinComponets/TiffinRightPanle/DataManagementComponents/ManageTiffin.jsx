// import React, { useState } from "react";
// import { FiPlusCircle, FiTrash2 } from "react-icons/fi";
// import axios from "axios"
// import { FiEdit, FiCopy, FiX } from "react-icons/fi"

// const AddMeal = ({ mealTypes = [] }) => {
//     const [mealTypeData, setMealTypeData] = useState(mealTypes);
//     const [newMealType, setNewMealType] = useState({
//         label: "",
//         description: "",
//         prices: {},
//     });
//     const [customPlans, setCustomPlans] = useState([]);
//     const [newPlan, setNewPlan] = useState("");
//     const [serviceDays, setServiceDays] = useState("");
//     const [isFlexibleDates, setIsFlexibleDates] = useState(false);

//     // Handle Meal Type Changes
//     const handleMealTypeChange = (e) => {
//         const { name, value } = e.target;
//         if (customPlans.includes(name)) {
//             setNewMealType((prev) => ({
//                 ...prev,
//                 prices: { ...prev.prices, [name]: value },
//             }));
//         } else {
//             setNewMealType((prev) => ({ ...prev, [name]: value }));
//         }
//     };

//     // Add a New Meal Type
//     const handleAddMealType = () => {
//         if (newMealType.label && newMealType.description) {
//             const updatedMealType = {
//                 ...newMealType,
//                 prices: Object.fromEntries(
//                     customPlans.map((plan) => [plan, parseInt(newMealType.prices[plan]) || 0])
//                 ),
//                 mealTypeId: `custom-${mealTypeData.length + 1}`,
//             };

//             setMealTypeData((prev) => [...prev, updatedMealType]);
//             setNewMealType({ label: "", description: "", prices: {} });
//         }
//     };

//     // Add a New Plan
//     const handleAddPlan = () => {
//         if (newPlan.trim() && !customPlans.includes(newPlan)) {
//             setCustomPlans((prev) => [...prev, newPlan]);
//             setNewPlan("");
//         }
//     };

//     // const [newMealType, setNewMealType] = useState({
//     //     label: "",
//     //     description: "",
//     //     prices: {},
//     // });
//     // const [customPlans, setCustomPlans] = useState([]);
//     // const [newPlan, setNewPlan] = useState("");
//     // const [serviceDays, setServiceDays] = useState("");
//     // const [isFlexibleDates, setIsFlexibleDates] = useState(false);
//     const [showSuggestions, setShowSuggestions] = useState(false);
//     const [showServiceDaysSuggetions, setshowServiceDaysSuggetions] = useState(false);
//     const [showMelatypeSuggestions, setshowMelatypeSuggestions] = useState(false);

//     // const handleMealTypeChange = (e) => {
//     //     const { name, value } = e.target;
//     //     if (customPlans.includes(name)) {
//     //         setNewMealType((prev) => ({
//     //             ...prev,
//     //             prices: { ...prev.prices, [name]: value },
//     //         }));
//     //     } else {
//     //         setNewMealType((prev) => ({ ...prev, [name]: value }));
//     //     }
//     // };

//     // const handleAddMealType = async () => {
//     //     if (newMealType.label && newMealType.description) {
//     //         const payload = {
//     //             ...newMealType,
//     //             prices: Object.fromEntries(
//     //                 customPlans.map((plan) => [plan, parseInt(newMealType.prices[plan]) || 0])
//     //             ),
//     //             serviceDays,
//     //             isFlexibleDates,
//     //         };

//     //         try {
//     //             const response = await axios.post("http://localhost:3000/api/add-meal-type", payload);
//     //             setMealTypeData(response.data.menu.mealTypes);
//     //             setNewMealType({ label: "", description: "", prices: {} });
//     //         } catch (error) {
//     //             console.error("Error adding meal type:", error);
//     //         }
//     //     }
//     // };

//     // const handleAddPlan = async () => {
//     //     if (newPlan.trim() && !customPlans.includes(newPlan)) {
//     //         try {
//     //             const response = await axios.post("http://localhost:3000/api/add-plan", { label: newPlan });
//     //             setCustomPlans(response.data.menu.plans.map((plan) => plan.label));
//     //             setNewPlan("");
//     //         } catch (error) {
//     //             console.error("Error adding plan:", error);
//     //         }
//     //     }
//     // };

//     // Remove a Plan
//     const handleRemovePlan = (plan) => {
//         setCustomPlans((prev) => prev.filter((p) => p !== plan));
//         setNewMealType((prev) => {
//             const updatedPrices = { ...prev.prices };
//             delete updatedPrices[plan];
//             return { ...prev, prices: updatedPrices };
//         });
//     };

//     const predefinedPlans = [
//         "Trial (1Day)",
//         "Week",
//         "1 Month",
//         "15 Days",
//     ];

//     const predefinedServiceDays = [
//         "Monday-Friday",
//         "Monday-Saturday",
//         "Monday-Sunday",
//         "Monday-Thursday",
//     ];

//     const predefinedMealTypeLabels = [
//         "Basic Combo",
//         "Premium Combo",
//         "Deluxe Combo",
//         "Light Meal",
//         "Protein Boost",
//         "Kids Meal",
//         "Vegan Combo"
//     ];


//     return (
//         <div className="flex w-full">
//             <div className="w-full">
//                 {/* Manage Meal Plans */}
//                 <div className="mb-6">
//                     <h4 className="text-gray-800 font-medium pb-1">Manage Meal Plans</h4>
//                     <div className="">
//                         {/* Dropdown for predefined meal plans */}
//                         <div className="flex items-center gap-3 relative w-full">
//                             {/* Input field for custom meal plans */}
//                             <input
//                                 type="text"
//                                 value={newPlan}
//                                 onChange={(e) => setNewPlan(e.target.value)}
//                                 onFocus={() => setShowSuggestions(true)}
//                                 onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
//                                 placeholder="Enter new plan name"
//                                 className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
//                             />
//                             {/* Suggestions Dropdown */}
//                             {showSuggestions && (
//                                 <ul className="absolute top-full left-0  bg-white border border-gray-300 rounded-lg shadow-md z-10 w-1/2">
//                                     {predefinedPlans
//                                         .filter((plan) =>
//                                             plan.toLowerCase().includes(newPlan.toLowerCase())
//                                         )
//                                         .map((plan) => (
//                                             <li
//                                                 key={plan}
//                                                 onClick={() => {
//                                                     setNewPlan(plan);
//                                                     setShowSuggestions(false);
//                                                 }}
//                                                 className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
//                                             >
//                                                 {plan}
//                                             </li>
//                                         ))}
//                                 </ul>
//                             )}

//                             {/* Add plan button */}
//                             <button
//                                 onClick={handleAddPlan}
//                                 className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//                             >
//                                 Add Plan
//                             </button>
//                         </div>
//                     </div>
//                     {/* List of custom plans */}
//                     {customPlans.length > 0 && (
//                         <ul className="mt-3 grid grid-cols-3 gap-2 w-full items-center">
//                             {customPlans.map((plan) => (
//                                 <li
//                                     key={plan}
//                                     className="flex items-center gap-2 justify-between bg-gray-100 px-4 py-2 rounded-lg shadow-sm"
//                                 >
//                                     <span className="text-gray-800 text-sm pb-1">{plan}</span>
//                                     <div className="flex gap-2 items-center">
//                                         <button
//                                             // onClick={onEdit}
//                                             className="text-gray-500 hover:text-blue-500"
//                                             title="Edit"
//                                         >
//                                             <FiEdit size={14} />
//                                         </button>
//                                         <button
//                                             onClick={() => handleRemovePlan(plan)}
//                                             className="text-red-500 hover:text-red-700"
//                                         >
//                                             <FiTrash2 size={14} />
//                                         </button>
//                                     </div>
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </div>
//                 {/* Service Days */}
//                 <div className="mb-6 flex flex-col gap-2 relative">
//                     <label className="block font-semibold text-gray-800">
//                         Set Your Service Days
//                     </label>
//                     <input
//                         type="text"
//                         placeholder="e.g., Mon-Fri"
//                         value={serviceDays}
//                         onChange={(e) => setServiceDays(e.target.value)}
//                         onFocus={() => setshowServiceDaysSuggetions(true)}
//                         onBlur={() => setTimeout(() => setshowServiceDaysSuggetions(false), 100)}
//                         className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
//                     />
//                     {showServiceDaysSuggetions && (
//                         <ul className="absolute top-full left-0  bg-white border border-gray-300 rounded-lg shadow-md z-10 w-1/2">
//                             {predefinedServiceDays
//                                 .filter((Service) =>
//                                     Service.toLowerCase().includes(serviceDays.toLowerCase())
//                                 )
//                                 .map((Service) => (
//                                     <li
//                                         key={Service}
//                                         onClick={() => {
//                                             setServiceDays(Service);
//                                             setshowServiceDaysSuggetions(false);
//                                         }}
//                                         className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
//                                     >
//                                         {Service}
//                                     </li>
//                                 ))}
//                         </ul>
//                     )}
//                 </div>
//                 <div className="flex flex-col gap-1 ">
//                     {/* Flexible Dates */}
//                     <div className="flex items-center gap-3">
//                         <div
//                             className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer ${isFlexibleDates ? "bg-red-500" : "bg-gray-300"
//                                 }`}
//                             onClick={() => setIsFlexibleDates(!isFlexibleDates)}
//                         >
//                             <span
//                                 className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isFlexibleDates ? "translate-x-6" : "translate-x-1"
//                                     }`}
//                             ></span>
//                         </div>
//                         <label className="font-medium text-gray-700">
//                             Flexible Start/End Dates
//                         </label>
//                     </div>
//                     <div>
//                         {isFlexibleDates && (
//                             <p className="text-sm text-gray-500 mb-3">
//                                 Now users can set custom start and end dates for each order (e.g., Start: 7/Jan/2025, End: 10/Jan/2025).
//                             </p>
//                         )}</div>
//                 </div>

//                 <div className="border border-gray-500 h-px my-3 w-full"></div>
//                 {/* Add Meal Type */}
//                 <div>
//                     <h3 className="font-semibold text-gray-800 pb-1">Add Meal Type</h3>
//                     <div className="relative w-full">
//                         <input
//                             type="text"
//                             name="label"
//                             value={newMealType.label}
//                             onChange={handleMealTypeChange}
//                             onFocus={() => setshowMelatypeSuggestions(true)}
//                             onBlur={() => setTimeout(() => setshowMelatypeSuggestions(false), 100)}
//                             placeholder="Meal Type Label"
//                             className="w-full border border-gray-300 rounded-lg p-2 mb-2 focus:outline-none"
//                         />
//                         {showMelatypeSuggestions && (
//                             <ul className="absolute top-full left-0  bg-white border border-gray-300 rounded-lg shadow-md z-10 w-1/2">
//                                 {predefinedMealTypeLabels
//                                     .filter((mealType) =>
//                                         mealType.toLowerCase().includes(newMealType.label.toLowerCase())
//                                     )
//                                     .map((mealType) => (
//                                         <li
//                                             key={mealType}
//                                             onClick={() => {
//                                                 setNewMealType((prev) => ({
//                                                     ...prev,
//                                                     label: mealType
//                                                 }));
//                                                 setshowMelatypeSuggestions(false);
//                                             }}
//                                             className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
//                                         >
//                                             {mealType}
//                                         </li>
//                                     ))}
//                             </ul>
//                         )}
//                     </div>
//                     <textarea
//                         name="description"
//                         value={newMealType.description}
//                         onChange={handleMealTypeChange}
//                         placeholder="Meal Type Description"
//                         className="w-full border border-gray-300 rounded-lg p-2 mb-2 focus:outline-none"
//                     />
//                     <div className="grid grid-cols-2 gap-2">
//                         {customPlans.map((plan) => (
//                             <div key={plan}>
//                                 <input
//                                     type="number"
//                                     name={plan}
//                                     value={newMealType.prices[plan] || ""}
//                                     onChange={handleMealTypeChange}
//                                     placeholder={`Price for ${plan}`}
//                                     className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                     <button
//                         onClick={handleAddMealType}
//                         className="mt-2 flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//                     >
//                         <FiPlusCircle size={18} className="mr-2" />
//                         Add Meal Type
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddMeal;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { dummyData } from "../../../../data/TiffinDummyData";
import MealPlanPopup from "./MealPlanPopup";
import MealTypePopup from "./MealTypePopup";

const ManageTiffin = () => {
    const [plans, setPlans] = useState([]);
    const [mealTypes, setMealTypes] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);//plans[0]._id
    const [selectedMealType, setSelectedMealType] = useState(null);//mealTypes[0].mealTypeId
    const [isEditing, setIsEditing] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [isFlexibleDates, setIsFlexibleDates] = useState(false);
    // const [serviceDays, setServiceDays] = useState("");
    const [serviceDays, setServiceDays] = useState([]);

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    useEffect(() => {
        const mapMealPlans = async () => {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/menu`);
            setPlans(response.data.plans);
            setMealTypes(response.data.mealTypes);
            setSelectedPlan(response.data.plans[0]._id);
            setSelectedMealType(response.data.mealTypes[0].mealTypeId);
            setServiceDays(response.data.serviceDays);
            setIsFlexibleDates(response.data.isFlexibleDates);
            // console.log("The Plans is:", response.data.plans);
            // console.log("The Type is:", response.data.mealTypes);
        }
        mapMealPlans()
    }, []);


    // Handle checkbox toggle
    const handleDayChange = (day) => {
        if (serviceDays.includes(day)) {
            // Remove the day if it's already selected
            setServiceDays(serviceDays.filter((d) => d !== day));
        } else {
            // Add the day if it's not selected
            setServiceDays([...serviceDays, day]);
        }
    };


    // Function to save meal days and flexible dates
    const handleSaveMealDays = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/manage_mealdays&Flexidates`, {
                serviceDays,
                isFlexibleDates,
            });
            console.log("Response:", response.data);
            alert("Meal days and flexible dates updated successfully.");
        } catch (error) {
            console.error("Error updating meal days & flexible dates:", error);
            alert("Failed to update meal days and flexible dates.");
        }
    };

    // Save meal days to the backend
    console.log("Plan is", plans)
    const handleEdit = (item, type) => {
        setIsEditing(true);
        setEditingItem({ ...item, type });
    };

    const handleEditMenu = (item, type) => {
        setIsEditing(true);
        setEditingItem({ ...item, type });
    };

    const handleSave = () => {
        if (editingItem.type === "plan") {
            setPlans(plans.map((p) => (p._id === editingItem._id ? editingItem : p)));
        } else if (editingItem.type === "mealType") {
            setMealTypes(mealTypes.map((m) => (m.mealTypeId === editingItem.mealTypeId ? editingItem : m)));
        }
        setIsEditing(false);
        setEditingItem(null);
    };
    const handleAdd = (type) => {
        setIsEditing(true);

        if (type === "mealType") {

            const newMealTypeTemplate = {
                mealTypeId: null,
                label: "",
                description: "",
                prices: plans.reduce((acc, plan) => ({ ...acc, [plan._id]: "" }), {}),
            };

            setEditingItem({ ...newMealTypeTemplate, type });
        } else if (type === "plan") {

            const newPlanTemplate = {
                _id: null,
                label: "",
            };

            setEditingItem({ ...newPlanTemplate, type });
        }
    };

    const handleDelete = (item, type) => {
        if (type === "plan") {
            setPlans(plans.filter((p) => p._id !== item._id));
        } else if (type === "mealType") {
            setMealTypes(mealTypes.filter((m) => m.mealTypeId !== item.mealTypeId));
        }
    };

    const refreshData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/menu`);
            const menuData = response.data;
            setPlans(menuData.plans);
            setMealTypes(menuData.mealTypes);
        } catch (error) {
            console.error("Error fetching menu data:", error);
        }
    };

    return (
        <div className="font-inter h-full overflow-auto w-full mx-auto">
            <div className="bg-white w-full mx-auto mb-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col max-w-[250px]">
                        <img
                            className="rounded-md w-[200px] h-[200px]"
                            src="https://tiffinstash.com/cdn/shop/files/FoodEXPremiumVegTiffinService_dc8c57af-1b52-4e76-ac5e-4e87facb8c0b_1024x1024@2x.png?v=1708080733"
                            alt="Tiffin Service"
                        />
                        <div className="flex flex-wrap items-center gap-1 mt-1">
                            <img
                                className="rounded-md w-12 h-12 object-cover"
                                src="https://tiffinstash.com/cdn/shop/files/FoodEXPremiumVegTiffinService_dc8c57af-1b52-4e76-ac5e-4e87facb8c0b_1024x1024@2x.png?v=1708080733"
                                alt="Tiffin 1"
                            />
                            <img
                                className="rounded-md w-12 h-12 object-cover"
                                src="https://tiffinstash.com/cdn/shop/files/FoodEXPremiumVegTiffinService_dc8c57af-1b52-4e76-ac5e-4e87facb8c0b_1024x1024@2x.png?v=1708080733"
                                alt="Tiffin 2"
                            />

                        </div>
                    </div>

                    <div className="flex-1 space-y-4">
                        <h1 className="text-3xl font-medium">Krupa Mess & Tiffins</h1>

                        <div className="">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Meal Plan</label>
                            <div className="flex items-center gap-2">
                                {plans.length === 0 ?
                                    (<p className="w-full border p-2 text-sm rounded-md">Add Meal Plan</p>) :
                                    (<select
                                        value={selectedPlan}
                                        onChange={(e) => setSelectedPlan(e.target.value)}
                                        className="p-2 w-full border border-gray-300  text-sm cursor-pointer"
                                    >
                                        {plans.map((plan) => (
                                            <option key={plan._id} value={plan._id}>
                                                {plan.label}
                                            </option>
                                        ))}
                                    </select>
                                    )}
                                <button
                                    onClick={() => handleAdd("plan")}
                                    className="text-sm font-semibold"
                                >
                                    <FiPlus />
                                </button>
                                <button
                                    onClick={() => handleEdit(plans.find((p) => p._id === selectedPlan), "plan")}
                                    className="text-blue-500"
                                >
                                    <FiEdit size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(plans.find((p) => p._id === selectedPlan), "plan")}
                                    className="text-red-500"
                                >
                                    <FiTrash2 size={16} />
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Meal Type</label>
                            <div className="flex items-center gap-2">
                                {mealTypes.length === 0 ?
                                    (<p className="w-full border p-2 text-sm rounded-md">Add Meal Type</p>) :
                                    (<select
                                        value={selectedMealType}
                                        onChange={(e) => setSelectedMealType(e.target.value)}
                                        className="p-2 w-full border border-gray-300 rounded text-sm cursor-pointer"
                                    >
                                        {mealTypes.map((mealType) => (
                                            <option key={mealType.mealTypeId} value={mealType.mealTypeId}>
                                                {mealType.label}
                                            </option>
                                        ))}
                                    </select>)}

                                <button
                                    onClick={() => handleAdd("mealType")}
                                    className="flex gap-1 items-center rounded text-sm font-semibold"
                                >
                                    <FiPlus />
                                </button>
                                <button
                                    onClick={() =>
                                        handleEdit(mealTypes.find((m) => m.mealTypeId === selectedMealType), "mealType")
                                    }
                                    className="text-blue-500"
                                >
                                    <FiEdit size={16} />
                                </button>
                                <button
                                    onClick={() =>
                                        handleDelete(mealTypes.find((m) => m.mealTypeId === selectedMealType), "mealType")
                                    }
                                    className="text-red-500"
                                >
                                    <FiTrash2 size={16} />
                                </button>
                            </div>
                        </div>


                        {/* <div className="mb-6 flex flex-col gap-1 relative">
                            <label className="block text-sm font-medium text-gray-700">Set Your Meal Days</label>
                            <input
                                type="text"
                                value={serviceDays}
                                onChange={(e) => setServiceDays(e.target.value)}
                                placeholder="e.g., Mon-Fri"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                            />
                        </div> */}
                        <div className="border border-gray-300 rounded-md p-3 flex flex-col gap-2 mr-2">
                            <label htmlFor="" className="font-medium text-gray-700 text-sm">Meal Days</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                                {daysOfWeek.map((day) => (
                                    <label key={day} className="flex items-center text-[13px]">
                                        <input
                                            type="checkbox"
                                            value={day}
                                            checked={serviceDays.includes(day)}
                                            onChange={() => handleDayChange(day)}
                                            className="mr-2 rounded text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-gray-700">{day}</span>
                                    </label>
                                ))}
                            </div>

                            {/* Flexible Dates */}
                            <div className="flex justify-between items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <div
                                        className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer ${isFlexibleDates ? "bg-red-500" : "bg-gray-300"
                                            }`}
                                        onClick={() => setIsFlexibleDates(!isFlexibleDates)}
                                    >
                                        <span
                                            className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isFlexibleDates ? "translate-x-6" : "translate-x-1"
                                                }`}
                                        ></span>
                                    </div>
                                    <label className="font-medium text-gray-700">Flexible Start/End Dates</label>
                                </div>
                                {/* Save Button */}
                                <div className="pr-2">
                                    <button
                                        onClick={handleSaveMealDays}
                                        className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>

                            {isFlexibleDates && (
                                <p className="text-sm text-gray-500">
                                    Now users can set custom start and end dates for each order (e.g., Start: 7/Jan/2025, End: 10/Jan/2025).
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {
                isEditing && editingItem.type === "mealType" && (
                    <MealTypePopup
                        editingItem={editingItem}
                        // Plans={plans}
                        setEditingItem={setEditingItem}
                        closePopup={() => setIsEditing(false)}
                        refreshData={refreshData}
                    />
                )
            }
            {
                isEditing && editingItem.type === "plan" && (
                    <MealPlanPopup
                        editingItem={editingItem}
                        setEditingItem={setEditingItem}
                        closePopup={() => setIsEditing(false)}
                        refreshData={refreshData}
                    />
                )
            }
            <div className="Menu bg-white border-t-2 pt-2">
                <h2 className="text-lg pb-2 font-medium">Meal Types</h2>
                <div className="space-y-1">
                    {mealTypes.map((type) => (
                        // View Mode
                        <div className="flex items-center justify-between gap-2 w-full bg-white shadow-sm border hover:shadow-md p-2 rounded-md">
                            <div>
                                <span className="font-medium">{type.label}:</span>
                                <span className="text-sm ml-2">{type.description}</span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEditMenu(type, "mealType")}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    <FiEdit size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(type, "mealType")}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <FiTrash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div >
    );
};

export default ManageTiffin;


