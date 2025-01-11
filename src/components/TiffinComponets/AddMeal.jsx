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

// import React, { useState } from "react";
// import { FiEdit2, FiPlus, FiTrash2, FiX } from "react-icons/fi";

// import { dummyData, dummyInstructions } from "../../data/TiffinDummyData";

// const AdminTiffinService = () => {
//     const [plans, setPlans] = useState(dummyData.plans);
//     const [mealTypes, setMealTypes] = useState(dummyData.mealTypes);
//     const [selectedPlan, setSelectedPlan] = useState(plans[0].planId);
//     const [selectedMealType, setSelectedMealType] = useState(mealTypes[0].mealTypeId);
//     const [startDate, setStartDate] = useState(new Date());
//     const [quantity, setQuantity] = useState(1);
//     const [instructions, setInstructions] = useState(dummyInstructions.instructions);
//     const [isEditing, setIsEditing] = useState(false);
//     const [editingItem, setEditingItem] = useState(null);

//     const calculateEndDate = () => {
//         if (!startDate) return undefined;
//         const endDate = new Date(startDate);
//         const selectedPlanObj = plans.find(p => p.planId === selectedPlan);

//         if (selectedPlanObj) {
//             if (selectedPlan === "trial") {
//                 endDate.setDate(endDate.getDate() + 1);
//             } else if (selectedPlan === "week") {
//                 endDate.setDate(endDate.getDate() + 7);
//             } else if (selectedPlan === "month") {
//                 endDate.setMonth(endDate.getMonth() + 1);
//             }
//         }

//         return endDate;
//     };

//     const formatDate = (date) => {
//         if (!date) return "Invalid Date";
//         return new Intl.DateTimeFormat('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         }).format(date);
//     };

//     const calculatePrice = () => {
//         const mealType = mealTypes.find(m => m.mealTypeId === selectedMealType);
//         return mealType ? mealType.prices[selectedPlan] * quantity : 0;
//     };

//     const handleEdit = (item, type) => {
//         setIsEditing(true);
//         setEditingItem({ ...item, type });
//     };

//     const handleSave = () => {
//         if (editingItem.type === 'plan') {
//             setPlans(plans.map(p => p.planId === editingItem.planId ? editingItem : p));
//         } else if (editingItem.type === 'mealType') {
//             setMealTypes(mealTypes.map(m => m.mealTypeId === editingItem.mealTypeId ? editingItem : m));
//         } else if (editingItem.type === 'instruction') {
//             setInstructions(instructions.map(i => i.title === editingItem.title ? editingItem : i));
//         }
//         setIsEditing(false);
//         setEditingItem(null);
//     };

//     const handleAdd = (type) => {
//         if (type === 'plan') {
//             const newPlan = { planId: `plan-${plans.length + 1}`, label: "New Plan", priceMultiplier: 1 };
//             setPlans([...plans, newPlan]);
//             handleEdit(newPlan, 'plan');
//         } else if (type === 'mealType') {
//             const newMealType = {
//                 mealTypeId: `meal-${mealTypes.length + 1}`,
//                 label: "New Meal Type",
//                 description: "Description",
//                 prices: Object.fromEntries(plans.map(p => [p.planId, 0]))
//             };
//             setMealTypes([...mealTypes, newMealType]);
//             handleEdit(newMealType, 'mealType');
//         } else if (type === 'instruction') {
//             const newInstruction = { title: "New Instruction", details: "Details" };
//             setInstructions([...instructions, newInstruction]);
//             handleEdit(newInstruction, 'instruction');
//         }
//     };

//     const handleDelete = (id, type) => {
//         if (type === 'plan') {
//             setPlans(plans.filter(p => p.planId !== id));
//         } else if (type === 'mealType') {
//             setMealTypes(mealTypes.filter(m => m.mealTypeId !== id));
//         } else if (type === 'instruction') {
//             setInstructions(instructions.filter(i => i.title !== id));
//         }
//     };

