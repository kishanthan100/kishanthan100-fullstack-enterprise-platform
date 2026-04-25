import { useEffect, useState } from "react";
import { listItems, deleteItem } from "../services/itemService";

export const allListItems = () => {
  const [items, setItems] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const data = await listItems();
      setLogs(data);
      console.log("FETCHED LOGS:", data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to fetch logs");
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    try {
      setDeleteLoadingId(id);

      // Optimistic UI update
      setItems((prev) => prev.filter((item) => item.id !== id));

      await deleteItem(id);

    } catch (err) {
      console.log("DELETE ERROR:", err);
      console.log("RESPONSE:", err.response);
      setError(err.response?.data?.detail || "Delete failed");
      fetchLogs(); // rollback by refetching if error
    } finally {
      setDeleteLoadingId(null);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return { logs, loading, error, refetch: fetchLogs, handleDelete,deleteLoadingId };
};