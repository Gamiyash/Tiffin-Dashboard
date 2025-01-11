import React, { useState, useEffect } from "react";
import TiffinHeaderComponet from "./TiffinHeaderComponet";

const plans = [
    { planId: "trial", label: "Trial (1 Day)" },
    { planId: "week", label: "Week" },
    { planId: "month", label: "Month" },
];

const ShowMealTypeDetails = ({ selectedMealType, SelectedInstruction, SelectedComponet }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [EditMealType, setEditMealType] = useState(selectedMealType || {});

    useEffect(() => {
        if (selectedMealType) {
            setEditMealType(selectedMealType);
        }
    }, [selectedMealType]);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditMealType((prev) => {
            if (prev[name] === value) return prev;
            return { ...prev, [name]: value };
        });
    };

    const handlePriceChange = (e, plan) => {
        const newPrice = e.target.value;
        setEditMealType((prev) => ({
            ...prev,
            prices: { ...prev.prices, [plan]: newPrice },
        }));
    };

    console.log("Selected Componet In Meal Tyep is :", SelectedComponet)

    const handleSave = () => {
        setEditMealType((prev) => {
            const updatedPrices = { ...prev.prices };
            const temporaryLabels = prev.temporaryLabels || {};

            Object.entries(temporaryLabels).forEach(([oldLabel, newLabel]) => {
                if (newLabel && oldLabel !== newLabel) {
                    updatedPrices[newLabel.toLowerCase()] = updatedPrices[oldLabel];
                    delete updatedPrices[oldLabel];
                }
            });

            return {
                ...prev,
                prices: updatedPrices,
                temporaryLabels: {},
            };
        });

        // setValidationStatus((prevStatus) => ({
        //     ...prevStatus,
        //     [EditMealType.mealTypeId]: validateMealType(EditMealType),
        // }));

        setIsEditMode(false);
    };

    const handleCancel = () => {
        setEditMealType(selectedMealType || {});
        setIsEditMode(false);
    };

    const handleDelete = () => {
        console.log("Delete functionality to be implemented");
    };

    const handleDuplicate = () => {
        console.log("Duplicate functionality to be implemented");
    };

    if (!selectedMealType || SelectedInstruction || SelectedComponet) {
        return null;
    }

    return (
        <div>
            <div className="flex flex-col gap-3">
                <TiffinHeaderComponet
                    title={selectedMealType.label || "Meal Type"}
                    isEditMode={isEditMode}
                    onEdit={() => setIsEditMode(true)}
                    onCancel={handleCancel}
                    onDelete={handleDelete}
                    onDuplicate={handleDuplicate}
                />

                {isEditMode ? (
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col">
                            <h1 className="text-sm pb-1">Meal Type</h1>
                            <input
                                type="text"
                                name="label"
                                value={EditMealType.label || ""}
                                onChange={handleEditChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-sm pb-1">Meal Description</h3>
                            <textarea
                                name="description"
                                value={EditMealType.description || ""}
                                onChange={handleEditChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <div className="flex flex-col gap-4">
                                {Object.entries(EditMealType.prices || {}).map(([plan, price], index) => (
                                    <div key={plan} className="flex items-center gap-2">
                                        <label htmlFor={plan} className="w-1/4">
                                            {plans.find(p => p.planId === plan)?.label || plan}
                                        </label>
                                        <input
                                            type="number"
                                            name={plan}
                                            value={price || ""}
                                            onChange={(e) => handlePriceChange(e, plan)}
                                            className="border border-gray-300 rounded-md p-2"
                                            placeholder="Price"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <button
                                onClick={handleSave}
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md mt-4"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col">
                            <h1 className="text-sm pb-1">Meal Type</h1>
                            <h2 className=" w-full bg-gray-100 px-2 py-2 rounded-md ">
                                {selectedMealType.label}
                            </h2>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-sm pb-1">Meal Description</h3>
                            <p className="w-full bg-gray-100 px-2 py-2 rounded-md ">
                                {selectedMealType.description}
                            </p>
                        </div>
                        <div>
                            <h4 className="">Pricing:</h4>
                            <ul className="list-disc ml-6 mt-2">
                                {Object.entries(selectedMealType.prices || {}).map(([plan, price]) => (
                                    <li key={plan} className="">
                                        {plans.find(p => p.planId === plan)?.label || plan} Plan: ${price}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShowMealTypeDetails;
