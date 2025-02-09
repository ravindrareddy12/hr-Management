import React from "react";

const Charts = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded shadow h-64">
        Candidate Status (Pie Chart)
      </div>
      <div className="bg-white p-4 rounded shadow h-64">
        Applications Timeline (Line Chart)
      </div>
    </div>
  );
};

export default Charts;
