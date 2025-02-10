import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
const [data, setData] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/candidates/statistics`);
      setData([
        { name: "Total Candidates", value: response.data.totalCandidates },
        { name: "Offers Made", value: response.data.offersMade },
        { name: "Candidates Joined", value: response.data.candidatesJoined },
      ]);
    } catch (error) {
      console.error("Error fetching candidate statistics:", error);
    }
  };

  fetchData();
}, []);
const COLORS = ["#1E3A8A", "#10B981", "#F59E0B"];

// Custom label function to position numbers inside the ring
const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  index,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) / 2; // Position inside the ring
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-sm font-bold"
    >
      {data[index].value}
    </text>
  );
};
const applicationData = [
  { date: "Jan 1", applications: 5 },
  { date: "Jan 5", applications: 12 },
  { date: "Jan 10", applications: 18 },
  { date: "Jan 15", applications: 25 },
  { date: "Jan 20", applications: 32 },
  { date: "Jan 25", applications: 45 },
  { date: "Jan 30", applications: 50 },
];

const Charts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {/* Pie Chart Card */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          Candidate Status
        </h3>
        <div className="flex justify-center items-center h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={renderCustomLabel} // Calls the function to place count inside
                labelLine={false} // Removes connecting lines
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Placeholder for Line Chart */}
      {/* Application Timeline Line Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          Application Timeline
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={applicationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="applications"
              stroke="#1E3A8A"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
function fetchData() {
  throw new Error("Function not implemented.");
}

