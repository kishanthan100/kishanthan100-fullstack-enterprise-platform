import { useEffect, useState } from "react";
import { allUserLogs } from "../services/userService";

export const useUserLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const data = await allUserLogs();
      setLogs(data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to fetch logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return { logs, loading, error, refetch: fetchLogs };
};