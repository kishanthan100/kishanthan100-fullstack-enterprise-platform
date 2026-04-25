import { useState } from "react";
import { createItem } from "../services/itemService";

export const useCreateItem = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreate = async (item_name, category) => {
    try {
      setLoading(true);
      setError(null);

      const response = await createItem(item_name, category);

      return response; // allow page to decide what to do next
    } catch (err) {
      console.log("CREATE ERROR:", err);
      setError(err.response?.data?.detail || "Create failed");
      throw err; // important so page can handle it
    } finally {
      setLoading(false);
    }
  };

  return { handleCreate, loading, error };
};