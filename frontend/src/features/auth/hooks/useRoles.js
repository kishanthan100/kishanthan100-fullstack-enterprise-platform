import { roleList } from "../services/authRegisterService";
import { useEffect, useState } from "react";

export const allRoleList = () => {

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchLogs = async () => {
    try {
      setLoading(true);
      const data = await roleList();
      setLogs(data);
      console.log("FETCHED LOGS:", data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to fetch logs");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchLogs();
  }, []);

  return { logs, loading, error, fetchLogs };
};