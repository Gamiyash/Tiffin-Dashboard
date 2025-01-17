import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineIntegrationInstructions } from "react-icons/md";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const AddInstruction = () => {
    const [instructionData, setInstructionData] = useState([]);
    const [newInstruction, setNewInstruction] = useState({
        title: "",
        details: "",
    });
    const [editingIndex, setEditingIndex] = useState(null); // Track the index being edited
    const [editInstruction, setEditInstruction] = useState({
        title: "",
        details: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Load initial instructions from the backend
    useEffect(() => {
        const fetchInstructions = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/menu`);
                // console.log("Backend URL is:",import.meta.env.VITE_BACKEND_URL)
                setInstructionData(response.data.instructions || []);
            } catch (err) {
                console.error("Error loading instructions:", err);
            }
        };
        fetchInstructions();
    }, []);

    const handleInstructionChange = (e) => {
        const { name, value } = e.target;
        setNewInstruction((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditClick = (index) => {
        setEditingIndex(index);
        setEditInstruction({ ...instructionData[index] });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditInstruction((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        if (!newInstruction.title || !newInstruction.details) {
            setError("Both title and details are required.");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            // Send data to backend to add instruction
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/add-instruction`, {
                title: newInstruction.title,
                details: newInstruction.details,
            });

            // Update the state with the newly added instruction
            const newInstructionWithId = { ...newInstruction, _id: response.data._id };

            // Add the new instruction to the state
            setInstructionData((prevData) => [...prevData, newInstructionWithId]);

            // Clear the input fields
            setNewInstruction({ title: "", details: "" });
        } catch (err) {
            setError("Error saving instruction.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveEdit = async (index) => {
        if (!editInstruction.title || !editInstruction.details) {
            setError("Both title and details are required.");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            // Send data to backend to edit instruction
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/edit-instruction/${instructionData[index]._id}`, {
                title: editInstruction.title,
                details: editInstruction.details,
            });

            // Update the state with the updated instruction
            const updatedInstructions = [...instructionData];
            updatedInstructions[index] = { ...editInstruction };
            setInstructionData(updatedInstructions);
            setEditingIndex(null); // Close the editing mode
        } catch (err) {
            setError("Error updating instruction.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
        setEditInstruction({ title: "", details: "" });
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this instruction?");
        if (!confirmDelete) return;
      
        try {
          // Call the backend API to delete the instruction
          await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/delete-instruction/${id}`);
      
          // Update the state to remove the deleted instruction
          setInstructionData((prevData) => prevData.filter((instruction) => instruction._id !== id));
      
          alert("Instruction deleted successfully.");
        } catch (err) {
          console.error("Error deleting instruction:", err);
          alert("Failed to delete instruction.");
        }
      };
      

    return (
        <div className="flex flex-col w-full h-full">
            <div className="bg-white">
                {/* Add Instruction Section */}
                <div>
                    <h3 className="text-lg font-medium text-gray-800">Add Instruction</h3>
                    <input
                        type="text"
                        name="title"
                        value={newInstruction.title}
                        onChange={handleInstructionChange}
                        placeholder="Instruction Title"
                        className="w-full border border-gray-300 rounded-md p-2 mt-1 mb-2"
                    />
                    <textarea
                        name="details"
                        value={newInstruction.details}
                        onChange={handleInstructionChange}
                        placeholder="Instruction Details"
                        className="w-full border border-gray-300 rounded-md p-2 mb-1"
                    />
                    <button
                        onClick={handleSave}
                        className="bg-red-500 py-2 px-2 flex gap-2 items-center rounded-md hover:bg-red-600"
                    >
                        <MdOutlineIntegrationInstructions size={18} className="text-white" />
                        <span className="text-white font-medium text-sm">Add Instruction</span>
                    </button>
                </div>
            </div>

            <div className="space-y-2 mt-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Instructions</h2>
                {instructionData.map((instruction, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-4 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
                    >
                        {editingIndex === index ? (
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    name="title"
                                    value={editInstruction.title}
                                    onChange={handleEditChange}
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <textarea
                                    name="details"
                                    value={editInstruction.details}
                                    onChange={handleEditChange}
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-3  bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleSaveEdit(index)}
                                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors duration-200"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancelEdit}
                                        className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-md transition-colors duration-200"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h3 className="font-semibold  text-gray-800 dark:text-white">{instruction.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-1 text-sm">{instruction.details}</p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEditClick(index)}
                                        className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1 transition-colors duration-200"
                                    >
                                        <FiEdit /> Edit
                                    </button>
                                    <button
                                    onClick={() => handleDelete(instruction._id)}
                                        className="text-red-500 hover:text-red-600 text-sm flex items-center gap-1 transition-colors duration-200"
                                    >
                                        <FiTrash2 /> Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddInstruction;
