import React, { useState } from "react";
import TiffinLeftPanel from "../components/TiffinComponets/TiffinLeftPanel";
import TiffinRightPanel from "../components/TiffinComponets/TiffinRightPanle/TiffinRightPanel";
import TopBar from "../components/TopBar";
import TiffinDummyData from "../data/TiffinDummyData";
import { dummyinstructions } from "../data/TiffinDummyData";

export default function AddTiffin() {
    const [selectedMealType, setSelectedMealType] = useState(null);
    const [SelectedInstruction, setSelectedInstruction] = useState(null);
    const [selectedComponet, setselectedComponet] = useState("Manage-Tiffin")

    return (
        <div className="flex flex-col h-screen">
            <TopBar title="Tiffin Dashboard" />
            <div className="flex flex-1 overflow-hidden">
                <TiffinLeftPanel
                    mealTypes={TiffinDummyData.mealTypes}
                    instructions={dummyinstructions.instructions}
                    onSelectMealType={setSelectedMealType}
                    onSelectInstruction={setSelectedInstruction}
                    onselectComponet={setselectedComponet}
                />
                <TiffinRightPanel
                    // selectedMealType={selectedMealType}
                    // SelectedInstruction={SelectedInstruction}
                    selectedComponet={selectedComponet}
                    // instructions={dummyinstructions.instructions}
                />
            </div>
        </div>
    );
}