//     return (
//         <div className="font-inter p-4 max-w-7xl mx-auto bg-gray-50">
//             <div className="">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
//                     <div className="bg-white rounded-lg p-4 shadow">
//                         <h2 className="text-lg font-semibold text-gray-700 mb-3">Plans</h2>
//                         <div className="space-y-2 max-h-64 overflow-y-auto">
//                             {plans.map(plan => (
//                                 <div key={plan.planId} className="flex justify-between items-center p-2 border border-gray-200 rounded hover:bg-gray-50 transition-colors">
//                                     <span className="text-sm max-w-[70%]">{plan.label}</span>
//                                     <div>
//                                         <button onClick={() => handleEdit(plan, 'plan')} className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors mr-1">
//                                             <FiEdit2 size={14} />
//                                         </button>
//                                         <button onClick={() => handleDelete(plan.planId, 'plan')} className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
//                                             <FiTrash2 size={14} />
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                         <button onClick={() => handleAdd('plan')} className="flex items-center justify-center px-3 py-2 mt-3 w-full bg-blue-500 text-white rounded text-sm font-semibold hover:bg-blue-600 transition-colors">
//                             <FiPlus className="mr-1" /> Add Plan
//                         </button>
//                     </div>

//                     <div className="bg-white rounded-lg p-4 shadow">
//                         <h2 className="text-lg font-semibold text-gray-700 mb-3">Meal Types</h2>
//                         <div className="space-y-2 max-h-64 overflow-y-auto">
//                             {mealTypes.map(mealType => (
//                                 <div key={mealType.mealTypeId} className="flex justify-between items-center p-2 border border-gray-200 rounded hover:bg-gray-50 transition-colors">
//                                     <span className="text-sm max-w-[70%]">{mealType.label}</span>
//                                     <div>
//                                         <button onClick={() => handleEdit(mealType, 'mealType')} className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors mr-1">
//                                             <FiEdit2 size={14} />
//                                         </button>
//                                         <button onClick={() => handleDelete(mealType.mealTypeId, 'mealType')} className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
//                                             <FiTrash2 size={14} />
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                         <button onClick={() => handleAdd('mealType')} className="flex items-center justify-center px-3 py-2 mt-3 w-full bg-orange-500 text-white rounded text-sm font-semibold hover:bg-orange-600 transition-colors">
//                             <FiPlus className="mr-1" /> Add Meal Type
//                         </button>
//                     </div>

//                     <div className="bg-white rounded-lg p-4 shadow">
//                         <h2 className="text-lg font-semibold text-gray-700 mb-3">Instructions</h2>
//                         <div className="space-y-2 max-h-64 overflow-y-auto">
//                             {instructions.map(instruction => (
//                                 <div key={instruction.title} className="flex justify-between items-center p-2 border border-gray-200 rounded hover:bg-gray-50 transition-colors">
//                                     <span className="text-sm max-w-[70%]">{instruction.title}</span>
//                                     <div>
//                                         <button onClick={() => handleEdit(instruction, 'instruction')} className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors mr-1">
//                                             <FiEdit2 size={14} />
//                                         </button>
//                                         <button onClick={() => handleDelete(instruction.title, 'instruction')} className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
//                                             <FiTrash2 size={14} />
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                         <button onClick={() => handleAdd('instruction')} className="flex items-center justify-center px-3 py-2 mt-3 w-full bg-purple-500 text-white rounded text-sm font-semibold hover:bg-purple-600 transition-colors">
//                             <FiPlus className="mr-1" /> Add Instruction
//                         </button>
//                     </div>
//                 </div>

