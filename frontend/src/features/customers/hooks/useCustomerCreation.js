import { useState } from "react";
import { createCustomerDetails } from "../services/customerService";

export const useCreateCustomer = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleCreateCustomer = async (customer) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const data = await createCustomerDetails(customer);

      setSuccess(true);
      return data;

    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleCreateCustomer,
    loading,
    error,
    success,
  };
};