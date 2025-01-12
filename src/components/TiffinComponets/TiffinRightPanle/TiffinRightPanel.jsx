import React from "react";
import ShowMealTypeDetails from "./ShowMealTypeDetails";
import ShowInstruction from "./ShowInstruction";
import RenderSelectedComponet from "../RenderSelectedComponet";
import ManageService from "./ManageService";

const TiffinRightPanel = ({ selectedComponet }) => {
    return (
        <div className="w-full bg-white p-4 overflow-y-auto custom-scrollbar">
            {/* <ShowMealTypeDetails
                selectedMealType={selectedMealType}
                SelectedInstruction={SelectedInstruction}
                SelectedComponet={selectedComponet}
            />
            <ShowInstruction
                selectedMealType={selectedMealType}
                SelectedInstruction={SelectedInstruction}
                SelectedComponet={selectedComponet}
            /> */}
            <RenderSelectedComponet
                // selectedMealType={selectedMealType}
                // SelectedInstruction={SelectedInstruction}
                SelectedComponet={selectedComponet}
            />
            {/* <ManageService /> */}
        </div>
    );
};

export default TiffinRightPanel;