//                 <div className="md:col-span-2 lg:col-span-3 grid-cols-1 bg-white rounded-lg p-4 shadow w-full mx-auto">
//                     <h2 className="text-lg font-semibold text-gray-700 mb-3">User Side Preview</h2>
//                     <div className="flex flex-col gap-3 md:flex-row justify-around">
//                         <div className="flex md:flex-col flex-row gap-2">
//                             <div className=''>
//                                 <img
//                                     className='rounded-md md:w-[300px] md:h-[300px] w-[200px] h-[200px]'
//                                     src="https://tiffinstash.com/cdn/shop/files/FoodEXPremiumVegTiffinService_dc8c57af-1b52-4e76-ac5e-4e87facb8c0b_1024x1024@2x.png?v=1708080733" alt=""
//                                 />
//                             </div>
//                             <div className="flex md:flex-row flex-col gap-2 items-center">
//                                 <img
//                                     className='rounded-md w-[100px] h-[100px]'
//                                     src="https://tiffinstash.com/cdn/shop/files/FoodEXPremiumVegTiffinService_dc8c57af-1b52-4e76-ac5e-4e87facb8c0b_1024x1024@2x.png?v=1708080733" alt=""
//                                 />
//                                 <img
//                                     className='rounded-md w-[100px] h-[100px]'
//                                     src="https://tiffinstash.com/cdn/shop/files/FoodEXPremiumVegTiffinService_dc8c57af-1b52-4e76-ac5e-4e87facb8c0b_1024x1024@2x.png?v=1708080733" alt=""
//                                 />
//                             </div>
//                         </div>
//                         <div className="flex flex-col gap-2">
//                             <div className="flex flex-col gap-2 text-xl font-bold">
//                                 <h2 className="text-2xl">Krupa Mess & Tiffins</h2>
//                                 <span className="text-red-500">${calculatePrice()}</span>
//                             </div>
//                             <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
//                                 <div className="space-y-1">
//                                     <label className="block text-sm font-medium text-gray-700">Select Plan</label>
//                                     <select
//                                         value={selectedPlan}
//                                         onChange={(e) => setSelectedPlan(e.target.value)}
//                                         className="w-full p-2 border border-gray-300 rounded text-sm"
//                                     >
//                                         {plans.map((plan) => (
//                                             <option key={plan.planId} value={plan.planId}>
//                                                 {plan.label}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>

//                                 <div className="space-y-1">
//                                     <label className="block text-sm font-medium text-gray-700">Meal Type</label>
//                                     <select
//                                         value={selectedMealType}
//                                         onChange={(e) => setSelectedMealType(e.target.value)}
//                                         className="w-full p-2 border border-gray-300 rounded text-sm"
//                                     >
//                                         {mealTypes.map((mealType) => (
//                                             <option key={mealType.mealTypeId} value={mealType.mealTypeId}>
//                                                 {mealType.label}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>

//                                 <div className="space-y-1">
//                                     <label className="block text-sm font-medium text-gray-700">Start Date</label>
//                                     <input
//                                         type="date"
//                                         value={startDate.toISOString().split("T")[0]}
//                                         onChange={(e) => setStartDate(new Date(e.target.value))}
//                                         className="w-full p-2 border border-gray-300 rounded text-sm"
//                                     />
//                                 </div>

//                                 <div className="space-y-1">
//                                     <label className="block text-sm font-medium text-gray-700">End Date</label>
//                                     <div className="p-2 bg-gray-100 rounded text-sm">
//                                         {formatDate(calculateEndDate())}
//                                     </div>
//                                 </div>

//                                 <div className="space-y-1 w-full">
//                                     <label className="block text-sm font-medium text-gray-700">Meal Details</label>
//                                     <div className="p-2 bg-gray-100 rounded text-sm">
//                                         {mealTypes.find(m => m.mealTypeId === selectedMealType)?.description || "No meal details available"}
//                                     </div>
//                                 </div>

//                                 {/* <div className="flex items-center space-x-4">
//                                 <label className="text-sm font-medium text-gray-700">Quantity</label>
//                                 <button
//                                     onClick={() => setQuantity(q => Math.max(1, q - 1))}
//                                     className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
//                                 >
//                                     -
//                                 </button>
//                                 <span className="text-lg font-bold">{quantity}</span>
//                                 <button
//                                     onClick={() => setQuantity(q => q + 1)}
//                                     className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
//                                 >
//                                     +
//                                 </button>
//                             </div> */}

