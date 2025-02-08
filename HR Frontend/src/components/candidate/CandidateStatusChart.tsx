import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CandidateStatusChart = ({ candidates }) => {
  // Count the status of candidates
  const statusCounts = candidates.reduce((acc, candidate) => {
    acc[candidate.status] = (acc[candidate.status] || 0) + 1;
    return acc;
  }, {});

  // Prepare data for the pie chart
  const data = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"], // Colors for each status
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-2xl">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
        Candidate Status Distribution
      </h2>
      <div className="flex justify-center items-center">
        <Pie data={data} />
      </div>
      <div className="mt-6">
        <ul className="flex flex-wrap justify-center gap-4">
          {Object.keys(statusCounts).map((status, index) => (
            <li key={index} className="flex items-center gap-2">
              <span
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"][
                    index
                  ],
                }}
              ></span>
              <span className="text-gray-600 text-sm">
                {status}: {statusCounts[status]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CandidateStatusChart;
