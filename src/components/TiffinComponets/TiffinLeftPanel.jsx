import React, { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineIntegrationInstructions } from "react-icons/md";
import { BiImageAdd } from "react-icons/bi";
import {
    FiPlusCircle,
} from "react-icons/fi";
import { RiCalendarTodoLine } from "react-icons/ri";


const TiffinLeftPanel = ({ mealTypes = [], instructions = [], onSelectMealType, onSelectInstruction, onselectComponet }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedMealType, setSelectedMealType] = useState(null);
    const [selectedInstruction, setselectedInstruction] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [selectedComponet, setselectedComponet] = useState(null);
    const [validationStatus, setValidationStatus] = useState({});
    const [validateInstructions, setvalidateInstructions] = useState({})

    useEffect(() => {
        const status = {};
        mealTypes.forEach((mealType) => {
            status[mealType.mealTypeId] = validateMealType(mealType);
        });
        setValidationStatus(status);
    }, [mealTypes]);

    const validateMealType = (mealType) => {
        if (!mealType) return false;

        const hasValidPrices = Object.values(mealType.prices || {}).every(price => price && price > 0);
        return mealType.label && mealType.description && hasValidPrices;
    };

    useEffect(() => {
        const status = {};
        instructions.forEach((instruction, idx) => {
            status[idx] = validateInstruction(instruction);
        });
        setvalidateInstructions(status);
    }, [instructions]);

    const validateInstruction = (instruction) => {
        return instruction.title && instruction.details;
    };

    const handleSelectedComponet = (componet) => {
        setselectedComponet(componet)
        onselectComponet(componet)
        // setSelectedMealType(null);
        // setselectedInstruction(null);
        // onSelectInstruction(null);
        // onSelectMealType(null);
        console.log("Selected Componet is:", selectedComponet);
    }

    const handleCategoryClick = (category) => {
        setSelectedCategory((prev) => (prev === category ? null : category));
    };

    // const handleMealTypeChange = (mealType) => {
    //     const newSelection = mealType;
    //     setSelectedMealType(newSelection);
    //     onSelectMealType(newSelection);
    //     setselectedInstruction(null);
    //     onSelectInstruction(null);
    //     setselectedComponet(null);
    //     onselectComponet(null);

    // }

    // const handleInstructionChange = (instruction) => {
    //     const newSelection = instruction;
    //     setselectedInstruction(newSelection);
    //     onSelectInstruction(newSelection);
    //     setSelectedMealType(null);
    //     onSelectMealType(null);
    //     setselectedComponet(null);
    //     onselectComponet(null);
    // }

    return (
        <div className="w-1/3 bg-gray-50 border-r border-gray-200 p-4 flex flex-col h-full overflow-y-auto custom-scrollbar">
            <section className="top-sec h-full">
                <h1 className="text-xl font-semibold mb-4 text-gray-700">Tiffin Details</h1>
                {/* Meal Types Dropdown */}
                {/* <div className="mb-2">
                    <div
                        className="cursor-pointer py-2 px-3 bg-white rounded-md shadow-sm hover:bg-gray-100 transition-all duration-300 ease-in-out flex justify-between items-center"
                        onClick={() => handleCategoryClick("mealTypes")}
                    >
                        <h2 className=" font-semibold text-gray-700">Meal Types ({mealTypes.length})</h2>
                        <FiChevronDown
                            className={`text-gray-500 transition-transform duration-300 ${selectedCategory === "mealTypes" ? "rotate-180" : ""
                                }`}
                        />
                    </div>
                    <AnimatePresence>
                        {selectedCategory === "mealTypes" && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden  mt-2 flex flex-col gap-1"
                            >
                                {mealTypes.map((mealType, idx) => (
                                    <div
                                        onClick={() => handleMealTypeChange(mealType)}
                                        key={mealType.mealTypeId}
                                        className="hover:bg-gray-100 rounded-md py-2 px-2 flex items-center gap-2">
                                        
                                        <button className="px-4 flex items-center gap-2">
                                            <span>{mealType.label}</span>
                                            {!validationStatus[mealType.mealTypeId] && (
                                                <span className="w-2 h-2 bg-red-500 rounded-full mt-1"></span>
                                            )}</button>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div> */}

                {/* Instructions Dropdown */}
                {/* <div className="mb-2">
                    <div
                        className="cursor-pointer py-2 px-3 bg-white rounded-md shadow-sm hover:bg-gray-100 transition-all duration-300 ease-in-out flex justify-between items-center"
                        onClick={() => handleCategoryClick("instructions")}
                    >
                        <h2 className="font-semibold text-gray-700">Instructions ({instructions.length})</h2>
                        <FiChevronDown
                            className={`text-gray-500 transition-transform duration-300 ${selectedCategory === "instructions" ? "rotate-180" : ""
                                }`}
                        />
                    </div>
                    <AnimatePresence>
                        {selectedCategory === "instructions" && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden mt-2 flex flex-col gap-1 "
                            >
                                {instructions.map((instruction, idx) => (
                                    <div
                                        onClick={() => handleInstructionChange(instruction)}
                                        key={idx}
                                        className="hover:bg-gray-100 rounded-md py-2 px-2 flex gap-2 items-center">
                                    
                                        <h4 className=" px-4">{instruction.title}</h4>
                                        {!validateInstructions[idx] && (
                                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                        )}
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div> */}

                <div onClick={() => handleSelectedComponet("Manage-Tiffin")} className="mb-2">
                    <div
                        className="cursor-pointer py-2 px-3 bg-white rounded-md shadow-sm hover:bg-gray-100 transition-all duration-300 ease-in-out flex justify-between items-center"
                        onClick={() => handleCategoryClick("Manage-Tiffin")}
                    >
                        <h2 className="font-semibold text-gray-700">Manage-Tiffin</h2>
                        {/* <FiChevronDown
                            className={`text-gray-500 transition-transform duration-300 ${selectedCategory === "Manage-Tiffin" ? "rotate-[450deg]" : ""
                                }`}
                        /> */}
                    </div>
                </div>

                <div onClick={() => handleSelectedComponet("Instructions")} className="mb-2">
                    <div
                        className="cursor-pointer py-2 px-3 bg-white rounded-md shadow-sm hover:bg-gray-100 transition-all duration-300 ease-in-out flex justify-between items-center"
                        onClick={() => handleCategoryClick("Instructions")}
                    >
                        <h2 className="font-semibold text-gray-700">Instructions</h2>
                        {/* <FiChevronDown
                            className={`text-gray-500 transition-transform duration-300 ${selectedCategory === "Instructions" ? "rotate-[450deg]" : ""
                                }`}
                        /> */}
                    </div>
                </div>

                <div onClick={() => handleSelectedComponet("Comments")} className="mb-2">
                    <div
                        className="cursor-pointer py-2 px-3 bg-white rounded-md shadow-sm hover:bg-gray-100 transition-all duration-300 ease-in-out flex justify-between items-center"
                        onClick={() => handleCategoryClick("Comments")}
                    >
                        <h2 className="font-semibold text-gray-700">Comments</h2>
                        {/* <FiChevronDown
                            className={`text-gray-500 transition-transform duration-300 ${selectedCategory === "Comments" ? "rotate-[450deg]" : ""
                                }`}
                        /> */}
                    </div>
                </div>

            </section>
            {/* <section className="bottom-sec">
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex flex-col w-full gap-2">
                        <button
                            onClick={() => handleSelectedComponet("Add-Meal")}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-all"
                        >
                            <FiPlusCircle size={18} className="text-red-500" />
                            <span className="text-gray-700 text-sm font-medium">Add Meal</span>
                        </button>

                        <button
                            onClick={() => handleSelectedComponet("Add-Instruction")}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-all"
                        >
                            <MdOutlineIntegrationInstructions size={18} className="text-yellow-500" />
                            <span className="text-gray-700 text-sm font-medium">Add Instruction</span>
                        </button>

                        <button
                            onClick={() => handleSelectedComponet("Add-Image")}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-all"
                        >
                            <BiImageAdd size={18} className="text-blue-500" />
                            <span className="text-gray-700 text-sm font-medium">Add Image</span>
                        </button>
                    </div>


                </div>
            </section> */}
        </div>
    );
};

export default TiffinLeftPanel;

