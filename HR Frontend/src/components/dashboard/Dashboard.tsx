import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaBriefcase,
  FaHandshake,
  FaRegCheckCircle,
} from "react-icons/fa"; // Import FontAwesome icons
import PageContainer from "../layout/PageContainer";
import { useAuth } from "../../contexts/AuthContext"; // Import useAuth
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import AlertMessages from "./AlertMessages";

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
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const handleView = (id: string) => {
    navigate(`/candidateDetails/${id}`); // Redirects to the candidate details page
  };
  const { user } = useAuth(); // Get the logged-in user

  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const COLORS = ["#1E3A8A", "#047857", "#D97706", "#DC2626"];

  const handleDelete = async (id: string) => {
    await fetch(`http://localhost:5003/api/candidates/${id}`, {
      method: "DELETE",
    });
    fetchCandidates();
  };

  const handleEdit = (id: string) => {
    navigate(`/recruitmentForm/${id}`);
  };
  const [alert, setAlert] = useState({
    message: "",
    type: "success" as "success" | "error" | "info" | "warning" | "dark",
    show: false,
  });

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
  const fetchCandidates = async () => {
    const response = await fetch("http://localhost:5003/api/candidates");
    const data = await response.json();
    setCandidates(data);
    setFilteredCandidates(data);
  };
  const [stats, setStats] = useState({
    totalCandidates: 0,
    activePositions: 0,
    offersMade: 0,
    candidatesJoined: 0,
  });

  const statistics = [
    {
      title: "Total Candidates",
      value: stats.totalCandidates,
      icon: <FaUsers size={30} className="text-blue-800" />,
    },
    {
      title: "Active Positions",
      value: stats.activePositions,
      icon: <FaBriefcase size={30} className="text-blue-800" />,
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
  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "Accepted":
        return "bg-gradient-to-r from-green-800 to-green-800 text-white";
      case "Released":
        return "bg-gradient-to-r from-yellow-800 to-yellow-800 text-white";
      case "Declined":
        return "bg-gradient-to-r from-red-800 to-red-800 text-white";
      case "Pending":
        return "bg-gradient-to-r from-blue-800 to-blue-800 text-white";
      default:
        return "bg-gradient-to-r from-gray-800 to-gray-800 text-white";
    }
  };

  return (
    <PageContainer title={"Dashboard"}>
      <div className="p-6 space-y-9 bg-gray-100">
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
            <table className="w-full text-left border border-gray-300">
              <thead className=" bg-gray-200  shadow-md">
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

                    <td className="border border-gray-300 p-2">
                      {user?.role !== "team-member" ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(candidate._id)}
                            className="px-4 py-2 rounded bg-transparent text-blue-600 hover:text-white hover:bg-gray-800"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(candidate._id)}
                            className="px-4 py-2 rounded bg-transparent text-red-600 hover:text-white hover:bg-blue-800"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => handleView(candidate._id)}
                            className="px-4 py-2 rounded bg-transparent text-gray-800 hover:text-white hover:bg-blue-800"
                          >
                            View
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleView(candidate._id)}
                          className="px-4 py-2 rounded bg-transparent text-gray-800 hover:text-white hover:bg-blue-800"
                        >
                          View
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
