import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

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
  Text,
} from "recharts";

const API_URL = import.meta.env.VITE_API_URL;
const COLORS = ["#1E3A8A", "#10B981", "#F59E0B"];

const fetchCandidateStatistics = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/candidates/statistics/st`,
      {
        withCredentials: true,
      }
    );
    return [
      { name: "Total Candidates", value: response.data.totalCandidates },
      { name: "Offers Made", value: response.data.offersMade },
      { name: "Candidates Joined", value: response.data.candidatesJoined },
      { name: "monthlyData", value: response.data.monthlyData || [] },
    ];
  } catch (error) {
    console.error("Error fetching candidate statistics:", error);
    throw error;
  }
};

const Charts = () => {
  const [data, setData] = useState([]);
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await fetchCandidateStatistics();
        setData(stats);

        const monthlyData = stats.find(
          (st) => st.name === "monthlyData"
        )?.value;
        if (Array.isArray(monthlyData)) {
          setTimelineData(
            monthlyData.map(({ month, applications }) => ({
              date: month,
              applications,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching candidate statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {/* Pie Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          Candidate Status
        </h3>
        {loading ? (
          <div className="flex items-center justify-center h-64 ">
            <FaSpinner className="animate-spin text-blue-800 text-4xl" />
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                {data.filter(
                  (item) => item.name !== "monthlyData" && item.value > 0
                ).length > 0 && (
                  <Pie
                    data={data.filter(
                      (item) => item.name !== "monthlyData" && item.value > 0
                    )}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({
                      cx,
                      cy,
                      midAngle,
                      innerRadius,
                      outerRadius,
                      index,
                    }) => {
                      const RADIAN = Math.PI / 180;
                      const radius =
                        innerRadius + (outerRadius - innerRadius) / 2;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                      const filteredData = data.filter(
                        (item) => item.name !== "monthlyData" && item.value > 0
                      );

                      return (
                        <Text
                          x={x}
                          y={y}
                          fill="white"
                          textAnchor="middle"
                          dominantBaseline="central"
                          className="text-sm font-bold"
                        >
                          {filteredData[index]?.value}
                        </Text>
                      );
                    }}
                    labelLine={false}
                  >
                    {data
                      .filter(
                        (item) => item.name !== "monthlyData" && item.value > 0
                      )
                      .map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                  </Pie>
                )}

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Line Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          Application Timeline
        </h3>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <FaSpinner className="animate-spin text-blue-800 text-4xl" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
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
        )}
      </div>
    </div>
  );
};

export default Charts;
