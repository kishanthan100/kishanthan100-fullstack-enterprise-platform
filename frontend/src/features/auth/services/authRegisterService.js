import api from "../../../config/axios";

export const registerUser = async (name, email, password) => {
  const response = await api.post(
    "/register",
    {
      name,
      email,
      password,
    }
  );

  return response.data;
};