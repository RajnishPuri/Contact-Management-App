import React, { useState } from "react";
import Chart from "../Components/chart";
import Maps from "../Components/maps";

const ChartsMaps: React.FC = () => {
  // State to track the active tab (charts or maps)
  const [activeTab, setActiveTab] = useState<"charts" | "maps">("charts");

  // Handler for the charts tab click
  const chartsHandler = () => {
    setActiveTab("charts");
  };

  // Handler for the maps tab click
  const mapsHandler = () => {
    setActiveTab("maps");
  };

  return (
    <div className="p-3">
      {/* Tab navigation */}
      <div className="w-full h-1/5 flex justify-center">
        <div className="h-10 border flex text-white gap-3 items-center p-3 rounded-xl">
          {/* Charts tab */}
          <div
            className={`h-6 rounded-lg flex justify-center items-center p-2 cursor-pointer ${
              activeTab === "charts" ? "bg-blue-500" : ""
            }`}
            onClick={chartsHandler}
          >
            <h1>Charts</h1>
          </div>
          {/* Maps tab */}
          <div
            className={`h-6 rounded-lg flex justify-center items-center p-2 cursor-pointer ${
              activeTab === "maps" ? "bg-blue-500" : ""
            }`}
            onClick={mapsHandler}
          >
            <h1>Maps</h1>
          </div>
        </div>
      </div>
      {/* Render the selected component (Chart or Maps) */}
      <div className="text-white">
        {activeTab === "charts" ? (
          <Chart />
        ) : (
          <Maps />
        )}
      </div>
    </div>
  );
};

export default ChartsMaps;
