import React, { useState, useEffect } from "react";
import DashboardAnalytics from "../components/DashboardComponets/Analytics";
import TodayOrdersSummary from "../components/DashboardComponets/TodaysOrderSummary";
import { FaArrowLeftLong } from "react-icons/fa6";
import DashboardStats from "../components/DashboardComponets/DashboardStats";


export default function DashboardHome() {
  return (
    <div className="space-y-2">
      <div>
        <DashboardStats/>
      </div>

      <div className="md:flex-row flex flex-col gap-2 md:h-[70vh] h-full">
        <DashboardAnalytics />
      </div>

      <div>
        <TodayOrdersSummary />
      </div>
    </div >
  );
}

