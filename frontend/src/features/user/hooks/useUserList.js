import { useEffect, useState } from "react";
import { userList } from "../services/userService";

export const useUserList = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const data = await userList();
        setLogs(data);
      } catch (err) {
        if (err.response?.status !== 401) {
          setError("Something went wrong.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return { logs, loading, error };
};