import React, { useEffect, useState } from "react";
import PageContainer from "../layout/PageContainer";
import Statistics from "./Statistics";
import Charts from "./Charts";
import RecentCandidates from "./RecentCandidates";
import axios from "axios";

const Dashboard: React.FC = () => {
  const [recentCandidates, setRecentCandidates] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get<[]>(
          "http://localhost:5003/api/candidates/recent/limit"
        );
        setRecentCandidates(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch candidates");
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  return (
    <PageContainer title={"Dashboard"}>
      <div className="p-6 space-y-9 bg-gray-100">
        <Statistics
          stats={{
            totalCandidates: 0,
            activePositions: 0,
            offersMade: 0,
            candidatesJoined: 0,
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
