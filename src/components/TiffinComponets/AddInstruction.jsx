import React, { useState } from "react";
import { MdOutlineIntegrationInstructions } from "react-icons/md";

const AddInstruction = ({ instructions = [] }) => {
    const [instructionData, setInstructionData] = useState(instructions);
    const [newInstruction, setNewInstruction] = useState({
        title: "",
        details: "",
    });

    const handleInstructionChange = (e) => {
        const { name, value } = e.target;
        setNewInstruction((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddInstruction = () => {
        if (newInstruction.title && newInstruction.details) {
            setInstructionData((prev) => [
                ...prev,
                { ...newInstruction, id: `custom-${instructionData.length + 1}` },
            ]);
            setNewInstruction({ title: "", details: "" });
        }
    };

    return (
        <div className="flex w-full h-full">
            <div className="w-full bg-white p-4 overflow-y-auto custom-scrollbar">
                {/* Add Instruction Section */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-700">Add Instruction</h3>
                    <input
                        type="text"
                        name="title"
                        value={newInstruction.title}
                        onChange={handleInstructionChange}
                        placeholder="Instruction Title"
                        className="w-full border border-gray-300 rounded-md p-2 mt-2 mb-4"
                    />
                    <textarea
                        name="details"
                        value={newInstruction.details}
                        onChange={handleInstructionChange}
                        placeholder="Instruction Details"
                        className="w-full border border-gray-300 rounded-md p-2 mb-4"
                    />
                    <button
                        onClick={handleAddInstruction}
                        className="bg-[#ffbf00] py-2 px-4 flex gap-2 items-center rounded-md hover:bg-[#e6ac00]"
                    >
                        <MdOutlineIntegrationInstructions size={18} className="text-white" />
                        <span className="text-white font-medium"> Add Instruction</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddInstruction;