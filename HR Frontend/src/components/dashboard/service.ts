import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Fetch candidate statistics from the API.
 * @returns {Promise<{ name: string; value: number }[]>} An array of statistics.
 */
export const fetchCandidateStatistics = async (): Promise<
  { name: string; value: number }[]
> => {
  try {
    const response = await axios.get(`${API_URL}/api/candidates/statistics/st`,{
      withCredentials:true
    });
    return [
      { name: "Total Candidates", value: response.data.totalCandidates },
      { name: "Offers Made", value: response.data.offersMade },
      { name: "Candidates Joined", value: response.data.candidatesJoined },
      {name:"monthlyData",value:response.data.monthlyData}
    ];
  } catch (error) {
    console.error("Error fetching candidate statistics:", error);
    throw error;
  }
};
