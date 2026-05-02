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



export const roleList = async () => {
  const response = await api.get("/get-roles");
  return response.data;
};
