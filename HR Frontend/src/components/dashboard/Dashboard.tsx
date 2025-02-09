import React, { useEffect, useState } from "react";
import axios from "axios";
import PageContainer from "../layout/PageContainer";
import Statistics from "./Statistics";
import Charts from "./Charts";
import RecentCandidates from "./RecentCandidates";

const Dashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [stats, setStats] = useState({
    totalCandidates: 0,
    activePositions: 0,
    offersMade: 0,
    candidatesJoined: 0,
  });

  useEffect(() => {
    const fetchCandidates = async () => {
      const response = await axios.get("http://localhost:5003/api/candidates");
      setCandidates(response.data);
    };

    fetchCandidates();
  }, []);

  return (
    <PageContainer title="Dashboard">
      <div className="p-6 space-y-9 bg-gray-100">
        <Statistics stats={stats} />
        <Charts />
        <RecentCandidates
          candidates={candidates}
          handleEdit={() => {}}
          handleDelete={() => {}}
          handleView={() => {}}
          user={{ role: "admin" }}
        />
      </div>
    </PageContainer>
  );
};

export default Dashboard;
