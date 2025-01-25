import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaBriefcase,
  FaHandshake,
  FaRegCheckCircle,
} from "react-icons/fa"; // Import FontAwesome icons

// Define types for statistics and recent candidates
interface Statistic {
  title: string;
  value: string;
  change: string;
  icon: JSX.Element; // Added icon prop
}

interface Candidate {
  candidateName: string;
  position: string;
  date: string;
  _id: string;
  workStatus: string;
  offerStatus: string;
  internalInterviewDate: string;
}

const Dashboard: React.FC = () => {
  const [recentCandidates, setRecentCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentCandidates = async () => {
      try {
        const response = await axios.get<Candidate[]>(
          "http://localhost:5003/api/candidates/recent/limit"
        );
        setRecentCandidates(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch recent candidates");
        setLoading(false);
      }
    };

    fetchRecentCandidates();
  }, []);

  const statistics: Statistic[] = [
    {
      title: "Total Candidates",
      value: "99999",
      change: "+12%",
      icon: <FaUsers size={30} className="text-blue-500" />, // Blue icon
    },
    {
      title: "Active Positions",
      value: "99999",
      change: "+8%",
      icon: <FaBriefcase size={30} className="text-yellow-500" />, // Yellow icon
    },
    {
      title: "Offers Made",
      value: "99999",
      change: "+24%",
      icon: <FaHandshake size={30} className="text-green-500" />, // Green icon
    },
    {
      title: "Candidates Joined",
      value: "99999",
      change: "+16%",
      icon: <FaRegCheckCircle size={30} className="text-teal-500" />, // Teal icon
    },
  ];

  const handleEdit = (id: string): void => {
    navigate(`/recruitmentForm/${id}`);
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "Accepted":
        return "bg-green-500 text-white"; // Green background for Accepted
      case "Released":
        return "bg-yellow-500 text-white"; // Yellow background for Released
      case "Declined":
        return "bg-red-500 text-white"; // Red background for Declined
      case "Pending":
        return "bg-blue-500 text-white"; // Blue background for Pending
      default:
        return "bg-gray-300 text-gray-700"; // Default background for no status
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100">
      {/* Statistics Section */}
      <div className="grid grid-cols-4 gap-4">
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
            <p className="text-green-500 text-sm">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow h-64">
          Candidate Status (Pie Chart)
        </div>

        <div className="bg-white p-4 rounded shadow h-64">
          Applications Timeline (Line Chart)
        </div>
      </div>

      {/* Recent Candidates Section */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-bold mb-4">Recent Candidates</h3>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="w-full text-left border">
            <thead>
              <tr className="border-b">
                <th className="p-2">Candidate Name</th>
                <th className="p-2">Position</th>
                <th className="p-2"> Offer Status</th>
                <th className="p-2"> Interview Date</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentCandidates.map((candidate) => (
                <tr key={candidate._id} className="border-b">
                  <td className="p-2">{candidate.candidateName}</td>
                  <td className="p-2">{candidate.position}</td>
                  <td className="p-2">
                    <span
                      className={`px-4 py-1 rounded-full ${getStatusColor(
                        candidate.offerStatus
                      )}`}
                    >
                      {candidate.offerStatus}
                    </span>
                  </td>
                  <td className="p-2">
                    {candidate.internalInterviewDate
                      ? new Date(
                          candidate.internalInterviewDate
                        ).toLocaleDateString("en-CA")
                      : ""}
                  </td>

                  <td className="p-2">
                    <button
                      onClick={() => handleEdit(candidate._id)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
