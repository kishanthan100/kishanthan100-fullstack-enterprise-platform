import api from "../../../config/axios";

export const listCustomer = async () => {
  const response = await api.get("/list-customer");
  return response.data;
};




export const createCustomerDetails = async (customerPayload) => {
  const response = await api.post("/create-customer", customerPayload);
  return response.data;
};