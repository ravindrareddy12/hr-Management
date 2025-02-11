import React, { useEffect, useState } from "react";
import PageContainer from "../layout/PageContainer";
import Statistics from "./Statistics";
import Charts from "./Charts";
import RecentCandidates from "./RecentCandidates";
import axios from "axios";
import { fetchCandidateStatistics } from "./service";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<Statistic[]>([]);

  // Fetch recent candidates
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get<Candidate[]>(
          "http://localhost:5003/api/candidates/recent/limit"
        );
        setRecentCandidates(response.data);
      } catch (err) {
        setError("Failed to fetch candidates");
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  // Fetch statistics
  useEffect(() => {
    const fetchData = async () => {
      try {
        const statistics = await fetchCandidateStatistics();
        setStats(statistics);
      } catch (error) {
        setError("Failed to fetch candidate statistics");
      }
    };

    fetchData();
  }, []);

  return (
    <PageContainer title="Dashboard">
      <div className="p-6 space-y-9 bg-gray-100">
        {/* Pass mapped statistics data to Statistics component */}
        <Statistics
          stats={{
            totalCandidates:
              stats.find((s) => s.name === "Total Candidates")?.value || 0,
            offersMade: stats.find((s) => s.name === "Offers Made")?.value || 0,
            candidatesJoined:
              stats.find((s) => s.name === "Candidates Joined")?.value || 0,
          }}
        />
        <Charts />
        <RecentCandidates
          candidates={recentCandidates}
          loading={loading}
          error={error}
        />
      </div>
    </PageContainer>
  );
};

export default Dashboard;
