import React from "react";
import CandidateStatusChart from "./CandidateStatusChart";

// Define types for statistics and recent candidates
interface Statistic {
  title: string;
  value: string;
  change: string;
}

interface Candidate {
  name: string;
  position: string;
  status: "Hired" | "Interview" | "Offer" | "Screening";
  date: string;
}

const Dashboard: React.FC = () => {
  // Sample data for statistics and recent candidates
  const statistics: Statistic[] = [
    { title: "Total Candidates", value: "2,456", change: "+12%" },
    { title: "Active Positions", value: "48", change: "+8%" },
    { title: "Offers Made", value: "156", change: "+24%" },
    { title: "Candidates Joined", value: "89", change: "+16%" },
  ];

  const recentCandidates: Candidate[] = [
    {
      name: "Sarah Wilson",
      position: "Senior UX Designer",
      status: "Interview",
      date: "2024-02-15",
    },
    {
      name: "Michael Chen",
      position: "Frontend Developer",
      status: "Screening",
      date: "2024-02-14",
    },
    {
      name: "Emily Brown",
      position: "Product Manager",
      status: "Offer",
      date: "2024-02-13",
    },
    {
      name: "David Kim",
      position: "Backend Engineer",
      status: "Hired",
      date: "2024-02-12",
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-100">
      {/* Statistics Section */}
      <div className="grid grid-cols-4 gap-4 ">
        {statistics.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded shadow text-center border"
          >
            <h3 className="text-gray-500">{stat.title}</h3>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-green-500 text-sm">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow h-64">
          Candidate Status (Pie Chart)
          {/* <CandidateStatusChart candidates={recentCandidates} /> */}
        </div>

        <div className="bg-white p-4 rounded shadow h-64">
          Applications Timeline (Line Chart)
        </div>
      </div>

      {/* Recent Candidates Section */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-bold mb-4">Recent Candidates</h3>
        <table className="w-full text-left border">
          <thead>
            <tr className="border-b">
              <th className="p-2">Candidate</th>
              <th className="p-2">Position</th>
              <th className="p-2">Status</th>
              <th className="p-2">Interview Date</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentCandidates.map((candidate, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{candidate.name}</td>
                <td className="p-2">{candidate.position}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      candidate.status === "Hired"
                        ? "bg-green-500"
                        : candidate.status === "Interview"
                        ? "bg-yellow-500"
                        : candidate.status === "Offer"
                        ? "bg-blue-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {candidate.status}
                  </span>
                </td>
                <td className="p-2">{candidate.date}</td>
                <td className="p-2 text-blue-500 cursor-pointer">Edit</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