//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {isEditing && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//                     <div className="bg-white p-6 rounded-lg w-full max-w-md">
//                         <div className="flex justify-between items-center mb-4">
//                             <h2 className="text-lg font-semibold">Edit {editingItem.type}</h2>
//                             <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-gray-700">
//                                 <FiX className="w-5 h-5" />
//                             </button>
//                         </div>
//                         {editingItem.type === 'plan' && (
//                             <input
//                                 type="text"
//                                 value={editingItem.label}
//                                 onChange={(e) => setEditingItem({ ...editingItem, label: e.target.value })}
//                                 className="w-full p-2 mb-4 border border-gray-300 rounded text-sm"
//                             />
//                         )}
//                         {editingItem.type === 'mealType' && (
//                             <div className="max-h-[80vh] overflow-auto">
//                                 <input
//                                     type="text"
//                                     value={editingItem.label}
//                                     onChange={(e) => setEditingItem({ ...editingItem, label: e.target.value })}
//                                     className="w-full p-2 mb-2 border border-gray-300 rounded text-sm"
//                                 />
//                                 <textarea
//                                     value={editingItem.description}
//                                     onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
//                                     className="w-full p-2 mb-2 border border-gray-300 rounded text-sm min-h-[100px]"
//                                 />
//                                 <div className="grid grid-cols-2 gap-2 items-center">
//                                     {plans.map(plan => (
//                                         <div key={plan.planId} className="mb-2 flex flex-col">
//                                             <label className="block mb-1 text-sm">{plan.label} Price:</label>
//                                             <input
//                                                 type="number"
//                                                 value={editingItem.prices[plan.planId]}
//                                                 onChange={(e) => setEditingItem({
//                                                     ...editingItem,
//                                                     prices: { ...editingItem.prices, [plan.planId]: parseFloat(e.target.value) }
//                                                 })}
//                                                 className="w-full p-2 border border-gray-300 rounded text-sm"
//                                             />
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}
//                         {editingItem.type === 'instruction' && (
//                             <>
//                                 <input
//                                     type="text"
//                                     value={editingItem.title}
//                                     onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
//                                     className="w-full p-2 mb-4 border border-gray-300 rounded text-sm"
//                                 />
//                                 <textarea
//                                     value={editingItem.details}
//                                     onChange={(e) => setEditingItem({ ...editingItem, details: e.target.value })}
//                                     className="w-full p-2 mb-4 border border-gray-300 rounded text-sm min-h-[100px]"
//                                 />
//                             </>
//                         )}
//                         <div className="flex justify-end mt-4">
//                             <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded text-sm font-semibold hover:bg-green-600 transition-colors mr-2">
//                                 Save
//                             </button>
//                             <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-red-500 text-white rounded text-sm font-semibold hover:bg-red-600 transition-colors">
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AdminTiffinService;


// import React, { useState } from "react";
// import { FiEdit2, FiPlus, FiTrash2, FiX } from "react-icons/fi";

// import { dummyData, dummyInstructions } from "../../data/TiffinDummyData";

// const AdminTiffinService = () => {
//     const [plans, setPlans] = useState(dummyData.plans);
//     const [mealTypes, setMealTypes] = useState(dummyData.mealTypes);
//     const [selectedPlan, setSelectedPlan] = useState(plans[0].planId);
//     const [selectedMealType, setSelectedMealType] = useState(mealTypes[0].mealTypeId);
//     const [startDate, setStartDate] = useState(new Date());
//     const [quantity, setQuantity] = useState(1);
//     const [instructions, setInstructions] = useState(dummyInstructions.instructions);
//     const [isEditing, setIsEditing] = useState(false);
//     const [editingItem, setEditingItem] = useState(null);

//     const calculateEndDate = () => {
//         if (!startDate) return undefined;
//         const endDate = new Date(startDate);
//         const selectedPlanObj = plans.find(p => p.planId === selectedPlan);

//         if (selectedPlanObj) {
//             if (selectedPlan === "trial") {
//                 endDate.setDate(endDate.getDate() + 1);
//             } else if (selectedPlan === "week") {
//                 endDate.setDate(endDate.getDate() + 7);
//             } else if (selectedPlan === "month") {
//                 endDate.setMonth(endDate.getMonth() + 1);
//             }
//         }

//         return endDate;
//     };

//     const formatDate = (date) => {
//         if (!date) return "Invalid Date";
//         return new Intl.DateTimeFormat('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         }).format(date);
//     };

//     const calculatePrice = () => {
//         const mealType = mealTypes.find(m => m.mealTypeId === selectedMealType);
//         return mealType ? mealType.prices[selectedPlan] * quantity : 0;
//     };

//     const handleEdit = (item, type) => {
//         setIsEditing(true);
//         setEditingItem({ ...item, type });
//     };

