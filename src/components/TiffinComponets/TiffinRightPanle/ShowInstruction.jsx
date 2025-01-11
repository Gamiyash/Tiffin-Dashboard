import React, { useState, useEffect } from 'react';
import TiffinHeaderComponet from './TiffinHeaderComponet';

const ShowInstruction = ({ selectedMealType, SelectedInstruction, SelectedComponet }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [EditInstruction, setEditInstruction] = useState(SelectedInstruction);

    useEffect(() => {
        if (SelectedInstruction) {
            setEditInstruction(SelectedInstruction);
        }
    }, [SelectedInstruction]);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditInstruction((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        console.log("Save functionality to be implemented with new data:", EditInstruction);
        setIsEditMode(false); // Exit edit mode
    };

    const handleCancel = () => {
        setEditInstruction(SelectedInstruction); // Revert changes
        setIsEditMode(false); // Exit edit mode
    };

    const handleDelete = () => {
        console.log("Delete functionality to be implemented");
    };

    const handleDuplicate = () => {
        console.log("Duplicate functionality to be implemented");
    };

    return (
        <div>
            {SelectedInstruction && !selectedMealType && !SelectedComponet && (
                <div className="flex flex-col gap-3">
                    <TiffinHeaderComponet
                        title={SelectedInstruction.title}
                        isEditMode={isEditMode}
                        onEdit={() => setIsEditMode(true)}
                        onCancel={handleCancel}
                        onDelete={handleDelete}
                        onDuplicate={handleDuplicate}
                    />
                    {isEditMode ? (
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col">
                                <h1 className="text-sm pb-1">Instruction Title</h1>
                                <input
                                    type="text"
                                    name="title"
                                    value={EditInstruction.title}
                                    onChange={handleEditChange}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-sm pb-1">Instruction Details</h3>
                                <textarea
                                    name="details"
                                    value={EditInstruction.details}
                                    onChange={handleEditChange}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <div>
                                <button
                                    onClick={handleSave}
                                    className="bg-[#ffbf00] text-white py-2 px-4 rounded-md hover:bg-[#e6ac00] mt-4"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className='flex flex-col gap-3'>
                            <div className="flex flex-col">
                                <h1 className="text-sm pb-1">Instruction Title</h1>
                                <h2 className=" w-full bg-gray-100 px-2 py-2 rounded-md mb-2">
                                    {SelectedInstruction.title}
                                </h2>
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-sm pb-1">Instruction Details</h3>
                                <p className="w-full bg-gray-100 px-2 py-2 rounded-md mb-2">
                                    {SelectedInstruction.details}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ShowInstruction;
