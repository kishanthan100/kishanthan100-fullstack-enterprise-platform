import api from "../../../config/axios";

export const allUserLogs = async () => {
  const response = await api.get("/user-logs");
  return response.data;
};


export const oneUserAllLogs = async () => {
  const response = await api.get("/user-all-login-logs");
  return response.data;
};