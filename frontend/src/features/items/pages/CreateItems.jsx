import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateItem } from "../hooks/useCreateItem";

const CreateItems = () => {
  const navigate = useNavigate();
  const { handleCreate, loading, error } = useCreateItem();

  const [item_name, setItemName] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleCreate(item_name, category);
      navigate("/list-items"); // go back to list
    } catch (err) {
      console.error("Create failed", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" >
      <div className="max-w-sm w-full  rounded-lg shadow-md p-5">
      <h2  className="text-2xl text-emerald-900 font-semibold mb-4">Create Item</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
              htmlFor="item_name" 
              className="block text-lg text-emerald-900 font-medium  mb-2"
            >
              Item Name
            </label>
            <input
              type="text"
              placeholder="Item Name"
              value={item_name}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition duration-200 text-black"
              required
              />
        </div>

        <div>
          <label 
              htmlFor="category" 
              className="block text-lg text-emerald-900 font-medium  mb-2"
            >
              Category
            </label>
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition duration-200 text-black"
          required
        />
        </div>
        <button
          type="submit"
          className="bg-emerald-700 text-white px-4 py-2 rounded hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
      </div>
    </div>
  );
};

export default CreateItems;