//     const handleSave = () => {
//         if (editingItem.type === 'plan') {
//             setPlans(plans.map(p => p.planId === editingItem.planId ? editingItem : p));
//         } else if (editingItem.type === 'mealType') {
//             setMealTypes(mealTypes.map(m => m.mealTypeId === editingItem.mealTypeId ? editingItem : m));
//         } else if (editingItem.type === 'instruction') {
//             setInstructions(instructions.map(i => i.title === editingItem.title ? editingItem : i));
//         }
//         setIsEditing(false);
//         setEditingItem(null);
//     };

//     const handleAdd = (type) => {
//         if (type === 'plan') {
//             const newPlan = { planId: `plan-${plans.length + 1}`, label: "New Plan", priceMultiplier: 1 };
//             setPlans([...plans, newPlan]);
//             handleEdit(newPlan, 'plan');
//         } else if (type === 'mealType') {
//             const newMealType = {
//                 mealTypeId: `meal-${mealTypes.length + 1}`,
//                 label: "New Meal Type",
//                 description: "Description",
//                 prices: Object.fromEntries(plans.map(p => [p.planId, 0]))
//             };
//             setMealTypes([...mealTypes, newMealType]);
//             handleEdit(newMealType, 'mealType');
//         } else if (type === 'instruction') {
//             const newInstruction = { title: "New Instruction", details: "Details" };
//             setInstructions([...instructions, newInstruction]);
//             handleEdit(newInstruction, 'instruction');
//         }
//     };

//     const handleDelete = (id, type) => {
//         if (type === 'plan') {
//             setPlans(plans.filter(p => p.planId !== id));
//         } else if (type === 'mealType') {
//             setMealTypes(mealTypes.filter(m => m.mealTypeId !== id));
//         } else if (type === 'instruction') {
//             setInstructions(instructions.filter(i => i.title !== id));
//         }
//     };

