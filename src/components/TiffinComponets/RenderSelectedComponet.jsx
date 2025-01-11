import React from 'react'
import AddImages from './AddImages'
import AddInstruction from './AddInstruction'
import AddMeal from './AddMeal'
import ManageTiffinService_Images from './ManageTiffinService_Images'

const RenderSelectedComponet = ({ selectedMealType, SelectedInstruction, SelectedComponet }) => {
    if (SelectedComponet && !selectedMealType && !SelectedInstruction) {
        switch (SelectedComponet) {
            case "Add-Meal":
                return <AddMeal />;
            case "Add-Image":
                return <AddImages />;
            case "Add-Instruction":
                return <AddInstruction />;
            case "View-Images":
                return <ManageTiffinService_Images />
            default:
                return null; // Return nothing for unhandled cases
        }
    }

    return (
        <div className='w-full'>
            {SelectedComponet && !selectedMealType && !SelectedInstruction && (
                < div >
                    {SelectedComponet}
                </div>
            )}

        </div >
    )
}

export default RenderSelectedComponet
