import React from "react";
import {
  FaUsers,
  FaBriefcase,
  FaHandshake,
  FaRegCheckCircle,
} from "react-icons/fa";

const Statistics = ({ stats }) => {
  const statistics = [
    {
      title: "Total Candidates",
      value: stats.totalCandidates,
      icon: <FaUsers size={30} className="text-blue-800" />,
    },

    {
      title: "Offers Made",
      value: stats.offersMade,
      icon: <FaHandshake size={30} className="text-blue-800" />,
    },
    {
      title: "Candidates Joined",
      value: stats.candidatesJoined,
      icon: <FaRegCheckCircle size={30} className="text-blue-800" />,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {statistics.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded shadow text-center border"
        >
          <h3 className="text-gray-500 flex items-center justify-center space-x-2">
            {stat.icon}
            <span>{stat.title}</span>
          </h3>
          <p className="text-2xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default Statistics;
