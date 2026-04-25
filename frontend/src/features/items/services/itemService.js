import api from "../../../config/axios";

export const listItems = async () => {
  const response = await api.get("/list-items");
  return response.data;
};


export const deleteItem = async (itemId) => {
  const response = await api.delete(`/items/${itemId}`);
  return response.data;
};


export const createItem = async (item_name, category) => {
  const response = await api.post("/create-items", { item_name, category });
  return response.data;
}; 