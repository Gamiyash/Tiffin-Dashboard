import React, { useState,useEffect } from "react";
import TiffinLeftPanel from "../components/TiffinComponets/TiffinLeftPanel";
import TiffinRightPanel from "../components/TiffinComponets/TiffinRightPanle/TiffinRightPanel";
import TopBar from "../components/TopBar";
import TiffinDummyData from "../data/TiffinDummyData";
import { dummyinstructions } from "../data/TiffinDummyData";

export default function AddTiffin() {
    // Check localStorage to set the initial value of selectedComponet
    const initialComponent = localStorage.getItem("selectedComponent") || "Manage-Tiffin";
    const [selectedComponet, setSelectedComponet] = useState(initialComponent);
    const [selectedMealType, setSelectedMealType] = useState(null);
    const [SelectedInstruction, setSelectedInstruction] = useState(null);

    // Save the selected component whenever it changes
    useEffect(() => {
        if (selectedComponet) {
            localStorage.setItem("selectedComponent", selectedComponet);
        }
    }, [selectedComponet]);

    return (
        <div className="flex flex-col h-screen">
            <TopBar title="Tiffin Dashboard" />
            <div className="flex flex-1 overflow-hidden">
                <TiffinLeftPanel
                    mealTypes={TiffinDummyData.mealTypes}
                    instructions={dummyinstructions.instructions}
                    onSelectMealType={setSelectedMealType}
                    onSelectInstruction={setSelectedInstruction}
                    onselectComponet={setSelectedComponet} // Update selected component
                />
                <TiffinRightPanel
                    selectedComponet={selectedComponet} // Pass the selected component
                />
            </div>
        </div>
    );
}