//     return (
//         <div className="font-inter p-4 max-w-7xl mx-auto bg-gray-50">
//             <div className="bg-white rounded-lg p-6 shadow w-full mx-auto">
//                 <h2 className="text-2xl font-semibold text-gray-700 mb-6">Tiffin Service Management</h2>
//                 <div className="flex flex-col md:flex-row gap-8">
//                     <div className="flex flex-col">
//                         <img
//                             className='rounded-md w-[300px] h-[300px] '
//                             src="https://tiffinstash.com/cdn/shop/files/FoodEXPremiumVegTiffinService_dc8c57af-1b52-4e76-ac5e-4e87facb8c0b_1024x1024@2x.png?v=1708080733"
//                             alt="Tiffin Service"
//                         />
//                         <div className="flex items-center gap-2 mt-2">
//                             <img
//                                 className='rounded-md w-20 h-20 object-cover'
//                                 src="https://tiffinstash.com/cdn/shop/files/FoodEXPremiumVegTiffinService_dc8c57af-1b52-4e76-ac5e-4e87facb8c0b_1024x1024@2x.png?v=1708080733"
//                                 alt="Tiffin 1"
//                             />
//                             <img
//                                 className='rounded-md w-20 h-20 object-cover'
//                                 src="https://tiffinstash.com/cdn/shop/files/FoodEXPremiumVegTiffinService_dc8c57af-1b52-4e76-ac5e-4e87facb8c0b_1024x1024@2x.png?v=1708080733"
//                                 alt="Tiffin 2"
//                             />
//                         </div>
//                     </div>
//                     <div className="flex-1">
//                         <div className="flex justify-between items-center mb-6">
//                             <h2 className="text-2xl font-bold">Krupa Mess & Tiffins</h2>
//                             <span className="text-2xl font-bold text-red-500">${calculatePrice()}</span>
//                         </div>
//                         <div className="space-y-6">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Plans</label>
//                                 <div className="flex flex-wrap gap-2">
//                                     {plans.map((plan) => (
//                                         <div key={plan.planId} className="flex items-center bg-gray-100 rounded-md p-2">
//                                             <span className="mr-2">{plan.label}</span>
//                                             <button onClick={() => handleEdit(plan, 'plan')} className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors mr-1" title="Edit Plan">
//                                                 <FiEdit2 size={14} />
//                                             </button>
//                                             <button onClick={() => handleDelete(plan.planId, 'plan')} className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors" title="Delete Plan">
//                                                 <FiTrash2 size={14} />
//                                             </button>
//                                         </div>
//                                     ))}
//                                     <button
//                                         onClick={() => handleAdd('plan')}
//                                         className=" flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded text-sm font-semibold hover:bg-blue-600 transition-colors">
//                                         <FiPlus /> <span>Add Plan</span>
//                                     </button>
//                                 </div>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Meal Types</label>
//                                 <div className="flex flex-wrap gap-2">
//                                     {mealTypes.map((mealType) => (
//                                         <div key={mealType.mealTypeId} className="flex items-center bg-gray-100 rounded-md p-2">
//                                             <span className="mr-2">{mealType.label}</span>
//                                             <button onClick={() => handleEdit(mealType, 'mealType')} className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors mr-1" title="Edit Meal Type">
//                                                 <FiEdit2 size={14} />
//                                             </button>
//                                             <button onClick={() => handleDelete(mealType.mealTypeId, 'mealType')} className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors" title="Delete Meal Type">
//                                                 <FiTrash2 size={14} />
//                                             </button>
//                                         </div>
//                                     ))}
//                                     <button
//                                         onClick={() => handleAdd('mealType')}
//                                         className="px-4 py-2 flex items-center gap-2 bg-orange-500 text-white rounded text-sm font-semibold hover:bg-orange-600 transition-colors">
//                                         <FiPlus /> <span>Add Meal Type</span>
//                                     </button>
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
//                                     <input
//                                         type="date"
//                                         value={startDate.toISOString().split("T")[0]}
//                                         onChange={(e) => setStartDate(new Date(e.target.value))}
//                                         className="w-full p-2 border border-gray-300 rounded text-sm"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
//                                     <div className="p-2 bg-gray-100 rounded text-sm">
//                                         {formatDate(calculateEndDate())}
//                                     </div>
//                                 </div>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
//                                 <div className="space-y-2">
//                                     {instructions.map(instruction => (
//                                         <div key={instruction.title} className="flex justify-between items-center p-2 bg-gray-100 rounded-md">
//                                             <span className="text-sm">{instruction.title}</span>
//                                             <div>
//                                                 <button onClick={() => handleEdit(instruction, 'instruction')} className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors mr-1" title="Edit Instruction">
//                                                     <FiEdit2 size={14} />
//                                                 </button>
//                                                 <button onClick={() => handleDelete(instruction.title, 'instruction')} className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors" title="Delete Instruction">
//                                                     <FiTrash2 size={14} />
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     ))}
//                                     <button onClick={() => handleAdd('instruction')} className="flex items-center justify-center px-3 py-2 w-full bg-purple-500 text-white rounded text-sm font-semibold hover:bg-purple-600 transition-colors">
//                                         <FiPlus className="mr-1" /> Add Instruction
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {isEditing && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//                     <div className="bg-white p-6 rounded-lg w-full max-w-md">
//                         <div className="flex justify-between items-center mb-4">
//                             <h2 className="text-lg font-semibold">Edit {editingItem.type}</h2>
//                             <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-gray-700">
//                                 <FiX className="w-5 h-5" />
//                             </button>
//                         </div>
//                         {editingItem.type === 'plan' && (
//                             <input
//                                 type="text"
//                                 value={editingItem.label}
//                                 onChange={(e) => setEditingItem({ ...editingItem, label: e.target.value })}
//                                 className="w-full p-2 mb-4 border border-gray-300 rounded text-sm"
//                             />
//                         )}
//                         {editingItem.type === 'mealType' && (
//                             <div className="max-h-[80vh] overflow-auto">
//                                 <input
//                                     type="text"
//                                     value={editingItem.label}
//                                     onChange={(e) => setEditingItem({ ...editingItem, label: e.target.value })}
//                                     className="w-full p-2 mb-2 border border-gray-300 rounded text-sm"
//                                 />
//                                 <textarea
//                                     value={editingItem.description}
//                                     onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
//                                     className="w-full p-2 mb-2 border border-gray-300 rounded text-sm min-h-[100px]"
//                                 />
//                                 <div className="grid grid-cols-2 gap-2 items-center">
//                                     {plans.map(plan => (
//                                         <div key={plan.planId} className="mb-2 flex flex-col">
//                                             <label className="block mb-1 text-sm">{plan.label} Price:</label>
//                                             <input
//                                                 type="number"
//                                                 value={editingItem.prices[plan.planId]}
//                                                 onChange={(e) => setEditingItem({
//                                                     ...editingItem,
//                                                     prices: { ...editingItem.prices, [plan.planId]: parseFloat(e.target.value) }
//                                                 })}
//                                                 className="w-full p-2 border border-gray-300 rounded text-sm"
//                                             />
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}
//                         {editingItem.type === 'instruction' && (
//                             <>
//                                 <input
//                                     type="text"
//                                     value={editingItem.title}
//                                     onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
//                                     className="w-full p-2 mb-4 border border-gray-300 rounded text-sm"
//                                 />
//                                 <textarea
//                                     value={editingItem.details}
//                                     onChange={(e) => setEditingItem({ ...editingItem, details: e.target.value })}
//                                     className="w-full p-2 mb-4 border border-gray-300 rounded text-sm min-h-[100px]"
//                                 />
//                             </>
//                         )}
//                         <div className="flex justify-end mt-4">
//                             <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded text-sm font-semibold hover:bg-green-600 transition-colors mr-2">
//                                 Save
//                             </button>
//                             <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-red-500 text-white rounded text-sm font-semibold hover:bg-red-600 transition-colors">
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AdminTiffinService;

