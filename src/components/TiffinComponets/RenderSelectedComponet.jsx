import React from 'react'
import AddImages from './AddImages'
import AddInstruction from './AddInstruction'
import AdminTiffinService from './AddMeal'
import ManageTiffinService_Images from './ManageTiffinService_Images'
import ShowComments from './ShowComments'

const RenderSelectedComponet = ({ selectedMealType, SelectedInstruction, SelectedComponet }) => {
    // if (SelectedComponet && !selectedMealType && !SelectedInstruction) {
    //     switch (SelectedComponet) {
    //         case "Add-Meal":
    //             return <AddMeal />;
    //         case "Add-Image":
    //             return <AddImages />;
    //         case "Add-Instruction":
    //             return <AddInstruction />;
    //         case "View-Images":
    //             return <ManageTiffinService_Images />
    //         default:
    //             return null; // Return nothing for unhandled cases
    //     }
    // }

    if (SelectedComponet) {
        switch (SelectedComponet) {
            case "Manage-Tiffin":
                return <AdminTiffinService />;
            case "Comments":
                return <ShowComments />;
            case "Instructions":
                return <AddInstruction />;
            default:
                return null; // Return nothing for unhandled cases
        }
    }

    return (
        <div className='w-full'>
            {SelectedComponet && (
                < div >
                    {SelectedComponet}
                </div>
            )}

        </div >
    )
}

export default RenderSelectedComponet
