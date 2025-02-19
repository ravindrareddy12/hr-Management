import React, { useEffect, useState } from "react";
import PageContainer from "../layout/PageContainer";
import Statistics from "./Statistics";
import Charts from "./Charts";
import RecentCandidates from "./RecentCandidates";
import axios from "axios";
import { fetchCandidateStatistics } from "./service";
import { FaSpinner } from "react-icons/fa"; // Import spinner

const API_URL = import.meta.env.VITE_API_URL;

// Define types
interface Candidate {
  id: string;
  name: string;
  email: string;
  status: string;
}

interface Statistic {
  name: string;
  value: number;
}

const Dashboard: React.FC = () => {
  const [recentCandidates, setRecentCandidates] = useState<Candidate[]>([]);
  const [stats, setStats] = useState<Statistic[]>([]);

  const [loadingStats, setLoadingStats] = useState<boolean>(true);
  const [loadingCandidates, setLoadingCandidates] = useState<boolean>(true);

  const [errorStats, setErrorStats] = useState<string | null>(null);
  const [errorCandidates, setErrorCandidates] = useState<string | null>(null);

  // Fetch recent candidates
  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get<Candidate[]>(
        `${API_URL}/api/candidates/recent/limit`,{
          withCredentials:true
        }
      );
      setRecentCandidates(response.data.data);
    } catch (err) {
      setErrorCandidates("Failed to fetch candidates");
    } finally {
      setLoadingCandidates(false);
    }
  };

  // Fetch statistics
  useEffect(() => {
    const fetchData = async () => {
      try {
        const statistics = await fetchCandidateStatistics();
        setStats(statistics);
      } catch (error) {
        setErrorStats("Failed to fetch candidate statistics");
      } finally {
        setLoadingStats(false);
      }
    };

    fetchData();
  }, []);

  return (
    <PageContainer title="Dashboard">
      <div className="p-6 space-y-9 bg-gray-100">
        {/* Statistics Section */}
        {loadingStats ? (
          <div className="flex items-center justify-center h-32 bg-white shadow-md rounded-lg">
            <FaSpinner className="animate-spin text-blue-800 text-3xl" />
          </div>
        ) : errorStats ? (
          <p className="text-red-500">{errorStats}</p>
        ) : (
          <Statistics
            stats={{
              totalCandidates:
                stats.find((s) => s.name === "Total Candidates")?.value || 0,
              offersMade:
                stats.find((s) => s.name === "Offers Made")?.value || 0,
              candidatesJoined:
                stats.find((s) => s.name === "Candidates Joined")?.value || 0,
            }}
          />
        )}

        {/* Charts Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <Charts />
        </div>

        {/* Recent Candidates Section */}
        {loadingCandidates ? (
          <div className="flex items-center justify-center h-32 bg-white shadow-md rounded-lg">
            <FaSpinner className="animate-spin text-blue-800 text-3xl" />
          </div>
        ) : errorCandidates ? (
          <p className="text-red-500">{errorCandidates}</p>
        ) : (
          <RecentCandidates
            fetchCandidates={fetchCandidates}
            candidates={recentCandidates}
            loading={loadingCandidates}
            error={errorCandidates}
          />
        )}
      </div>
    </PageContainer>
  );
};

export default Dashboard;