import React, { useState } from "react";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import { dummyData } from "../../data/TiffinDummyData";

const AdminTiffinService = () => {
    const [plans, setPlans] = useState(dummyData.plans);
    const [mealTypes, setMealTypes] = useState(dummyData.mealTypes);
    const [selectedPlan, setSelectedPlan] = useState(plans[0].planId);
    const [selectedMealType, setSelectedMealType] = useState(mealTypes[0].mealTypeId);
    const [isEditing, setIsEditing] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [isFlexibleDates, setIsFlexibleDates] = useState(false);

    const handleEdit = (item, type) => {
        setIsEditing(true);
        setEditingItem({ ...item, type });
    };

    const handleSave = () => {
        if (editingItem.type === "plan") {
            setPlans(plans.map((p) => (p.planId === editingItem.planId ? editingItem : p)));
        } else if (editingItem.type === "mealType") {
            setMealTypes(mealTypes.map((m) => (m.mealTypeId === editingItem.mealTypeId ? editingItem : m)));
        }
        setIsEditing(false);
        setEditingItem(null);
    };

    const handleAdd = (type) => {
        if (type === "plan") {
            const newPlan = { planId: `plan-${plans.length + 1}`, label: "New Plan" };
            setPlans([...plans, newPlan]);
            handleEdit(newPlan, "plan");
        } else if (type === "mealType") {
            const newMealType = {
                mealTypeId: `meal-${mealTypes.length + 1}`,
                label: "New Meal Type",
                description: "",
                prices: plans.reduce((acc, plan) => ({ ...acc, [plan.planId]: "" }), {}),
            };
            setMealTypes([...mealTypes, newMealType]);
            handleEdit(newMealType, "mealType");
        }
    };

    const handleDelete = (item, type) => {
        if (type === "plan") {
            setPlans(plans.filter((p) => p.planId !== item.planId));
        } else if (type === "mealType") {
            setMealTypes(mealTypes.filter((m) => m.mealTypeId !== item.mealTypeId));
        }
    };

    return (
        <div className="font-inter h-full overflow-auto w-full mx-auto">
            <div className="bg-white p-6 shadow w-full h-full mx-auto">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col max-w-[250px]">
                        <img
                            className="rounded-md w-[250px] h-[250px]"
                            src="https://tiffinstash.com/cdn/shop/files/FoodEXPremiumVegTiffinService_dc8c57af-1b52-4e76-ac5e-4e87facb8c0b_1024x1024@2x.png?v=1708080733"
                            alt="Tiffin Service"
                        />
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                            <img
                                className="rounded-md w-14 h-14 object-cover"
                                src="https://tiffinstash.com/cdn/shop/files/FoodEXPremiumVegTiffinService_dc8c57af-1b52-4e76-ac5e-4e87facb8c0b_1024x1024@2x.png?v=1708080733"
                                alt="Tiffin 1"
                            />
                            <img
                                className="rounded-md w-14 h-14 object-cover"
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
                                <select
                                    value={selectedPlan}
                                    onChange={(e) => setSelectedPlan(e.target.value)}
                                    className="p-2 w-full border border-gray-300 rounded text-sm cursor-pointer"
                                >
                                    {plans.map((plan) => (
                                        <option key={plan.planId} value={plan.planId}>
                                            {plan.label}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={() => handleEdit(plans.find((p) => p.planId === selectedPlan), "plan")}
                                    className="text-green-500"
                                >
                                    <FiEdit2 size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(plans.find((p) => p.planId === selectedPlan), "plan")}
                                    className="text-red-500"
                                >
                                    <FiTrash2 size={16} />
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Meal Type</label>
                            <div className="flex items-center gap-2">
                                <select
                                    value={selectedMealType}
                                    onChange={(e) => setSelectedMealType(e.target.value)}
                                    className="p-2 w-full border border-gray-300 rounded text-sm cursor-pointer"
                                >
                                    {mealTypes.map((mealType) => (
                                        <option key={mealType.mealTypeId} value={mealType.mealTypeId}>
                                            {mealType.label}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={() =>
                                        handleEdit(mealTypes.find((m) => m.mealTypeId === selectedMealType), "mealType")
                                    }
                                    className="text-green-500"
                                >
                                    <FiEdit2 size={16} />
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

                        <div className="mb-6 flex flex-col gap-1 relative">
                            <label className="block text-sm font-medium text-gray-700">Set Your Meal Days</label>
                            <input
                                type="text"
                                placeholder="e.g., Mon-Fri"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                            />
                        </div>

                        {/* Flexible Dates */}
                        <div className="flex items-center gap-3">
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
                            <label className="font-medium text-gray-700">
                                Flexible Start/End Dates
                            </label>
                        </div>
                        <div>
                            {isFlexibleDates && (
                                <p className="text-sm text-gray-500 mb-3">
                                    Now users can set custom start and end dates for each order (e.g., Start: 7/Jan/2025, End: 10/Jan/2025).
                                </p>
                            )}
                        </div>
                        <div className="md:flex-row flex flex-col md:items-center gap-4 pt-3">
                            <button
                                onClick={() => handleAdd("plan")}
                                className="px-4 py-2 flex gap-2 items-center bg-red-500 text-white rounded text-sm font-semibold hover:bg-red-600 transition-colors"
                            >
                                <FiPlus /> <span>Add Plan</span>
                            </button>
                            <button
                                onClick={() => handleAdd("mealType")}
                                className="px-4 py-2 flex gap-2 items-center bg-blue-500 text-white rounded text-sm font-semibold hover:bg-blue-600 transition-colors"
                            >
                                <FiPlus /> <span>Add Meal Type</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {
                isEditing && (
                    <div className="fixed inset-0 pt-20 max-h-[100vh] overflow-auto flex items-center justify-center mx-auto bg-gray-800 bg-opacity-50">
                        <div className="bg-white p-6 rounded shadow w-[70vw] md:w-[40vw] max-h-[80vh] overflow-auto">
                            <h3 className="text-lg font-semibold mb-4">
                                {editingItem.type === "plan" ? "Edit Plan" : "Edit Meal Type"}
                            </h3>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Label
                                </label>
                                <input
                                    type="text"
                                    value={editingItem.label}
                                    onChange={(e) => setEditingItem({ ...editingItem, label: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            {editingItem.type === "mealType" && (
                                <div className="">
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Description
                                        </label>
                                        <textarea
                                            value={editingItem.description}
                                            onChange={(e) =>
                                                setEditingItem({ ...editingItem, description: e.target.value })
                                            }
                                            className="w-full p-2 border border-gray-300 rounded"
                                        ></textarea>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Price for each plan
                                        </label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {plans.map((plan) => (
                                                <div key={plan.planId} className="flex items-center gap-2 mb-3">
                                                    <span className="text-sm w-fit">{plan.label}</span>
                                                    <input
                                                        type="number"
                                                        value={editingItem.prices[plan.planId]}
                                                        onChange={(e) => {
                                                            const updatedPrices = { ...editingItem.prices, [plan.planId]: e.target.value };
                                                            setEditingItem({ ...editingItem, prices: updatedPrices });
                                                        }}
                                                        className="w-1/2 p-2 border border-gray-300 rounded text-sm"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => {
                                        setIsEditing(false);
                                        setEditingItem(null);
                                    }}
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default AdminTiffinService;


