// import React from "react";
// import moment from "moment";

// const ProgressBar = ({ order }) => {
//     if (!order || !order.subStatus) {
//         // Return fallback UI if order or subStatus is undefined
//         return <div>Loading...</div>;
//     }

//     const today = moment().startOf("day");
//     const progressSteps = ["New Order", "Processing", "Delivered"];
//     // let currentStep = 1; // Default to "Processing"

//     // Find today's subStatus
//     const subStatusForToday = order.subStatus.find((sub) =>
//         moment(sub.date).isSame(today, "day")
//     );

//     console.log("Substatus:", subStatusForToday);

//     // if (subStatusForToday && subStatusForToday.status === "Delivered") {
//     //     currentStep = 3; // Move to "Delivered" for today
//     // }

//     return (
//         <div className="flex items-center gap-0">
//             {progressSteps.map((step, index) => (
//                 <div key={index} className="flex items-center">
//                     <div className="flex flex-col items-center">
//                         <div
//                             className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${order.subStatus.status === "Delivered" && subStatusForToday && step === "Delivered"
//                                 ? "bg-green-400"
//                                 : order.status === step
//                                     ? "bg-blue-500"
//                                     : progressSteps.indexOf(order.status) > index
//                                         ? "bg-green-400"
//                                         : "bg-gray-300"
//                                 }`}
//                         >
//                             {index + 1}
//                         </div>
//                         <div className="text-[10px] mt-1 text-gray-600 whitespace-nowrap">
//                             {step}
//                         </div>
//                     </div>
//                     {index < progressSteps.length - 1 && (
//                         <div className="flex flex-col">
//                             <div
//                                 className={`h-1 w-10 mt-2 ${progressSteps.indexOf(order.status) > index
//                                     ? "bg-green-400"
//                                     : "bg-gray-300"
//                                     }`}
//                             ></div>
//                             <div className="h-6" />
//                         </div>
//                     )}
//                 </div>
//             ))}
//         </div>
//         // <div className="flex items-center gap-0">
//         //     {progressSteps.map((step, index) => (
//         //         <div key={index} className="flex items-center">
//         //             {/* Step Indicator */}
//         //             <div className="flex flex-col items-center">
//         //                 <div
//         //                     className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
//         //                         index + 1 < currentStep
//         //                             ? "bg-green-400" // Completed steps
//         //                             : index + 1 === currentStep
//         //                             ? "bg-blue-500" // Current step
//         //                             : "bg-gray-300" // Incomplete steps
//         //                     }`}
//         //                 >
//         //                     {index + 1}
//         //                 </div>
//         //                 <div className="text-[10px] mt-1 text-gray-600 whitespace-nowrap">
//         //                     {step}
//         //                 </div>
//         //             </div>

//         //             {/* Connector Line */}
//         //             {index < progressSteps.length - 1 && (
//         //                 <div
//         //                     className={`h-1 w-10 mb-4 ${
//         //                         index + 1 < currentStep ? "bg-green-400" : "bg-gray-300"
//         //                     }`}
//         //                 ></div>
//         //             )}
//         //         </div>
//         //     ))}
//         // </div>
//     );
// };

// export default ProgressBar;

import React from "react";
import moment from "moment";

const ProgressBar = ({ order }) => {
    if (!order || !order.subStatus) {
        // Return fallback UI if order or subStatus is undefined
        return <div>Loading...</div>;
    }

    const today = moment().startOf("day");
    const progressSteps = ["New Order", "Processing", "Delivered"];

    // Find today's subStatus
    const subStatusForToday = order.subStatus.find((sub) =>
        moment(sub.date).isSame(today, "day")
    );

    // Determine the current step
    let currentStep = 1; // Default to "Processing"

    if (subStatusForToday) {
        if (subStatusForToday.status === "Delivered") {
            currentStep = 3; // Today's step is "Delivered"
        } else {
            currentStep = 2; // Default to "Processing" if not delivered
        }
    }

    return (
        <div className="flex items-center gap-0">
            {progressSteps.map((step, index) => (
                <div key={index} className="flex items-center">
                    {/* Step Indicator */}
                    <div className="flex flex-col items-center">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                                index + 1 < currentStep
                                    ? "bg-green-400"
                                    : index + 1 === currentStep
                                    ? "bg-blue-500"
                                    : "bg-gray-300" 
                            }`}
                        >
                            {index + 1}
                        </div>
                        <div className="text-[10px] mt-1 text-gray-600 whitespace-nowrap">
                            {step}
                        </div>
                    </div>

                    {/* Connector Line */}
                    {index < progressSteps.length - 1 && (
                        <div
                            className={`h-1 w-10 mb-4 ${
                                index + 1 < currentStep ? "bg-green-400" : "bg-gray-300"
                            }`}
                        ></div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProgressBar;
